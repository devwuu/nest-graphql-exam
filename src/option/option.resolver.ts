import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OptionService } from './option.service';
import { Option } from './entities/option.entity';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';

@Resolver(() => Option)
export class OptionResolver {
  constructor(private readonly optionService: OptionService) {}

  // 선택지 C
  @Mutation(() => Option)
  createOption(
    @Args('createOptionInput') createOptionInput: CreateOptionInput,
  ) {
    return this.optionService.create(createOptionInput);
  }

  // 선택지 R
  @Query(() => Option, { name: 'option' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.optionService.findById(id);
  }

  // 선택지 U
  @Mutation(() => Option)
  updateOption(
    @Args('updateOptionInput') updateOptionInput: UpdateOptionInput,
  ) {
    return this.optionService.update(updateOptionInput.id, updateOptionInput);
  }

  // 선택지 D
  @Mutation(() => Option)
  removeOption(@Args('id', { type: () => Int }) id: number) {
    return this.optionService.remove(id);
  }
}
