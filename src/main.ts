import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JwtGuard } from './auth/guards/jwt.guard';
import { RolesGuard } from './auth/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* Pipe */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  /* Cors */
  app.enableCors();

  /* Configs */
  const configService = app.get(ConfigService);

  /* API prefix */
  app.setGlobalPrefix(configService.get('API_PREFIX'), {
    exclude: ['/'],
  });

  /* Swagger */
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
