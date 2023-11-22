import { Module } from '@nestjs/common';
import { UserAnswerService } from './user-answer.service';
import { UserAnswerResolver } from './user-answer.resolver';

@Module({
  providers: [UserAnswerResolver, UserAnswerService],
})
export class UserAnswerModule {}
