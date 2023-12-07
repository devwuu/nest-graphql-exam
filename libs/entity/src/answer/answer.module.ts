import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '@app/entity/answer/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  exports: [TypeOrmModule],
})
export class AnswerModule {}
