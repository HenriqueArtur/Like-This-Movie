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

  async findBy(userId: string, moviesIds: number[]): Promise<UsersLikesDto[]> {
    const existingMovies = await this.movieModel.find({
      user_id: userId,
      movie_id: { $in: moviesIds },
    });
    return existingMovies.map((like) => ({
      id: like.id,
      user_id: like.user_id,
      movie_id: like.movie_id,
    }));
  }
}
