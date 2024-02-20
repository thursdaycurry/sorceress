import { Controller, Get, Query } from '@nestjs/common';
import { CollectFinanceDto } from './dto/collectFinance.dto';
import { FinanceService } from './finance.service';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  //TODO: Add another types option of crypto
  @Get(`crypto/marketChart`)
  async collectCryptoHistory(@Query() collectFinanceDto: CollectFinanceDto): Promise<any> {
    return await this.financeService.collectCryptoHistory(collectFinanceDto);
  }
}
