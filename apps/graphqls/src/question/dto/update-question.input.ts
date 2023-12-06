import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateQuestionInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @Field({ nullable: true })
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsNumber()
  order: number;
}
