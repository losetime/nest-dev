// 服务类通常包含业务逻辑，供控制器调用，遵循依赖注入的方式。服务和控制器分离，有助于代码的模块化和可测试性。

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../common/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 注册用户
  async signIn(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    // 密码加密
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    console.log('hashedPassword--', hashedPassword);
    // 创建一个新用户实例
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  // 根据条件查询所有用户
  async findAll(conditions?: CreateUserDto): Promise<User[]> {
    return this.usersRepository.find({
      where: conditions,
    });
  }

  // 根据username查找用户
  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }
}
