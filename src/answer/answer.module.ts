import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnsweredSurveyResolver, AnswerResolver } from './answer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { OptionModule } from '../option/option.module';
import { SurveyModule } from '../survey/survey.module';
import { QuestionService } from '../question/question.service';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    SurveyModule,
    QuestionModule,
    OptionModule,
  ],
  providers: [AnswerResolver, AnswerService, AnsweredSurveyResolver],
  exports: [TypeOrmModule],
})
export class AnswerModule {}
