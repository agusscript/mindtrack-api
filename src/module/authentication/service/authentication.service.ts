import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from '../dto/signup.dto';
import { UserService } from 'src/module/user/service/user.service';
import { SignInDto } from '../dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { ISignInResponse } from '../interface/sign-in-response.interface';
import { User } from 'src/module/user/entity/user.entity';
import { jwtConstant } from '../constant/jwt.constant';
import { SignOutDto } from '../dto/singOut.dto';
import { RefreshTokenDto } from '../dto/refreshToken.dto';
import { ISignUpResponse } from '../interface/sign-up-response.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<ISignUpResponse> {
    const hashedPassword = await bcryptjs.hash(signUpDto.password, 10);
    const user = await this.userService.create({
      ...signUpDto,
      password: hashedPassword,
    });

    const { accessToken, refreshToken } = await this.generateTokens(user);

    await this.saveRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async signIn(signInDto: SignInDto): Promise<ISignInResponse> {
    const { email, password } = signInDto;

    const user = await this.userService.getOneByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email');

    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const { accessToken, refreshToken } = await this.generateTokens(user);

    await this.saveRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { id, name, email } = user;
    const payload = { id, name, email };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId: number, refreshToken: string): Promise<void> {
    const hashed = await bcryptjs.hash(refreshToken, 10);
    await this.userService.updateRefreshToken(userId, hashed);
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<ISignInResponse> {
    const { refreshToken } = refreshTokenDto;
    const decoded = await this.verifyRefreshToken(refreshToken);

    const user = await this.userService.getOneById(decoded.id);

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const isValid = await bcryptjs.compare(refreshToken, user.refreshToken);
    if (!isValid) throw new UnauthorizedException('Invalid refresh token');

    const tokens = await this.generateTokens(user);

    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async verifyRefreshToken(
    refreshToken: string,
  ): Promise<{ id: number; name: string; email: string }> {
    try {
      return await this.jwtService.verifyAsync<{
        id: number;
        name: string;
        email: string;
      }>(refreshToken, {
        secret: jwtConstant.secret,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async signOut(signOutDto: SignOutDto): Promise<void> {
    const { refreshToken } = signOutDto;

    const decoded = await this.verifyRefreshToken(refreshToken);
    const user = await this.userService.getOneById(decoded.id);

    const isValid = await bcryptjs.compare(refreshToken, user.refreshToken!);

    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.userService.updateRefreshToken(user.id, null);
  }
}
