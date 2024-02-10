import { Controller, Get, Query, Res } from '@nestjs/common';

import { GetFactDto } from 'src/country/dto/getFact.dto';
import { EnergyService } from './energy.service';
const AdmZip = require('adm-zip');

@Controller(`energy`)
export class EnergyController {
  constructor(private readonly energyService: EnergyService) {}

  @Get(`elecGenSource`)
  async getElecGenSource(@Query() getFactDto: GetFactDto): Promise<any> {
    return await this.energyService.getElecGenSource(getFactDto);
  }

  @Get(`elecGenSourceCSV`)
  async getElecGenSourceCSV(@Res() res, @Query() getFactDto: GetFactDto): Promise<any> {
    const csv = await this.energyService.getElecGenSourceCSV(getFactDto);

    const zip = new AdmZip();
    const zipTitle = `SOR_compare_elecGenSource.zip`;

    await zip.addFile(`SOR_compare_elecGenSource.csv`, Buffer.from(csv, 'utf8'));

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${zipTitle}"`);
    res.end(zip.toBuffer(), 'binary');
  }
}
