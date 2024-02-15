import { Controller, Get } from '@nestjs/common';
import { FinanceService } from './finance.service';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get()
  async testCryptoApi(): Promise<any> {
    return await this.financeService.testCryptoApi();
  }
}
