import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as moment from 'moment';
import { unixTimeConverter } from 'src/common/timeConverter';
import { CollectFinanceDto } from './dto/collectFinance.dto';
import { FinanceAgent } from './finance.agent';
import { FinanceRepository } from './finance.repository';

@Injectable()
export class FinanceService {
  constructor(private readonly financeAgent: FinanceAgent, private readonly financeRepository: FinanceRepository) {}

  async collectCryptoHistory(collectFinanceDto: CollectFinanceDto): Promise<any> {
    const { startDate, endDate } = collectFinanceDto;

    if (moment(startDate).isAfter(moment().subtract(1, 'day')) || moment(endDate).isAfter(moment().subtract(1, 'day'))) {
      throw new NotAcceptableException(`data only available till yesterday`);
    }

    const cryptoHistory = await (await this.financeAgent.collectCryptoHistory()).response.data;

    const result = [];

    const priceHistory = cryptoHistory.prices;
    const marketCapHistory = cryptoHistory.market_caps;
    const totalVolumeHistory = cryptoHistory.total_volumes;

    priceHistory.forEach((dailyData, idx) => {
      const date = unixTimeConverter(dailyData[0]);

      if (moment(date).isBetween(startDate, endDate) || moment(date).isSame(moment(startDate)) || moment(date).isSame(moment(endDate))) {
        result.push({
          date: date,
          name: 'Bitcoin',
          symbol: 'BTC',
          category: 'crypto',
          price: Number(priceHistory[idx][1]),
          marketCap: Number(marketCapHistory[idx][1]),
          totalVolume: Number(totalVolumeHistory[idx][1]),
        });
      }
    });

    await this.financeRepository.destroy(startDate, endDate);

    const chunkUnit = 300;
    while (result.length) {
      await this.financeRepository.bulkCreate(result.splice(0, chunkUnit));
    }
  }
}
