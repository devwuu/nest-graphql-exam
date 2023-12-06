import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateOptionInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  score: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  questionId: number;
}
