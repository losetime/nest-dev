import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { CustomExceptionFilter } from './common/filters/exception.filter';
import { ResponseDto } from './common/dto/response.dto';

async function bootstrap() {
  // 挂载根模块，返回nest实例，该实例会自动注册所有依赖的模块、服务、控制器等
  const app = await NestFactory.create(AppModule);

  // 全局使用 JwtAuthGuard
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // 生成接口文档
  const config = new DocumentBuilder()
    .setTitle('接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ResponseDto],
  });
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'openApiJson',
  });

  // 响应体格式化
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 自定义异常过滤器
  app.useGlobalFilters(new CustomExceptionFilter());

  await app.listen(4001);
}

bootstrap();
