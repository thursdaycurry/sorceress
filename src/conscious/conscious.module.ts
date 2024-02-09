import { Module } from '@nestjs/common';
import { ConsciousService } from './conscious.service';
import { ConsciousController } from './conscious.controller';

@Module({
  controllers: [ConsciousController],
  providers: [ConsciousService]
})
export class ConsciousModule {}
