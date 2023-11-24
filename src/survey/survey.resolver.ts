import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { Survey } from './entities/survey.entity';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { Question } from '../question/entities/question.entity';
import { QuestionLoader } from '../question/question.loader';
import { Answer } from '../answer/entities/answer.entity';
import { Logger } from '@nestjs/common';

@Resolver(() => Survey)
export class SurveyResolver {
  private readonly logger = new Logger(SurveyResolver.name);

  constructor(
    private readonly surveyService: SurveyService,
    private readonly questionLoader: QuestionLoader,
  ) {}

  // 설문지 C
  @Mutation(() => Survey)
  createSurvey(
    @Args('createSurveyInput') createSurveyInput: CreateSurveyInput,
  ) {
    return this.surveyService.create(createSurveyInput);
  }

  // 설문지 R
  @Query(() => [Survey], { name: 'surveys' })
  findAll() {
    return this.surveyService.findAll();
  }

  // 설문지 R
  @Query(() => Survey, { name: 'survey' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.surveyService.findById(id);
  }

  // 설문지 U
  @Mutation(() => Survey)
  updateSurvey(
    @Args('updateSurveyInput') updateSurveyInput: UpdateSurveyInput,
  ) {
    return this.surveyService.update(updateSurveyInput.id, updateSurveyInput);
  }

  // 설문지 D
  @Mutation(() => Survey)
  removeSurvey(@Args('id', { type: () => Int }) id: number) {
    return this.surveyService.remove(id);
  }

  // query(조회)의 경우 name 필수 지정
  @ResolveField(() => [Question], { name: 'questions' })
  findQuestionsBySurveyId(@Parent() survey: Survey) {
    return this.questionLoader.findQuestionsBySurveyId.load(survey.id);
  }

  // // query(조회)의 경우 name 필수 지정
  // @ResolveField(() => [Question], { name: 'questionss' })
  // findQuestionsBySurveyIdWithAnswer(@Parent() answer: Answer) {
  //   this.logger.debug(answer);
  //   return this.questionLoader.findQuestionsBySurveyId.load(answer.surveyId);
  // }
}
