import { Injectable } from '@nestjs/common';
import { CountryRepository } from './country.repository';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async findAll(): Promise<any> {
    return await this.countryRepository.findAll();
  }
}
