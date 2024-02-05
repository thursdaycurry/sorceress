import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from 'src/sequelize/country.sequelize';
import { CountryRepository } from './country.repository';

@Module({
  imports: [SequelizeModule.forFeature([Country])],
  providers: [CountryService, CountryRepository],
  exports: [CountryService, CountryRepository],
  controllers: [CountryController],
})
export class CountryModule {}
