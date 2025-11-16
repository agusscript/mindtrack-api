import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const configService = app.get(ConfigService);

  const globalPrefix: string = configService.get('server.prefix') as string;
  app.setGlobalPrefix(globalPrefix);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const port: number = configService.get('server.port') as number;
  await app.listen(port);
  console.info(`
    ================================================
    Welcome to MindTrack API
    ================================================
    Server is running on port ${port}
    Environment: ${process.env.NODE_ENV}
    Prefix: ${globalPrefix}
    ================================================
  `);
}
bootstrap();
