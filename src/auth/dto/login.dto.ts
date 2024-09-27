import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '用户名', minLength: 6, required: true })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '用户密码', maxLength: 18, required: true })
  readonly password: string;
}

export class LoginResDto {
  @ApiProperty({
    description: 'token字符串',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....',
  })
  token: string;
}
