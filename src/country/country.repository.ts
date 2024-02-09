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
    return await this.CountryRepository.findAll({
      where: {
        // region: 'Europe',
        // sub_region: 'Eastern Asia',
      },
      raw: true,
    });
  }

  async getCountryByCountryCode(countryCode: string): Promise<Country | null> {
    return await this.CountryRepository.findOne({
      where: {
        code: countryCode,
      },
      raw: true,
    });
  }
}
