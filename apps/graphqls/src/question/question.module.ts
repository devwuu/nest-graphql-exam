import { forwardRef, Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { SurveyModule } from '../survey/survey.module';
import { OptionModule } from '../option/option.module';
import { QuestionLoader } from './question.loader';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    forwardRef(() => SurveyModule),
    forwardRef(() => OptionModule),
  ],
  providers: [QuestionResolver, QuestionService, QuestionLoader],
  exports: [TypeOrmModule, QuestionService, QuestionLoader],
})
export class QuestionModule {}
