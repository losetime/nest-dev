import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// TODO 这里class-validator插件如何和ApiProperty结合使用，不用重复声明
export class CreateUserDto {
  @ApiProperty({ description: '用户id', required: false })
  @IsInt()
  readonly id: number;

  @ApiProperty({ description: '用户名' })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ description: '电话', required: false })
  @IsPhoneNumber()
  readonly phone: string;

  @ApiProperty({ description: '邮箱', required: false })
  @IsEmail()
  readonly email: string;
}
