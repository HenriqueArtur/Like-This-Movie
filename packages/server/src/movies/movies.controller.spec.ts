import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { TmdbApiService } from './services/tmdb-api.service';
import { TmdbDomainService } from './services/tmdb-domain.service';
import { MoviesMongoService } from './services/movies-mongo.service';
import { UsersLikesMongoService } from './services/users-likes-mongo.service';
import { TmdbMovieDtoMock } from './mocks/tmdb-movie.dto.mock';
import { TmdbMovieToAppDtoMock } from './mocks/tmdb-movie-to-app.dto.mock';
import { faker } from '@faker-js/faker';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('MoviesController', () => {
  let controller: MoviesController;
  let tmdbApiService: TmdbApiService;
  let tmdbDomainService: TmdbDomainService;
  let moviesService: MoviesMongoService;
  let usersLikesService: UsersLikesMongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        TmdbApiService,
        TmdbDomainService,
        MoviesMongoService,
        UsersLikesMongoService,
        {
          provide: getModelToken('Movie'),
          useValue: Model,
        },
        {
          provide: getModelToken('UserLike'),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    tmdbApiService = module.get<TmdbApiService>(TmdbApiService);
    tmdbDomainService = module.get<TmdbDomainService>(TmdbDomainService);
    moviesService = module.get<MoviesMongoService>(MoviesMongoService);
    usersLikesService = module.get<UsersLikesMongoService>(
      UsersLikesMongoService,
    );
  });

  describe('mostTrended', () => {
    it('should return the most trended movie', async () => {
      const tmdbMovie = TmdbMovieDtoMock();
      jest
        .spyOn(tmdbApiService, 'trendingMovies')
        .mockResolvedValueOnce([tmdbMovie]);
      jest
        .spyOn(tmdbDomainService, 'get10MostPopular')
        .mockReturnValueOnce([tmdbMovie]);

      await controller.mostTrended();
      expect(tmdbApiService.trendingMovies).toHaveBeenCalled();
      expect(tmdbDomainService.get10MostPopular).toHaveBeenCalledWith([
        tmdbMovie,
      ]);
    });
  });

  describe('fetchTop10', () => {
    it('should fetch top 10 movies and format the response', async () => {
      const userId = faker.database.mongodbObjectId();
      const tmdBrTrendPage1 = Array.from({ length: 15 }, () =>
        TmdbMovieDtoMock(),
      );
      const top10 = tmdBrTrendPage1.slice(0, 10);
      const top10Formatted = Array.from({ length: 15 }, () =>
        TmdbMovieToAppDtoMock(),
      );
      const moviesLike = top10Formatted.map((ml) => ({
        id: faker.database.mongodbObjectId(),
        tmdb_id: ml.id,
        likes: faker.number.int(100),
        tmdb_obj: TmdbMovieDtoMock(),
      }));
      const userLikes = [
        {
          id: faker.database.mongodbObjectId(),
          user_id: userId,
          tmdb_id: top10Formatted[0].id,
        },
        {
          id: faker.database.mongodbObjectId(),
          user_id: userId,
          tmdb_id: top10Formatted[3].id,
        },
      ];

      jest
        .spyOn(tmdbApiService, 'trendingMovies')
        .mockResolvedValue(tmdBrTrendPage1);
      jest.spyOn(tmdbDomainService, 'get10MostPopular').mockReturnValue(top10);
      jest
        .spyOn(tmdbDomainService, 'formatToResponse')
        .mockReturnValue(top10Formatted);
      jest
        .spyOn(moviesService, 'findOrCreateByTmdbIds')
        .mockResolvedValue(moviesLike);
      jest.spyOn(usersLikesService, 'findBy').mockResolvedValue(userLikes);

      const result = await controller.fetchTop10({ user: { id: userId } });

      expect(tmdbApiService.trendingMovies).toHaveBeenCalled();
      expect(tmdbDomainService.get10MostPopular).toHaveBeenCalledWith(
        tmdBrTrendPage1,
      );
      expect(tmdbDomainService.formatToResponse).toHaveBeenCalledWith(top10);
      expect(moviesService.findOrCreateByTmdbIds).toHaveBeenCalledWith(top10);
      expect(usersLikesService.findBy).toHaveBeenCalledWith(
        userId,
        top10Formatted.map((m) => m.id),
      );

      const userLikesIds = userLikes.map((l) => l.tmdb_id);
      expect(result).toEqual(
        top10Formatted.map((l) => {
          const movieInApp = moviesLike.find((ml) => ml.tmdb_id == l.id);
          return {
            ...l,
            tmdb_id: l.id,
            id: movieInApp.id,
            likes: movieInApp.likes,
            userLiked: !!userLikesIds.includes(movieInApp.tmdb_id),
          };
        }),
      );
    });
  });

  describe('toggleLike', () => {
    const userId = faker.database.mongodbObjectId();
    const req = { user: { id: userId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    it('should create a like and update likes if it does not exist', async () => {
      const tmdbId = faker.number.int();
      const newLike = {
        id: faker.database.mongodbObjectId(),
        user_id: userId,
        tmdb_id: tmdbId,
      };

      jest
        .spyOn(usersLikesService, 'findByTmdbId')
        .mockResolvedValue(undefined);
      jest.spyOn(usersLikesService, 'create').mockResolvedValue(newLike);
      jest.spyOn(moviesService, 'updateLikes').mockResolvedValueOnce({
        id: faker.database.mongodbObjectId(),
        likes: 1,
        tmdb_id: tmdbId,
        tmdb_obj: TmdbMovieDtoMock(),
      });
      jest.spyOn(res, 'status').mockReturnValue(res as any);

      await controller.toggleLike(req, res as any, tmdbId);

      expect(usersLikesService.findByTmdbId).toHaveBeenCalledWith(
        userId,
        tmdbId,
      );
      expect(usersLikesService.create).toHaveBeenCalledWith(userId, tmdbId);
      expect(moviesService.updateLikes).toHaveBeenCalledWith(tmdbId);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(res.send).toHaveBeenCalledWith(newLike);
    });

    it('should delete a like and update likes if it exists', async () => {
      const tmdbId = faker.number.int();

      jest.spyOn(usersLikesService, 'findByTmdbId').mockResolvedValue({
        id: '1',
        user_id: userId,
        tmdb_id: tmdbId,
      });
      jest.spyOn(usersLikesService, 'deleteByTmdbId').mockResolvedValueOnce();
      jest.spyOn(moviesService, 'updateLikes').mockResolvedValueOnce({
        id: faker.database.mongodbObjectId(),
        likes: 1,
        tmdb_id: tmdbId,
        tmdb_obj: TmdbMovieDtoMock(),
      });
      jest.spyOn(res, 'status').mockReturnValue(res as any);

      await controller.toggleLike(req, res as any, tmdbId);

      expect(usersLikesService.findByTmdbId).toHaveBeenCalledWith(
        userId,
        tmdbId,
      );
      expect(usersLikesService.deleteByTmdbId).toHaveBeenCalledWith(tmdbId);
      expect(moviesService.updateLikes).toHaveBeenCalledWith(
        tmdbId,
        'SUBTRACT',
      );
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
      expect(res.send).toHaveBeenCalledWith();
    });
  });
});
