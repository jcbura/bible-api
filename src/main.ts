import { AppModule } from '@/app.module';
import { BaseResponseDto } from '@/common/dtos';
import { HttpExceptionFilter } from '@/common/filters';
import { ResponseInterceptor } from '@/common/interceptors';
import { config } from '@/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: config.server.corsOriginRegexp,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );

  app.setGlobalPrefix(config.server.apiPrefix);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('bible api')
    .setDescription('bible api docs')
    .setVersion('0.0.1')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig, {
      extraModels: [BaseResponseDto],
    });
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(config.server.port, config.server.address);
}
void bootstrap();
