import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from '../survey/entities/survey.entity';
import { OptionService } from '../option/option.service';
import { Answer } from '../answer/entities/answer.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    private readonly optionService: OptionService,
  ) {}

  async create(createQuestionInput: CreateQuestionInput) {
    const survey = await this.surveyRepository.findOneBy({
      id: createQuestionInput.surveyId,
    });
    if (!survey) throw new NotFoundException('Not exist survey id');
    const question = await this.questionRepository.save({
      ...createQuestionInput,
      survey,
    });
    return question;
  }

  async findById(id: number) {
    const question = await this.questionRepository.findOneBy({ id });
    if (!question) throw new NotFoundException('Not exist question id');
    return question;
  }

  async update(id: number, updateQuestionInput: UpdateQuestionInput) {
    const question = await this.questionRepository.findOneBy({ id });
    if (!question) throw new NotFoundException('Not exist question id');
    await this.questionRepository.update(id, {
      ...updateQuestionInput,
    });
    return { id };
  }

  async remove(id: number) {
    const question = await this.questionRepository.findOneBy({ id });
    if (!question) throw new NotFoundException('Not exist question id');
    await this.questionRepository.softDelete(id);
    await this.optionService.removeByQuestionId(id);
    return { id };
  }

  async removeBySurveyId(id: number) {
    await this.questionRepository.softDelete({ survey: { id } });
    await this.optionService.removeBySurveyId(id); // question 하위의 options 삭제
    return { id };
  }

  async findQuestionsBySurveyId(surveyId: number, userId: number) {
    const questions = await this.questionRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect(Answer, 'a', 'a.questionId = q.id')
      .where('a.surveyId = :surveyId', { surveyId })
      .andWhere('a.userId = :userId', { userId })
      .getMany();

    return questions.map((question) => {
      return { ...question, userId };
    });
  }
}
