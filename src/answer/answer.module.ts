import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { OptionModule } from '../option/option.module';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), OptionModule],
  providers: [AnswerResolver, AnswerService],
  exports: [TypeOrmModule],
})
export class AnswerModule {}
