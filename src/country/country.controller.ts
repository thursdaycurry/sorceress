import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller(`country`)
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async findAll(): Promise<any> {
    console.log('country..');
    return await this.countryService.findAll();
  }
}
