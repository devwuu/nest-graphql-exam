import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { SurveyModule } from '../survey/survey.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), SurveyModule],
  providers: [QuestionResolver, QuestionService],
  exports: [TypeOrmModule],
})
export class QuestionModule {}
