import { Module } from '@nestjs/common';
import { BacklinkCheckerModule } from './backlink-checker/backlink-checker.module';
import { InternalLinkingModule } from './internal-linking/internal-linking.module';
import { FatiModule } from './fati/fati.module';

@Module({
  imports: [BacklinkCheckerModule, InternalLinkingModule, FatiModule],
})
export class AppModule {}
