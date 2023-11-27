import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { SurveyService } from '../survey/survey.service';
import { OptionLoader } from '../option/option.loader';
import { QuestionService } from '../question/question.service';
import { AnsweredSurvey } from './dto/answered-survey.field';
import { AnsweredQuestion } from './dto/answered-question.field';
import { AnsweredOption } from './dto/answered-option.field';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(
    private readonly answerService: AnswerService,
    private readonly surveyService: SurveyService,
  ) {}

  // 답변 C
  @Mutation(() => Answer)
  createAnswer(
    @Args('createAnswerInput') createAnswerInput: CreateAnswerInput,
  ) {
    return this.answerService.create(createAnswerInput);
  }

  // 설문지 완료
  @Mutation(() => [Answer])
  createAnswers(
    @Args({ name: 'createAnswerInputs', type: () => [CreateAnswerInput] })
    createAnswerInputs: CreateAnswerInput[],
  ) {
    return this.answerService.createAll(createAnswerInputs);
  }

  // 답변 R
  @Query(() => Answer, { name: 'answer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.answerService.findById(id);
  }

  // 답변 U
  @Mutation(() => Answer)
  updateAnswer(
    @Args('updateAnswerInput') updateAnswerInput: UpdateAnswerInput,
  ) {
    return this.answerService.update(updateAnswerInput.id, updateAnswerInput);
  }

  // 답변 D
  @Mutation(() => Answer)
  removeAnswer(@Args('id', { type: () => Int }) id: number) {
    return this.answerService.remove(id);
  }

  @ResolveField(() => AnsweredSurvey, { name: 'survey' })
  findSurvey(@Parent() answer: Answer) {
    return this.surveyService.findById(answer.surveyId);
  }
}

// 완료 설문지 조회
@Resolver(() => AnsweredSurvey)
export class AnsweredSurveyResolver {
  constructor(private readonly questionService: QuestionService) {}
  @ResolveField(() => [AnsweredQuestion], { name: 'questions' })
  findSurvey(@Parent() answeredSurvey: AnsweredSurvey) {
    return this.questionService.findQuestionsBySurveyId(answeredSurvey.id);
  }
}

// 완료 설문지 조회
@Resolver(() => AnsweredQuestion)
export class AnsweredQuestionResolver {
  constructor(private readonly optionLoader: OptionLoader) {}
  @ResolveField(() => [AnsweredOption], { name: 'options' })
  findSurvey(@Parent() answeredQuestion: AnsweredQuestion) {
    return this.optionLoader.findSelectedOptionsByQuestionId.load(
      answeredQuestion.id,
    );
  }
}
