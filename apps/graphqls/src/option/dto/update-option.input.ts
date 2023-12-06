import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateOptionInput {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Field({ nullable: true })
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsNumber()
  order: number;

  @Field({ nullable: true })
  @IsNumber()
  score: number;
}
