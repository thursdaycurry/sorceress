import { Controller, Get, Post } from '@nestjs/common';
import { ConsciousService } from './conscious.service';

@Controller('conscious')
export class ConsciousController {
  constructor(private readonly consciousService: ConsciousService) {}

  @Post()
  // create(@Body() createConsciousDto: CreateConsciousDto) {
  //   return this.consciousService.create(createConsciousDto);
  // }
  @Get()
  findAll() {
    return this.consciousService.findAll();
  }
}
