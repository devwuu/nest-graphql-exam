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
import { QuestionService } from '../question/question.service';

@Resolver(() => Survey)
export class SurveyResolver {
  constructor(
    private readonly surveyService: SurveyService,
    private readonly questionService: QuestionService,
  ) {}

  @Mutation(() => Survey)
  createSurvey(
    @Args('createSurveyInput') createSurveyInput: CreateSurveyInput,
  ) {
    return this.surveyService.create(createSurveyInput);
  }

  @Query(() => [Survey], { name: 'surveys' })
  findAll() {
    return this.surveyService.findAll();
  }

  @Query(() => Survey, { name: 'survey' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.surveyService.findById(id);
  }

  @Mutation(() => Survey)
  updateSurvey(
    @Args('updateSurveyInput') updateSurveyInput: UpdateSurveyInput,
  ) {
    return this.surveyService.update(updateSurveyInput.id, updateSurveyInput);
  }

  @Mutation(() => Survey)
  removeSurvey(@Args('id', { type: () => Int }) id: number) {
    return this.surveyService.remove(id);
  }

  // query(조회)의 경우 name 필수 지정
  @ResolveField(() => [Question], { name: 'questions' })
  findQuestionsBySurveyId(@Parent() survey: Survey) {
    return this.questionService.findQuestionsBySurveyId(survey.id);
  }
}
