import { Module } from '@nestjs/common';
import { FatiService } from './fati.service';
import { FatiController } from './fati.controller';
import { BacklinkCheckerModule } from '../backlink-checker/backlink-checker.module';
import { InternalLinkingModule } from '../internal-linking/internal-linking.module';

@Module({
  imports: [BacklinkCheckerModule, InternalLinkingModule],
  providers: [FatiService],
  controllers: [FatiController],
  exports: [FatiService],
})
export class FatiModule {}
