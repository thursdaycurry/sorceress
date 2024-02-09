import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsciousService {
  // create(createConsciousDto: CreateConsciousDto) {
  //   return 'This action adds a new conscious';
  // }

  findAll() {
    return `This action returns all conscious`;
  }
}
