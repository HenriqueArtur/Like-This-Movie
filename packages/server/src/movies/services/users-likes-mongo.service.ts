import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersLikesModel } from '../models/users-likes.mode';
import { UsersLikesDto } from '../dto/user-like.dto';

@Injectable()
export class UsersLikesMongoService {
  constructor(
    @InjectModel('UserLike')
    private readonly movieModel: Model<UsersLikesModel>,
  ) {}

  async findBy(userId: string, tmdbIds: number[]): Promise<UsersLikesDto[]> {
    const existingMovies = await this.movieModel.find({
      user_id: userId,
      tmdb_id: { $in: tmdbIds },
    });
    return existingMovies.map((like) => ({
      id: like.id,
      user_id: like.user_id,
      tmdb_id: like.tmdb_id,
    }));
  }

  async findByTmdbId(tmdbId: number): Promise<UsersLikesDto | undefined> {
    const like = await this.movieModel.findOne({
      tmdb_id: tmdbId,
    });
    if (!like) {
      return undefined;
    }
    return {
      id: like.id,
      user_id: like.user_id,
      tmdb_id: like.tmdb_id,
    };
  }

  async create(userId: string, tmdbId: number): Promise<UsersLikesDto> {
    const like = await this.movieModel.create({
      user_id: userId,
      tmdb_id: tmdbId,
    });
    return {
      id: like.id,
      user_id: like.user_id,
      tmdb_id: like.tmdb_id,
    };
  }

  async deleteByTmdbId(tmdbId: number): Promise<void> {
    await this.movieModel.findOneAndDelete({
      tmdb_id: tmdbId,
    });
  }
}
