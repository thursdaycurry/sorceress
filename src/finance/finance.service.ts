import { Injectable } from '@nestjs/common';

@Injectable()
export class FinanceService {
  async testCryptoApi(): Promise<any> {
    return 'tes';
  }
}
