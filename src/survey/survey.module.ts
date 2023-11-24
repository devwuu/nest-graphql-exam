import { forwardRef, Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey]),
    forwardRef(() => QuestionModule),
  ],
  providers: [SurveyResolver, SurveyService],
  exports: [TypeOrmModule],
})
export class SurveyModule {}
