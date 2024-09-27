// 控制器负责处理传入的请求，并返回响应给客户端。通过路由来匹配 HTTP 请求（GET, POST, 等）
import {
  Controller,
  Post,
  Get,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { ApiResponseType } from '../common/decorators/api-response-type.decorator';
import { User } from '../common/entities/user.entity';

@ApiTags('用户管理')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-in')
  @ApiOperation({ summary: '注册用户' })
  @ApiBody({ type: CreateUserDto }) // 显示请求体参数
  @ApiResponseType()
  async signIn(@Body() body: CreateUserDto) {
    const user = await this.usersService.signIn(body);
    if (user.id) {
      return {};
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  @Get('list')
  @ApiOperation({ summary: '用户列表' })
  @ApiResponseType(User, true)
  async getAllUsers() {
    const users = await this.usersService.findAll();
    if (users) {
      return users;
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  // @Get(':id')  // 处理带参数的 GET /users/:id 请求
  // findOne(@Param('id') id: string) {
  //   return `This action returns user with id: ${id}`;
  // }
}
