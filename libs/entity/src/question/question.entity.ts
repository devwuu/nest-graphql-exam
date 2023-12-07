import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { CommonEntity } from '@app/entity/common.entity';
import { Survey } from '@app/entity/survey/survey.entity';
import { Option } from '@app/entity/option/option.entity';

@ObjectType()
@Entity()
export class Question extends CommonEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsString()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsNumber()
  order: number;

  @ManyToOne(() => Survey, (survey) => survey.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'surveyId', referencedColumnName: 'id' })
  survey: Survey;

  @Field(() => [Option], { nullable: true })
  options: Option[];
}
