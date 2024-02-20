import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Finance } from 'src/sequelize/finance.sequelize';

@Injectable()
export class FinanceRepository {
  constructor(
    @InjectModel(Finance)
    private readonly financeRepository: typeof Finance,
  ) {}

  async bulkCreate(data: Array<Record<string, unknown>>): Promise<void> {
    await this.financeRepository.bulkCreate(data);
  }

  async destroy(startDate: string, endDate: string): Promise<void> {
    await this.financeRepository.destroy({
      where: {
        date: { [Op.between]: [startDate, endDate] },
      },
    });
  }
}
