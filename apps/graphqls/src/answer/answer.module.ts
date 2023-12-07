import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { EntityModule } from '@app/entity';

@Module({
  imports: [EntityModule],
  providers: [AnswerResolver, AnswerService],
})
export class AnswerModule {}
