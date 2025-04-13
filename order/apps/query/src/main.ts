import { NestFactory } from '@nestjs/core';
import { QueryModule } from './query.module';

async function bootstrap() {
  const app = await NestFactory.create(QueryModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
