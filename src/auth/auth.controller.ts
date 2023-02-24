import { Controller, Post, Put, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { User, UserCreateDto } from 'src/users/users.dto';
import { Tokens, RefreshTokenDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService, private readonly authService: AuthService) { }

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
