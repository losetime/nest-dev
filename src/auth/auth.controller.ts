import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/guards/public.decorator';
import { LoginReqDto, LoginResDto } from './dto/login.dto';
import { ApiResponseType } from '../common/decorators/api-response-type.decorator';

@ApiTags('权限管理')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // 使用 @Public 装饰器，跳过 JWT 验证
  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiBody({ type: LoginReqDto }) // 显示请求体参数
  @ApiResponseType(LoginResDto)
  async login(@Body() loginReqDto: LoginReqDto) {
    const user = await this.authService.validateUser(loginReqDto);
    if (!user) {
      throw new HttpException('用户名或密码错误', HttpStatus.UNAUTHORIZED);
    }
    const token = this.authService.getToken(loginReqDto);
    if (token) {
      return { token };
    } else {
      throw new HttpException(
        '未能获取到token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Public()
  @Post('app-version')
  @ApiOperation({ summary: '获取app版本' })
  async getAppVersion() {
    return {
      version: '1.0.1',
      content: ['添加api接口', '新增软件更新功能', '优化更新提示界面'],
    };
  }
}
