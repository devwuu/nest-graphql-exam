import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Repository } from 'typeorm';

// @Injectable({ scope: Scope.REQUEST })
// export class SurveyLoader {
//   constructor(
//     @InjectRepository(Survey)
//     private readonly surveyRepository: Repository<Survey>,
//   ) {}
// }
