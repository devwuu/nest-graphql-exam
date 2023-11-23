import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommonEntity } from '../../common/entity/CommonEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  question: Question;

  // todo survey id 추가 여부 검토
}