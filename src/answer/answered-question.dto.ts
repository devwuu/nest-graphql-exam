import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AnsweredQuestion {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  order: number;
}
