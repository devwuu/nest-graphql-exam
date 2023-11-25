import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AnsweredOption {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  order: number;

  @Field()
  score: number;
}
