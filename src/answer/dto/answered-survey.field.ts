import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnsweredQuestion } from './answered-question.field';

@ObjectType()
export class AnsweredSurvey {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  // @IsString()
  // @IsNotEmpty()
  title: string;

  @Field(() => String)
  // @IsString()
  desc: string;

  @Field(() => [AnsweredQuestion], { nullable: true })
  questions: AnsweredQuestion[];
}
