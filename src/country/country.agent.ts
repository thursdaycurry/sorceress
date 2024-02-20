import { Injectable } from '@nestjs/common';

import * as qs from 'qs';
import { HttpAgent, HttpAgentResult } from 'src/common/http.agent';

@Injectable()
export class CountryAgent extends HttpAgent {
  async getCountryFact(countryFactUrl: string): Promise<HttpAgentResult<string, any>> {
    const url = process.env.FACTBOOK_URL + countryFactUrl + `.json`;

    const queryString = qs.stringify({
      // api_key: process.env.SOME_API,
    });

    const { data, error, statusCode } = await super.get<any>(url, {}, queryString);

    return {
      request: { url },
      response: { data, error, statusCode },
    };
  }
}
