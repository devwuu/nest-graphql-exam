import { Test, TestingModule } from '@nestjs/testing';
import { AnswerSurveyResolver } from './answer-survey.resolver';
import { AnswerSurveyService } from './answer-survey.service';

describe('AnswerSurveyResolver', () => {
  let resolver: AnswerSurveyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerSurveyResolver, AnswerSurveyService],
    }).compile();

    resolver = module.get<AnswerSurveyResolver>(AnswerSurveyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
