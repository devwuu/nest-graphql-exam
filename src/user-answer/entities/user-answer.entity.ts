import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserAnswer {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
