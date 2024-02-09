import { Module } from '@nestjs/common';
import { CountryModule } from 'src/country/country.module';
import { EnergyController } from './energy.controller';
import { EnergyService } from './energy.service';

@Module({
  imports: [CountryModule],
  controllers: [EnergyController],
  providers: [EnergyService],
})
export class EnergyModule {}
