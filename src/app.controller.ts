import { HttpService } from '@nestjs/axios';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { lastValueFrom, map } from 'rxjs';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Constants } from './auth/constants';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('user')
  async createUser() {
    return this.userService.create();
  }
}
