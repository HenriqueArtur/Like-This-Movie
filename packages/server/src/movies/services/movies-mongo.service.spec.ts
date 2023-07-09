import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { MoviesMongoService } from './movies-mongo.service';
import { MovieModel } from '../models/movie.model';
import { faker } from '@faker-js/faker';

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
          },
        },
      ],
    }).compile();

    service = module.get<MoviesMongoService>(MoviesMongoService);
    model = module.get<Model<MovieModel>>(getModelToken('Movie'));
  });

  describe('findOrCreateByTmdbIds', () => {
    it('should find existing movies and create new movies', async () => {
      const existingMovies: MovieModel[] = [
        { tmdb_id: 123, likes: 5 },
        { tmdb_id: 456, likes: 10 },
      ];
      const tmdbIds: number[] = [123, 456, 789];

      jest.spyOn(model, 'find').mockResolvedValue(existingMovies);
      jest.spyOn(model, 'create').mockResolvedValueOnce({
        tmdb_id: 789,
        likes: 0,
      } as any);

      const result = await service.findOrCreateByTmdbIds(tmdbIds);

      expect(model.find).toHaveBeenCalledWith({ tmdb_id: { $in: tmdbIds } });
      expect(model.create).toHaveBeenCalledWith({
        tmdb_id: 789,
        likes: 0,
      });
      expect(result).toEqual([
        { id: '1', tmdb_id: 123, likes: 5 },
        { id: '2', tmdb_id: 456, likes: 10 },
        { id: '3', tmdb_id: 789, likes: 0 },
      ]);
    });
  });

  describe('updateLikes', () => {
    it('should update the likes of a movie', async () => {
      const movieId = faker.number.int();
      const movieDoc = {
        tmdb_id: 123,
        likes: 5,
        save: jest.fn().mockResolvedValue({
          id: movieId,
          tmdb_id: 123,
          likes: 6,
        }),
      };

      jest.spyOn(model, 'findById').mockResolvedValue(movieDoc);

      const result = await service.updateLikes(movieId, 'SUM');

      expect(model.findById).toHaveBeenCalledWith(movieId);
      expect(movieDoc.likes).toBe(6);
      expect(movieDoc.save).toHaveBeenCalled();
      expect(result).toEqual({
        id: movieId,
        tmdb_id: 123,
        likes: 6,
      });
    });

    it('should subtract the likes of a movie', async () => {
      const movieId = faker.number.int();
      const movieDoc = {
        id: movieId,
        tmdb_id: 123,
        likes: 5,
        save: jest.fn().mockResolvedValue({
          id: movieId,
          tmdb_id: 123,
          likes: 4,
        }),
      };

      jest.spyOn(model, 'findById').mockResolvedValue(movieDoc);

      const result = await service.updateLikes(movieId, 'SUBTRACT');

      expect(model.findById).toHaveBeenCalledWith(movieId);
      expect(movieDoc.likes).toBe(4);
      expect(movieDoc.save).toHaveBeenCalled();
      expect(result).toEqual({
        id: movieId,
        tmdb_id: 123,
        likes: 4,
      });
    });
  });
});
