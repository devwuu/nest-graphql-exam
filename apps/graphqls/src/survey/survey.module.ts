import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { EntityModule } from '@app/entity';
import { QuestionLoader } from './question.loader';

@Module({
  imports: [EntityModule],
  providers: [SurveyResolver, SurveyService, QuestionLoader],
  exports: [SurveyService],
})
export class SurveyModule {}
