import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';

class Application {
  private readonly app: INestApplication;

  constructor(app: INestApplication) {
    this.app = app;
  }

  private addMiddleware() {
    this.app.useGlobalPipes(new ValidationPipe({ transform: true }));
    this.app.useGlobalInterceptors(
      new ClassSerializerInterceptor(this.app.get(Reflector)),
    );
  }

  async init() {
    await this.app.listen(4000);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const application = new Application(app);
  await application.init();
}

bootstrap().then(() => new Logger('bootstrap').log(`✅ Server on port: 4000`));
