import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { JwtPayload } from '../../../interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('register')
  async register(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.register(email, password);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body('email') email: string, @Body('password') password: string) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }
}
