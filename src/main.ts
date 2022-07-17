import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* Pipe */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      whitelist: true,
      validationError: {
        target: false,
      },
      exceptionFactory: (validationErrors: ValidationError[]) => {
        const errors = validationErrors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints)[0],
        }));

        return new BadRequestException(errors);
      },
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
