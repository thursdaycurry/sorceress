import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envInit = async () => {
  dotenv.config({
    path: path.resolve(
      process.env.ENV_PATH ?? '' + process.env.NODE_ENV === 'prod' ? '.env' : process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
    ),
  });
};

(async () => {
  await envInit();
})();

const getPropertyValue = (obj, property) => {
  if (obj.hasOwnProperty(property)) {
    return obj[property];
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
      const value = getPropertyValue(obj[key], property);
      if (value !== undefined) {
        return Object.values(value);
      }
    }
  }

  return undefined;
};

/**
 * 어플리케이션 구성 전에 환경변수를 먼저 가져오도록, dotenv을 NestFactory, AppModule보다 먼저 호출한다
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // DTO 프로퍼티 대문자 변환 등을 위해 ValidationPipe 등록 필요
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: [`http://localhost:3000`, `http://localhost:3001`],
    credentials: true,
  });

  // TODO: add loger service
  // const logger = app.get<LoggerService>(LoggerService);

  // app.useGlobalFilters(new Sorceress(logger));

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     exceptionFactory(errors) {
  //       const constraints = errors.length
  //         ? getPropertyValue(errors, 'constraints')
  //         : undefined;
  //     },
  //   }),
  // );

  await app.listen(3000);
}
bootstrap();
