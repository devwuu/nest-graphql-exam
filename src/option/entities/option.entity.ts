import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommonEntity } from '../../common/entity/CommonEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from '../../question/entities/question.entity';
import { IsNumber, IsString } from 'class-validator';

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
