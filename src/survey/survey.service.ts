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

  create(createSurveyInput: CreateSurveyInput) {
    return 'This action adds a new survey';
  }

  findAll() {
    return `This action returns all survey`;
  }

  async findById(id: number) {
    const survey = await this.surveyRepository.findOneBy({ id });
    if (!survey) throw new NotFoundException('Not exist survey id');
    return survey;
  }

  update(id: number, updateSurveyInput: UpdateSurveyInput) {
    return `This action updates a #${id} survey`;
  }

  remove(id: number) {
    return `This action removes a #${id} survey`;
  }
}
