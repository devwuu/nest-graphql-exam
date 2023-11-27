import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnsweredOption } from './answered-option.field';

@ObjectType()
export class AnsweredQuestion {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  order: number;

  @Field(() => [AnsweredOption], { nullable: true })
  options: AnsweredOption[];
}
