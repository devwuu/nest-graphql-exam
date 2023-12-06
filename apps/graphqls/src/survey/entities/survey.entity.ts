import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from '../../common/entity/CommonEntity';
import { Question } from '../../question/entities/question.entity';

@ObjectType()
@Entity()
export class Survey extends CommonEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  desc: string;

  @Field(() => [Question], { nullable: true })
  questions: Question[];
}
