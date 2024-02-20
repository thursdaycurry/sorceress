import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsciousModule } from './conscious/conscious.module';
import { CountryModule } from './country/country.module';
import { EnergyModule } from './energy/energy.module';
import { FinanceModule } from './finance/finance.module';
import { Country } from './sequelize/country.sequelize';

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
    ConsciousModule,
    EnergyModule,
    FinanceModule,
  ],
  controllers: [AppController],
  exports: [],
  providers: [AppService],
})
export class AppModule {}
