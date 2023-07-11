import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { MoviesMongoService } from './movies-mongo.service';
import { MovieModel } from '../models/movie.model';
import { faker } from '@faker-js/faker';
import { TmdbMovieDtoMock } from '../mocks/tmdb-movie.dto.mock';

describe('MoviesMongoService', () => {
  let service: MoviesMongoService;
  let model: Model<MovieModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesMongoService,
        {
          provide: getModelToken('Movie'),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesMongoService>(MoviesMongoService);
    model = module.get<Model<MovieModel>>(getModelToken('Movie'));
  });

  describe('findOrCreateByTmdbIds', () => {
    it('should find existing movies and create new movies', async () => {
      const tmdbMoviesMocks = Array.from({ length: 3 }, () =>
        TmdbMovieDtoMock(),
      );
      const idsMock = [
        faker.number.int(),
        faker.number.int(),
        faker.number.int(),
      ];
      const existingMovies = [
        {
          id: idsMock[0],
          tmdb_id: tmdbMoviesMocks[0].id,
          likes: 5,
          tmdb_obj: tmdbMoviesMocks[0],
        },
        {
          id: idsMock[1],
          tmdb_id: tmdbMoviesMocks[1].id,
          likes: 10,
          tmdb_obj: tmdbMoviesMocks[1],
        },
      ];

      jest.spyOn(model, 'find').mockResolvedValue(existingMovies);
      jest.spyOn(model, 'create').mockResolvedValueOnce({
        id: idsMock[2],
        tmdb_id: tmdbMoviesMocks[2].id,
        likes: 0,
        tmdb_obj: tmdbMoviesMocks[2],
      } as any);

      const result = await service.findOrCreateByTmdbIds(tmdbMoviesMocks);

      expect(model.find).toHaveBeenCalledWith({
        tmdb_id: { $in: tmdbMoviesMocks.map((m) => m.id) },
      });
      expect(model.create).toHaveBeenCalledWith({
        tmdb_id: tmdbMoviesMocks[2].id,
        likes: 0,
        tmdb_obj: tmdbMoviesMocks[2],
      });
      expect(result).toEqual([
        {
          id: idsMock[0],
          tmdb_id: tmdbMoviesMocks[0].id,
          likes: 5,
          tmdb_obj: tmdbMoviesMocks[0],
        },
        {
          id: idsMock[1],
          tmdb_id: tmdbMoviesMocks[1].id,
          likes: 10,
          tmdb_obj: tmdbMoviesMocks[1],
        },
        {
          id: idsMock[2],
          tmdb_id: tmdbMoviesMocks[2].id,
          likes: 0,
          tmdb_obj: tmdbMoviesMocks[2],
        },
      ]);
    });
  });

  describe('updateLikes', () => {
    it('should update the likes of a movie', async () => {
      const movieId = faker.number.int();
      const tmdbId = faker.number.int();
      const movieDoc = {
        id: movieId,
        tmdb_id: tmdbId,
        likes: 5,
        save: jest.fn().mockImplementationOnce(() => ({
          id: movieId,
          tmdb_id: tmdbId,
          likes: 6,
        })),
      };

      jest.spyOn(model, 'findOne').mockResolvedValue(movieDoc);

      const result = await service.updateLikes(tmdbId, 'SUM');

      expect(model.findOne).toHaveBeenCalledWith({ tmdb_id: tmdbId });
      expect(movieDoc.likes).toBe(6);
      expect(movieDoc.save).toHaveBeenCalled();
      expect(result).toEqual({
        id: movieId,
        tmdb_id: tmdbId,
        likes: 6,
      });
    });

    it('should subtract the likes of a movie', async () => {
      const movieId = faker.number.int();
      const tmdbId = faker.number.int();
      const movieDoc = {
        id: movieId,
        tmdb_id: tmdbId,
        likes: 5,
        save: jest.fn().mockResolvedValue({
          id: movieId,
          tmdb_id: tmdbId,
          likes: 4,
        }),
      };

      jest.spyOn(model, 'findOne').mockResolvedValue(movieDoc);

      const result = await service.updateLikes(tmdbId, 'SUBTRACT');

      expect(model.findOne).toHaveBeenCalledWith({ tmdb_id: tmdbId });
      expect(movieDoc.likes).toBe(4);
      expect(movieDoc.save).toHaveBeenCalled();
      expect(result).toEqual({
        id: movieId,
        tmdb_id: tmdbId,
        likes: 4,
      });
    });
  });
});
