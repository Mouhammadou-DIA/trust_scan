import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  @Get()
  getHome(@Res() res: Response) {
    const htmlPath = join(__dirname, '..', 'trustscan.html');
    try {
      const html = readFileSync(htmlPath, 'utf8');
      res.type('text/html').send(html);
    } catch (error) {
      res.status(500).send('Error loading trustscan.html');
    }
  }
}
