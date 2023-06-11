import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import * as cors from 'cors';
import { NextFunction, Request, Response } from 'express';
import { ResponseInterceptor } from './interceptor/response/response.interceptor';
import { HttpFilter } from './filter/http/http.filter';
// import { RoleGuard } from './guard/role/role.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

function MiddlewareAll(req: Request, res: Response, next: NextFunction) {
  console.log('global middleware', req.originalUrl);
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger config
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('api documents')
    .setDescription('api')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  app.use(cors());
  app.enableVersioning({ type: VersioningType.URI });
  app.use(
    session({
      secret: 'wp',
      rolling: true,
      name: 'wp-sid',
      cookie: { maxAge: 999999999 },
    }),
  );
  // config cors
  app.use(MiddlewareAll);
  app.useGlobalFilters(new HttpFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalGuards(new RoleGuard());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
