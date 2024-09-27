import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginReqDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginReqDto: LoginReqDto): Promise<any> {
    const user = await this.usersService.findOne(loginReqDto.username);
    if (user && (await bcrypt.compare(loginReqDto.password, user.password))) {
      return user;
    }
    return null;
  }

  getToken(loginReqDto: LoginReqDto) {
    return this.jwtService.sign(loginReqDto);
  }
}
