import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from '../dto/signup.dto';
import { UserService } from 'src/module/user/service/user.service';
import { SignInDto } from '../dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { ISignInResponse } from '../interface/sign-in-response.interface';
import { User } from 'src/module/user/entity/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const hashedPassword = await bcryptjs.hash(signUpDto.password, 10);
    return await this.userService.create({
      ...signUpDto,
      password: hashedPassword,
    });
  }

  async signIn(signInDto: SignInDto): Promise<ISignInResponse> {
    const { email, password } = signInDto;
    const user = await this.userService.getOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.id, name: user.name, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
