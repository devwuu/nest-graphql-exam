import { Field, Int, ObjectType } from '@nestjs/graphql';

import { IsNotEmpty, IsString } from 'class-validator';
import { AnsweredQuestion } from './answered-question.dto';

@ObjectType()
export class AnsweredSurvey {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @IsString()
  desc: string;

  @Field(() => [AnsweredQuestion])
  questions: AnsweredQuestion[];
}
