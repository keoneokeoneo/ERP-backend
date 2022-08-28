import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* Swagger */
  const config = new DocumentBuilder()
    .setTitle('Konex E&G ERP')
    .setDescription('(주)코넥스이엔씨 ERP API 명세서')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  /* ------- */

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
