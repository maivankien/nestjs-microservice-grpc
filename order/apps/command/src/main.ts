import { NestFactory } from '@nestjs/core';
import { CommandModule } from './command.module';

async function bootstrap() {
  const app = await NestFactory.create(CommandModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
