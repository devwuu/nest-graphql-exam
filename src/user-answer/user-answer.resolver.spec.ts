import { Test, TestingModule } from '@nestjs/testing';
import { UserAnswerResolver } from './user-answer.resolver';
import { UserAnswerService } from './user-answer.service';

describe('UserAnswerResolver', () => {
  let resolver: UserAnswerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAnswerResolver, UserAnswerService],
    }).compile();

    resolver = module.get<UserAnswerResolver>(UserAnswerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
