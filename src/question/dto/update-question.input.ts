import { CreateQuestionInput } from './create-question.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateQuestionInput extends PartialType(CreateQuestionInput) {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;

  @Field({ nullable: true })
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsNotEmpty()
  order: number;
}
