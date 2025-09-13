import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';
import { SignUpDto } from '../dto/signup.dto';
import { SignInDto } from '../dto/signIn.dto';
import { ISignInResponse } from '../interface/sign-in-response.interface';
import { User } from 'src/module/user/entity/user.entity';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authenticationService.signUp(signUpDto);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto): Promise<ISignInResponse> {
    return this.authenticationService.signIn(signInDto);
  }
}
