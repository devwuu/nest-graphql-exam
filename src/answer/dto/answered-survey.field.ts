import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnsweredQuestion } from './answered-question.field';

@ObjectType()
export class AnsweredSurvey {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  desc: string;

  @Field(() => [AnsweredQuestion], { nullable: true })
  questions: AnsweredQuestion[];
}
