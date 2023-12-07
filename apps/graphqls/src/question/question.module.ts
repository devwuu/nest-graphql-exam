import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { EntityModule } from '@app/entity';
import { OptionLoader } from './option.loader';

@Module({
  imports: [EntityModule],
  providers: [QuestionResolver, QuestionService, OptionLoader],
  exports: [QuestionService, OptionLoader],
})
export class QuestionModule {}
