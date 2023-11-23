import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Survey } from '../../survey/entities/survey.entity';
import { CommonEntity } from '../../common/entity/CommonEntity';
import { Option } from '../../option/entities/option.entity';

@ObjectType()
@Entity()
export class Question extends CommonEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @Column()
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @ManyToOne(() => Survey, (survey) => survey.id, {
    onDelete: 'SET NULL',
  })
  survey: Survey;

  @Field(() => [Option])
  options: Option[];
}
