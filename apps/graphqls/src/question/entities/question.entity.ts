import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { Survey } from '../../survey/entities/survey.entity';
import { CommonEntity } from '../../common/entity/CommonEntity';
import { Option } from '../../option/entities/option.entity';

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
