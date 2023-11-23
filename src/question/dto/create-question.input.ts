import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateQuestionInput {
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
  surveyId: number;
}
