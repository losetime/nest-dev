import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty({ description: '业务状态码', example: 20000 })
  code: number;
  @ApiProperty({ description: '业务状态描述', example: '成功' })
  message: string;
  @ApiProperty({ description: '返回数据' })
  data?: T;
}
