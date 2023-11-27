import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AnsweredOption {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  order: number;

  @Field({ nullable: true })
  score: number;
}
