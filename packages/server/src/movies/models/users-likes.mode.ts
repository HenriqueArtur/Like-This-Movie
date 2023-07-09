import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UsersLikesModel {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  movie_id: string;
}

export const UsersLikesSchema = SchemaFactory.createForClass(UsersLikesModel);
