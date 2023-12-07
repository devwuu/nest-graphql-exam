import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { QuestionService } from '../question/question.service';
import { SurveyService } from '../survey/survey.service';
import { AnsweredSurvey } from './dto/answered-survey.field';
import { AnsweredQuestion } from './dto/answered-question.field';
import { OptionLoader } from '../question/option.loader';
import { AnsweredOption } from './dto/answered-option.field';

@Resolver(() => AnsweredSurvey)
export class AnswerSurveyResolver {
  constructor(
    private readonly questionService: QuestionService,
    private readonly surveyService: SurveyService,
  ) {}

  // 완료 설문지 R
  @Query(() => AnsweredSurvey, { name: 'complete' })
  findBySurveyIdAndUserId(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return this.surveyService.findByIdWithAnswer(surveyId, userId);
  }

  @ResolveField(() => [AnsweredQuestion], { name: 'questions' })
  findSurvey(@Parent() answeredSurvey: AnsweredSurvey) {
    return this.questionService.findQuestionsBySurveyId(
      answeredSurvey.id,
      answeredSurvey.userId,
    );
  }
}

@Resolver(() => AnsweredQuestion)
export class AnsweredQuestionResolver {
  constructor(private readonly optionLoader: OptionLoader) {}
  @ResolveField(() => [AnsweredOption], { name: 'options' })
  findSurvey(@Parent() answeredQuestion: AnsweredQuestion) {
    return this.optionLoader.findSelectedOptionsByQuestionId.load(
      answeredQuestion,
    );
  }
}
