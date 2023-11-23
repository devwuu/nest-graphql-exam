import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class UpdateAnswerInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  @IsNumber()
  optionId: number;
}
