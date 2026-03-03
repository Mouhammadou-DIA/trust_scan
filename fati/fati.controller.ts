import { Controller, Get, Query } from '@nestjs/common';
import { FatiService } from './fati.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('fati')
@Controller('fati')
export class FatiController {
  constructor(private readonly fatiService: FatiService) {}

  @Get('analyze')
  @ApiOperation({ summary: 'Analyze URL for phishing/fake content' })
  @ApiQuery({ name: 'url', required: true, description: 'URL to analyze' })
  async analyze(@Query('url') url: string): Promise<any> {
    return this.fatiService.analyzeUrl(url);
  }
}
