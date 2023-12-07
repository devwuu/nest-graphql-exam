import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommonEntity } from '../common.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { Question } from '@app/entity/question/question.entity';

@ObjectType()
@Entity()
export class Option extends CommonEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsString()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsNumber()
  order: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsNumber()
  score: number;

  @ManyToOne(() => Question, (question) => question.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'questionId', referencedColumnName: 'id' })
  question: Question;

  // 조회를 조금 더 용이하게 하기 위함
  @Column({ name: 'surveyId', nullable: true })
  @IsNumber()
  surveyId: number;
}
