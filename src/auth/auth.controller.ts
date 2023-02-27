import { Controller, Post, Body } from '@nestjs/common';
import { UserCreateDto } from 'src/users/users.dto';
import { RefreshTokenDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService, private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() data: UserCreateDto) {
    return this.userService.create(data);
  }

  @Post('login')
  login(@Body() data: UserCreateDto) {
    return this.authService.login(data);
  }

  @Post('refresh')
  refresh(@Body() data: RefreshTokenDto) {
    return this.authService.refresh(data);
  }
}
