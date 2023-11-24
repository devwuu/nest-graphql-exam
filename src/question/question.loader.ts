import * as DataLoader from 'dataloader';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';

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
