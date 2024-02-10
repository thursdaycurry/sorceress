import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CountryAgent } from './country.agent';
import { CountryRepository } from './country.repository';
import { GetFactDto } from './dto/getFact.dto';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository, private readonly countryAgent: CountryAgent) {}

  async findAll(): Promise<any> {
    const result = await this.countryRepository.findAll();
    return result;
  }

  async getCountryFact(getFactDto: GetFactDto): Promise<any> {
    const { countryCode } = getFactDto;

    const findAllCountries = await this.countryRepository.findAll();
    const countryFactUrlDict = await findAllCountries.reduce((dict, country) => dict.set(country.code, country.factbookUrl), new Map());

    const getCountryFact = async (countryCode) => {
      const factUrl = countryFactUrlDict.get(countryCode);
      if (!factUrl) {
        throw new InternalServerErrorException(`factURL is not available`);
      }

      return (await this.countryAgent.getCountryFact(factUrl)).response.data;
    };

    const facts = Promise.all(countryCode.map(getCountryFact)); // 선형적으로 태스크 수행 필요 X

    return facts;
  }
}
