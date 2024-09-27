import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    // 导入 Passport 模块，用于身份验证
    PassportModule,
    // 注册 JWT 模块
    JwtModule.registerAsync({
      // 注入 ConfigService，用于获取环境变量
      // inject: [ConfigService],
      imports: [ConfigModule],
      inject: [ConfigService],
      // 使用工厂函数配置 JWT 模块
      useFactory: (configService: ConfigService) => ({
        // 从环境变量中获取 JWT 密钥
        secret: configService.get<string>('JWT_SECRET'),
        // 设置 JWT 令牌的配置选项
        signOptions: {
          // 设置 JWT 过期时间为(单位：分钟)
          expiresIn: configService.get<string>('JWT_EXPIRATION'),
        },
      }),
    }),
  ],
  // 声明该模块使用的控制器
  controllers: [AuthController],
  // 声明该模块提供的服务
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
