import { Injectable } from '@nestjs/common';
import * as papa from 'papaparse';
import { CountryService } from 'src/country/country.service';
import { GetFactDto } from 'src/country/dto/GetFact.dto';

@Injectable()
export class EnergyService {
  constructor(private readonly countryService: CountryService) {}

  async getElecGenSource(getFactDto: GetFactDto): Promise<any> {
    const countryFacts = await this.countryService.getCountryFact(getFactDto);

    const results = countryFacts.map((country) => {
      return {
        name: country['Government']['Country name']['conventional short form'],
        sources: country['Energy']['Electricity generation sources'],
      };
    });
    const convertToTable = (factObj) => {
      const result = { name: factObj.name.text };

      Object.keys(factObj.sources).forEach((sourceName) => {
        const sourceDetail = factObj.sources[sourceName]['text'].split('%')[0];
        result[sourceName] = sourceDetail; // TODO: 클라이언트 데이터 가독성 위해 결과 수치에 % 추가 가능여부 고려
      });
      return result;
    };

    return results.map(convertToTable);
  }

  async getElecGenSourceCSV(getFactDto: GetFactDto): Promise<any> {
    const data = await this.getElecGenSource(getFactDto);
    const csv = await papa.unparse(data);
    return csv;
  }
}
