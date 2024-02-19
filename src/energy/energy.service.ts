import { Injectable, NotFoundException } from '@nestjs/common';
import * as papa from 'papaparse';
import { CountryService } from 'src/country/country.service';
import { GetFactDto } from 'src/country/dto/getFact.dto';

@Injectable()
export class EnergyService {
  constructor(private readonly countryService: CountryService) {}

  async getElecGenSource(getFactDto: GetFactDto): Promise<any> {
    const countryFacts = await this.countryService.getCountryFact(getFactDto);

    const filterSource = async (countryFacts) => {
      const result = [];

      for await (const country of countryFacts) {
        if (!!country['Energy']['Electricity generation sources']) {
          result.push({
            name: country['Government']['Country name']['conventional short form'],
            sources: country['Energy']['Electricity generation sources'],
          });
        }
      }
      return result;
    };

    const filteredCountrySource = await filterSource(countryFacts);

    if (!filteredCountrySource.length) {
      throw new NotFoundException(`No data available`);
    }

    const convertToTable = (factObj) => {
      const result = { name: factObj.name.text };

      Object.keys(factObj.sources).forEach((sourceName) => {
        const sourceDetail = factObj.sources[sourceName]['text'].split('%')[0];
        result[sourceName] = sourceDetail;
      });
      return result;
    };

    console.log(filteredCountrySource);

    return filteredCountrySource.map(convertToTable);
  }

  async getElecGenSourceCSV(getFactDto: GetFactDto): Promise<any> {
    const data = await this.getElecGenSource(getFactDto);
    const csv = await papa.unparse(data);
    return csv;
  }
}
