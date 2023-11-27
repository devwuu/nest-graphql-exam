import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Repository } from 'typeorm';
import { QuestionService } from '../question/question.service';
import { Answer } from '../answer/entities/answer.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    private readonly questionService: QuestionService,
  ) {}

  async create(createSurveyInput: CreateSurveyInput) {
    const saved = await this.surveyRepository.save(createSurveyInput);
    return saved;
  }

  async findAll() {
    const surveys = await this.surveyRepository.find();
    return surveys;
  }

  async findById(id: number) {
    const survey = await this.surveyRepository.findOneBy({ id });
    if (!survey) throw new NotFoundException('Not exist survey id');
    return survey;
  }

  async update(id: number, updateSurveyInput: UpdateSurveyInput) {
    const find = await this.surveyRepository.findOneBy({ id });
    if (!find) throw new NotFoundException('Not exist survey id');
    await this.surveyRepository.update(id, {
      ...updateSurveyInput,
    });
    return { id };
  }

  async remove(id: number) {
    const find = await this.surveyRepository.findOneBy({ id });
    if (!find) throw new NotFoundException('Not exist survey id');
    await this.surveyRepository.softDelete(id);
    await this.questionService.removeBySurveyId(id); // survey 하위의 quetions 삭제
    return { id };
  }

  async findByIdWithAnswer(surveyId: number, userId: number) {
    const survey = await this.surveyRepository
      .createQueryBuilder('s')
      .innerJoinAndSelect(Answer, 'a', 'a.surveyId = s.id')
      .where('a.userId = :userId', { userId })
      .andWhere('a.surveyId = :surveyId', { surveyId })
      .getOne();

    return { ...survey, userId };
  }
}
