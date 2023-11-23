import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateAnswerInput {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  surveyId: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  optionId: number;

  // 로그인 기능이 추가될 예정인 경우, userId는 front에서 파라미터로 받지 않고 현재 로그인 되어 있는 user의 정보를 사용해야할 것으로 예상됨
  // 현재는 없다는 가정 하에 파라미터로 진행
  @Field()
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
