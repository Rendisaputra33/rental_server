import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('assets')
export class AssetsController {
  @Get('/:name')
  getAsset(@Param('name') name: string, @Res() res: Response) {
    res.sendFile(process.cwd() + `/uploads/${name}`);
  }
}
