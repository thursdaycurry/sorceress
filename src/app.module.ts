import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Country } from './sequelize/country.sequelize';
import { Dialect } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { CountryModule } from './country/country.module';

console.log('hello');
console.log(process.env.DB_DIALECT, process.env.DB_HOST);

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD ?? '',
      database: process.env.DB_NAME,
      models: [Country],
      repositoryMode: true,
      autoLoadModels: true,
      synchronize: true,
    }),
    CountryModule,
  ],
  controllers: [AppController],
  exports: [],
  providers: [AppService],
})
export class AppModule {}
