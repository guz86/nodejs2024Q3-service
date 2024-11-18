import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDocument = YAML.load('./doc/api.yaml');
  SwaggerModule.setup('api-docs', app, swaggerDocument);
  const port = process.env.PORT || 4000;
  await app.listen(port);

}
bootstrap();
