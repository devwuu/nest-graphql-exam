import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from '@app/entity/survey/survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey])],
  exports: [TypeOrmModule],
})
export class SurveyModule {}
