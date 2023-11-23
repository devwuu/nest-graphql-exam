import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Survey } from '../../survey/entities/survey.entity';
import { CommonEntity } from '../../common/entity/CommonEntity';

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

  // @Field()
  @ManyToOne(() => Survey, (survey) => survey.id, {
    onDelete: 'SET NULL',
  })
  // @JoinColumn({
  //   name: 'survey_id',
  //   referencedColumnName: 'id',
  // })
  survey: Survey;
}
