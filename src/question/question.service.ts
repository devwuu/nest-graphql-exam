import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from '../survey/entities/survey.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
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

  // findAll() {
  //   return `This action returns all question`;
  // }

  async findById(id: number) {
    const question = await this.questionRepository.findOneBy({ id });
    if (!question) throw new NotFoundException('Not exist question id');
    return question;
  }

  async update(id: number, updateQuestionInput: UpdateQuestionInput) {
    const question = await this.questionRepository.findOneBy({ id });
    if (!question) throw new NotFoundException('Not exist question id');
    await this.questionRepository.update(id, {
      ...question,
      ...updateQuestionInput,
    });
    return { ...question, ...updateQuestionInput };
  }

  async remove(id: number) {
    const question = await this.questionRepository.findOneBy({ id });
    if (!question) throw new NotFoundException('Not exist question id');
    await this.questionRepository.softDelete(id);
    return { id };
  }
}
