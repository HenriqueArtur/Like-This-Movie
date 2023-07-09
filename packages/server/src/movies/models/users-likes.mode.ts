import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UsersLikesModel {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  tmdb_id: number;
}

export const UsersLikesSchema = SchemaFactory.createForClass(UsersLikesModel);
