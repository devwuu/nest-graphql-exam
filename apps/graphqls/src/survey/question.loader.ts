import * as DataLoader from 'dataloader';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, Scope } from '@nestjs/common';
import { Question } from '@app/entity/question/question.entity';

@Injectable({ scope: Scope.REQUEST })
export class QuestionLoader {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  findQuestionsBySurveyId = new DataLoader(async (surveyIds: number[]) => {
    const questions = await this.questionRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.survey', 's')
      .where('s.id in (:...surveyIds)', { surveyIds })
      .getMany();

    return surveyIds.map((sId) => questions.filter((q) => q.survey.id === sId));
  });
}
