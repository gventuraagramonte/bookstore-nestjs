import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignupDTO } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SigninDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  async singup(@Body() signupDto: SignupDTO): Promise<void> {
    return this._authService.signup(signupDto);
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  async signin(@Body() signinDto: SigninDTO) {
    return this._authService.signin(signinDto);
  }
}
