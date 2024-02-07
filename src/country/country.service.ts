import { Injectable } from '@nestjs/common';
import { CountryRepository } from './country.repository';
import { CountryAgent } from './country.agent';

@Injectable()
export class CountryService {
  constructor(
    private readonly countryRepository: CountryRepository,
    private readonly countryAgent: CountryAgent,
  ) {}

  async findAll(): Promise<any> {
    const result = await this.countryRepository.findAll();

    console.log(`result ${result.length}`);
    return result;
  }

  async getCountryFact(country: string): Promise<any> {
    const results = await this.countryAgent.getCountryFact(country);

    return results;
  }
}
