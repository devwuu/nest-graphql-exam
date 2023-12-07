import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import {
  AnsweredQuestionResolver,
  AnsweredSurveyResolver,
  AnswerResolver,
} from './answer.resolver';
import { EntityModule } from '@app/entity';
import { SurveyModule } from '../survey/survey.module';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [EntityModule, SurveyModule, QuestionModule],
  providers: [
    AnswerResolver,
    AnswerService,
    AnsweredSurveyResolver,
    AnsweredQuestionResolver,
  ],
})
export class AnswerModule {}
