import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Answer } from '../answer/entities/answer.entity';
import { Option } from '../option/entities/option.entity';
import { OptionService } from '../option/option.service';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(
    private readonly questionService: QuestionService,
    private readonly optionService: OptionService,
  ) {}

  @Mutation(() => Question)
  createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ) {
    return this.questionService.create(createQuestionInput);
  }

  @Query(() => Question, { name: 'question' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.findById(id);
  }

  @Mutation(() => Question)
  updateQuestion(
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ) {
    return this.questionService.update(
      updateQuestionInput.id,
      updateQuestionInput,
    );
  }

  @Mutation(() => Question)
  removeQuestion(@Args('id', { type: () => Int }) id: number) {
    return this.questionService.remove(id);
  }

  @ResolveField(() => [Option], { name: 'options' })
  findOptionsByQuestionId(@Parent() question: Question) {
    return this.optionService.findOptionsByQuestionId(question.id);
  }
}
