import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Finance } from 'src/sequelize/finance.sequelize';
import { FinanceAgent } from './finance.agent';
import { FinanceController } from './finance.controller';
import { FinanceRepository } from './finance.repository';
import { FinanceService } from './finance.service';

@Module({
  imports: [SequelizeModule.forFeature([Finance])],
  providers: [FinanceService, FinanceRepository, FinanceAgent],
  exports: [FinanceService, FinanceRepository, FinanceAgent],
  controllers: [FinanceController],
})
export class FinanceModule {}
