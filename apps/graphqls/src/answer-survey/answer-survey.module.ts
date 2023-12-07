import { Module } from '@nestjs/common';
import {
  AnsweredQuestionResolver,
  AnswerSurveyResolver,
} from './answer-survey.resolver';
import { SurveyModule } from '../survey/survey.module';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [SurveyModule, QuestionModule],
  providers: [AnswerSurveyResolver, AnsweredQuestionResolver],
})
export class AnswerSurveyModule {}
