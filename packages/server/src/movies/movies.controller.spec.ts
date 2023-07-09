import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { TmdbApiService } from './services/tmdb-api.service';
import { TmdbDomainService } from './services/tmdb-domain.service';
import { MoviesMongoService } from './services/movies-mongo.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        TmdbApiService,
        TmdbDomainService,
        MoviesMongoService,
        {
          provide: getModelToken('Movie'),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
