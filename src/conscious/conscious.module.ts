import { Module } from '@nestjs/common';
import { ConsciousController } from './conscious.controller';
import { ConsciousService } from './conscious.service';

@Module({
  controllers: [ConsciousController],
  providers: [ConsciousService],
})
export class ConsciousModule {}
