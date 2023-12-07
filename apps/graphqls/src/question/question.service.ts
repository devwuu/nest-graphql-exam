import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from '@app/entity/answer/answer.entity';
import { Question } from '@app/entity/question/question.entity';
import { Survey } from '@app/entity/survey/survey.entity';
import { Option } from '@app/entity/option/option.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
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
    await this.optionRepository.softDelete({ question: { id } });
    return { id };
  }

  async findQuestionsBySurveyId(surveyId: number, userId: number) {
    const questions = await this.questionRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect(Answer, 'a', 'a.questionId = q.id')
      .where('a.surveyId = :surveyId', { surveyId })
      .andWhere('a.userId = :userId', { userId })
      .getMany();

    if (!questions) throw new NotFoundException('Answer is not exist');

    return questions.map((question) => {
      return { ...question, userId };
    });
  }
}
