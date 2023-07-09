import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MovieModel {
  @Prop({ required: true })
  tmdb_id: number;

  @Prop({ required: true })
  likes: number;
}

export const MovieSchema = SchemaFactory.createForClass(MovieModel);
