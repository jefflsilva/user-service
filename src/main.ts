import { NestFactory } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3002);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
