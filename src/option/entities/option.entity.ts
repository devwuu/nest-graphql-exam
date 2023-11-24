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

  @Field()
  @Column()
  @IsString()
  title: string;

  @Field()
  @Column()
  @IsNumber()
  order: number;

  @Field()
  @Column()
  @IsNumber()
  score: number;

  @ManyToOne(() => Question, (question) => question.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'questionId', referencedColumnName: 'id' })
  question: Question;

  @Column({ name: 'surveyId' })
  @IsNumber()
  survey: number;
}
