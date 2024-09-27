import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '用户id' })
  id: number;

  @Column({ comment: '用户名' })
  @ApiProperty({ description: '用户名' })
  username: string;

  @Column({ comment: '密码' })
  @ApiProperty({ description: '密码' })
  password: string;

  @Column({ comment: '邮箱' })
  @ApiProperty({ description: '邮箱' })
  email: string;

  @Column({ comment: '电话' })
  @ApiProperty({ description: '电话' })
  phone: string;

  @Column({ comment: '年龄' })
  @ApiProperty({ description: '年龄' })
  age: string;

  @Column({ comment: '性别' })
  @ApiProperty({ description: '性别' })
  sex: string;
}
