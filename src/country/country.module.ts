import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from 'src/sequelize/country.sequelize';
import { CountryRepository } from './country.repository';
import { CountryAgent } from './country.agent';

@Module({
  imports: [SequelizeModule.forFeature([Country])],
  providers: [CountryService, CountryRepository, CountryAgent],
  exports: [CountryService, CountryRepository, CountryAgent],
  controllers: [CountryController],
})
export class CountryModule {}
