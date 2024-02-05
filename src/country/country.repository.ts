import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Country } from 'src/sequelize/country.sequelize';

@Injectable()
export class CountryRepository {
  constructor(
    @InjectModel(Country)
    private readonly CountryRepository: typeof Country,
  ) {}

  async findAll(): Promise<Country[] | null> {
    return await this.CountryRepository.findAll();
  }
}
