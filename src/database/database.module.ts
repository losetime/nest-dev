import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        host: '192.168.35.50', // Dev Container 中的 MySQL 配置
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'nest_database',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  private readonly logger: Logger = new Logger('DatabaseModule');

  async onModuleInit() {
    try {
      // 当模块成功初始化时，这个生命周期钩子会被调用
      this.logger.log('数据库连接成功');
    } catch (error) {
      this.logger.error('数据库连接失败：', error);
    }
  }
}
