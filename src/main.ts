import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // console.log(process.env);

  const PORT = process.env.PORT || 3300;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  
}
bootstrap();
