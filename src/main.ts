import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from '@fastify/helmet';
import compress from '@fastify/compress';
import rateLimit from '@fastify/rate-limit';
import fastifyCookie from '@fastify/cookie';
import fastifyCsrf from '@fastify/csrf-protection';
import fastifyMultipart from '@fastify/multipart';

import { AppModule } from './app.module';

const PORT = process.env.NODE_ENV === 'production' ? 7524 : 3000;

async function bootstrap() {
  const adapter = new FastifyAdapter({
    logger: true,
  });

  // adapter.register(helmet, {
  //   contentSecurityPolicy: false, // 在使用fastify-swagger和helmet时有CSP冲突
  // });
  // adapter.register(compress);
  // adapter.register(fastifyMultipart, {
  //   addToBody: true,
  // });
  // adapter.register(rateLimit, {
  //   max: 100,
  //   timeWindow: 6000, // 一分钟
  // });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );

  // await app.register(fastifyCookie);
  // await app.register(fastifyCsrf);

  // 全局路由前缀
  app.setGlobalPrefix('/api/');
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('博客接口nodejs文档')
    .setDescription('博客接口nodejs文档') // 文档介绍
    .setVersion('1.0.0') // 文档版本
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/document', app, document);

  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
