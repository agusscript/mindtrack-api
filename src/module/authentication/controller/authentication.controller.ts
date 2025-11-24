import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';
import { SignUpDto } from '../dto/signup.dto';
import { SignInDto } from '../dto/signIn.dto';
import { ISignInResponse } from '../interface/sign-in-response.interface';
import { SignOutDto } from '../dto/singOut.dto';
import { RefreshTokenDto } from '../dto/refreshToken.dto';
import { ISignUpResponse } from '../interface/sign-up-response.interface';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<ISignUpResponse> {
    return this.authenticationService.signUp(signUpDto);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto): Promise<ISignInResponse> {
    return this.authenticationService.signIn(signInDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<ISignInResponse> {
    return this.authenticationService.refreshToken(refreshTokenDto);
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  async signOut(@Body() signOutDto: SignOutDto): Promise<void> {
    return this.authenticationService.signOut(signOutDto);
  }
}
