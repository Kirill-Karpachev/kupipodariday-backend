import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AuthController {
  constructor(private usersService: UsersService) {}
  @Post('signup')
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}
