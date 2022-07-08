import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: SignupDto) {
    const { email, password, username } = body;

    const auth = await this.authService.signUp(email, password);
    await this.authService.update(auth.idToken, username);
    const tokens = await this.authService.refreshToken(auth.refreshToken);
    return {...auth, ...tokens };
  }

  @Post('/signin')
  signIn(@Body() body: SigninDto) {
    const { email, password } = body;
    return this.authService.signIn(email, password);
  }
}
