import { Controller, Get, Query } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller(`country`)
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async findAll(): Promise<any> {
    console.log('country..');
    return await this.countryService.findAll();
  }

  @Get(`fact`)
  async getCountryFact(@Query() country: string): Promise<any> {
    return await this.countryService.getCountryFact(country);
  }
}
