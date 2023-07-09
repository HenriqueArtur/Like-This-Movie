import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UsersLikesMongoService } from './users-likes-mongo.service';
import { UsersLikesModel } from '../models/users-likes.mode';
import { faker } from '@faker-js/faker';

describe('UsersLikesMongoService', () => {
  let service: UsersLikesMongoService;
  let model: Model<UsersLikesModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersLikesMongoService,
        {
          provide: getModelToken('UserLike'),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersLikesMongoService>(UsersLikesMongoService);
    model = module.get<Model<UsersLikesModel>>(getModelToken('UserLike'));
  });

  describe('findBy', () => {
    it('should find user likes for given user ID and movie IDs', async () => {
      const userId = faker.database.mongodbObjectId();
      const movieIds: number[] = [
        faker.number.int(),
        faker.number.int(),
        faker.number.int(),
      ];

      const existingLikes = [
        {
          id: faker.number.int(),
          user_id: userId,
          tmdb_id: movieIds[0],
        },
        {
          id: faker.number.int(),
          user_id: userId,
          tmdb_id: movieIds[1],
        },
      ];

      jest.spyOn(model, 'find').mockResolvedValue(existingLikes);

      const result = await service.findBy(userId, movieIds);

      expect(model.find).toHaveBeenCalledWith({
        user_id: userId,
        tmdb_id: { $in: movieIds },
      });

      expect(result).toEqual([
        { id: existingLikes[0].id, user_id: userId, tmdb_id: movieIds[0] },
        { id: existingLikes[1].id, user_id: userId, tmdb_id: movieIds[1] },
      ]);
    });

    it('should return an empty array if no user likes are found', async () => {
      const userId = faker.database.mongodbObjectId();
      const movieIds: number[] = [
        faker.number.int(),
        faker.number.int(),
        faker.number.int(),
      ];

      jest.spyOn(model, 'find').mockResolvedValue([]);

      const result = await service.findBy(userId, movieIds);

      expect(model.find).toHaveBeenCalledWith({
        user_id: userId,
        tmdb_id: { $in: movieIds },
      });

      expect(result).toEqual([]);
    });
  });

  describe('findByTmdbId', () => {
    it('should find a user like by tmdb ID', async () => {
      const tmdbId = faker.number.int();
      const userLike = {
        id: faker.database.mongodbObjectId(),
        user_id: faker.database.mongodbObjectId(),
        tmdb_id: tmdbId,
      };

      jest.spyOn(model, 'findOne').mockResolvedValue(userLike);

      const result = await service.findByTmdbId(tmdbId);

      expect(model.findOne).toHaveBeenCalledWith({
        tmdb_id: tmdbId,
      });

      expect(result).toEqual(userLike);
    });

    it('should return undefined if no user like is found', async () => {
      const tmdbId = faker.number.int();

      jest.spyOn(model, 'findOne').mockResolvedValue(null);

      const result = await service.findByTmdbId(tmdbId);

      expect(model.findOne).toHaveBeenCalledWith({
        tmdb_id: tmdbId,
      });

      expect(result).toBeUndefined();
    });
  });

  describe('create', () => {
    it('should create a user like', async () => {
      const userId = faker.database.mongodbObjectId();
      const tmdbId = faker.number.int();
      const createdLike = {
        id: faker.database.mongodbObjectId(),
        user_id: userId,
        tmdb_id: tmdbId,
      };

      jest.spyOn(model, 'create').mockResolvedValue(createdLike as any);

      const result = await service.create(userId, tmdbId);

      expect(model.create).toHaveBeenCalledWith({
        user_id: userId,
        tmdb_id: tmdbId,
      });

      expect(result).toEqual(createdLike);
    });
  });

  describe('deleteByTmdbId', () => {
    it('should delete a user like by tmdb ID', async () => {
      const tmdbId = faker.number.int();

      await service.deleteByTmdbId(tmdbId);

      expect(model.findOneAndDelete).toHaveBeenCalledWith({
        tmdb_id: tmdbId,
      });
    });
  });
});
