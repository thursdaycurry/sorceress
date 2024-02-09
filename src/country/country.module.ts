import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from 'src/sequelize/country.sequelize';
import { CountryAgent } from './country.agent';
import { CountryController } from './country.controller';
import { CountryRepository } from './country.repository';
import { CountryService } from './country.service';

@Module({
  imports: [SequelizeModule.forFeature([Country])],
  providers: [CountryService, CountryRepository, CountryAgent],
  exports: [CountryService, CountryRepository, CountryAgent],
  controllers: [CountryController],
})
export class CountryModule {}
