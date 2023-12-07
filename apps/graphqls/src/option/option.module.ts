import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionResolver } from './option.resolver';
import { EntityModule } from '@app/entity';

@Module({
  imports: [EntityModule],
  providers: [OptionResolver, OptionService],
  exports: [OptionService],
})
export class OptionModule {}
