import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TmdbMovieDto } from '../dto/tmdb-movie.dto';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class MovieModel {
  @Prop({ required: true })
  tmdb_id: number;

  @Prop({ required: true })
  likes: number;

  @Prop({ type: MongooseSchema.Types.Map, required: true })
  tmdb_obj: TmdbMovieDto;
}

export const MovieSchema = SchemaFactory.createForClass(MovieModel);
