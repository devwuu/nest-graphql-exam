import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserAnswerService } from './user-answer.service';
import { UserAnswer } from './entities/user-answer.entity';
import { CreateUserAnswerInput } from './dto/create-user-answer.input';
import { UpdateUserAnswerInput } from './dto/update-user-answer.input';

@Resolver(() => UserAnswer)
export class UserAnswerResolver {
  constructor(private readonly userAnswerService: UserAnswerService) {}

  @Mutation(() => UserAnswer)
  createUserAnswer(@Args('createUserAnswerInput') createUserAnswerInput: CreateUserAnswerInput) {
    return this.userAnswerService.create(createUserAnswerInput);
  }

  @Query(() => [UserAnswer], { name: 'userAnswer' })
  findAll() {
    return this.userAnswerService.findAll();
  }

  @Query(() => UserAnswer, { name: 'userAnswer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userAnswerService.findOne(id);
  }

  @Mutation(() => UserAnswer)
  updateUserAnswer(@Args('updateUserAnswerInput') updateUserAnswerInput: UpdateUserAnswerInput) {
    return this.userAnswerService.update(updateUserAnswerInput.id, updateUserAnswerInput);
  }

  @Mutation(() => UserAnswer)
  removeUserAnswer(@Args('id', { type: () => Int }) id: number) {
    return this.userAnswerService.remove(id);
  }
}
