import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommonEntity } from '../../common/entity/CommonEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber } from 'class-validator';
import { Option } from '../../option/entities/option.entity';
import { AnsweredSurvey } from '../dto/answered-survey.field';

@ObjectType()
@Entity()
export class Answer extends CommonEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  // 현재 user와 관련된 기능이 없기 때문에 user_id에 default 추가
  @Column({ default: 1, nullable: true })
  @IsNumber()
  userId: number;

  // 조회를 조금 더 용이하게 하기 위함
  @Column({ nullable: true })
  @IsNumber()
  surveyId: number;

  // 조회를 조금 더 용이하게 하기 위함
  @Column({ nullable: true })
  @IsNumber()
  questionId: number;

  // 모든 컬럼에 연관 관계를 맺는 대신 가장 최하위의 선택지에만 연관 관계를 맺어 정합성과 일정부분 타협
  @ManyToOne(() => Option, (option) => option.id)
  option: Option;

  // 응답 완료 설문 조회용
  @Field(() => AnsweredSurvey, { nullable: true })
  survey: AnsweredSurvey;
}
