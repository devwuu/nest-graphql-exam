import { forwardRef, Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { SurveyModule } from '../survey/survey.module';
import { OptionModule } from '../option/option.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    SurveyModule,
    forwardRef(() => OptionModule),
  ],
  providers: [QuestionResolver, QuestionService],
  exports: [TypeOrmModule],
})
export class QuestionModule {}
