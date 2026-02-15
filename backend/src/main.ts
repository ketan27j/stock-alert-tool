import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with configuration
  app.enableCors({
    origin: [
      'http://localhost:3000', // React development server
      'http://localhost:3001', // Alternative port
      'https://yourdomain.com', // Production domain
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'X-Requested-With',
    ],
    credentials: true, // Allow cookies
    maxAge: 3600, // Cache preflight requests for 1 hour
  });

  // Or simple CORS (allow all origins - for development only)
  // app.enableCors();

  // Enable validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Set global prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
  process.exit(1);
});
