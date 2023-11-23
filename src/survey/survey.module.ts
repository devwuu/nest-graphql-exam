import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey])],
  providers: [SurveyResolver, SurveyService],
  exports: [TypeOrmModule],
})
export class SurveyModule {}
