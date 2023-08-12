import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { PrismaService } from '@app/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { errorValidationAdvice } from '@app/advice/error.validation.advice';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });
  app.useGlobalPipes(
    new ValidationPipe({ exceptionFactory: errorValidationAdvice }),
  );
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(process.env.PORT || 7000);
}

bootstrap();
