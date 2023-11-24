import { forwardRef, Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionResolver } from './option.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { QuestionModule } from '../question/question.module';
import { OptionLoader } from './option.loader';

@Module({
  imports: [
    TypeOrmModule.forFeature([Option]),
    forwardRef(() => QuestionModule),
  ],
  providers: [OptionResolver, OptionService, OptionLoader],
  exports: [TypeOrmModule, OptionService, OptionLoader],
})
export class OptionModule {}
