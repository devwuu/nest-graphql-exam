import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
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
      ...find,
      ...updateSurveyInput,
    });
    return { ...find, ...updateSurveyInput };
  }

  async remove(id: number) {
    const find = await this.surveyRepository.findOneBy({ id });
    if (!find) throw new NotFoundException('Not exist survey id');
    await this.surveyRepository.softDelete(id);
    return { id };
  }
}