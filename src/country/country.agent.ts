import { Injectable } from '@nestjs/common';

import * as qs from 'qs';
import { HttpAgent, HttpAgentResult } from 'src/lib/http.agent';

@Injectable()
export class CountryAgent extends HttpAgent {
  async getCountryFact(country: string): Promise<HttpAgentResult<string, any>> {
    const queryString = qs.stringify({
      // api_key: process.env.SOME_API,
      // start: startDate,
      // end: endDate,
    });

    //raw.githubusercontent.com/factbook/factbook.json/master/east-n-southeast-asia/ks.json

    let url = process.env.FACTBOOK_URL;
    url += `east-n-southeast-asia/ks.json`;

    const { data, error, statusCode } = await super.get<any>(
      url,
      {},
      queryString,
    );

    return {
      request: { url },
      response: { data, error, statusCode },
    };
  }
}
