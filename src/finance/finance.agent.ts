import { Injectable } from '@nestjs/common';
import * as qs from 'qs';
import { HttpAgent, HttpAgentResult } from 'src/common/http.agent';

@Injectable()
export class FinanceAgent extends HttpAgent {
  async collectCryptoHistory(): Promise<HttpAgentResult<string, any>> {
    /**
     * coingecko provides options 1, 14, 30, max(2013~)
     * https://www.coingecko.com/api/documentation
     */
    const days = 'max';
    const url = process.env.CRYPTO_MARKET_CHART + `/bitcoin/market_chart`;

    const queryString = qs.stringify({
      vs_currency: 'usd',
      days: days,
      interval: 'daily',
    });

    const { data, error, statusCode } = await super.get<any>(url, {}, queryString);

    return {
      request: { url },
      response: { data, error, statusCode },
    };
  }
}
