import { Controller, Get, Query } from '@nestjs/common';
import { Country } from 'src/sequelize/country.sequelize';
import { CountryService } from './country.service';
import { GetFactDto } from './dto/getFact.dto';

@Controller(`country`)
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async findAll(): Promise<any> {
    return await this.countryService.findAll();
  }

  @Get(`fact`)
  async getCountryFact(@Query() getFactDto: GetFactDto): Promise<Country[]> {
    return await this.countryService.getCountryFact(getFactDto);
  }
}
