import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    passwordHash: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: String, enum: ['admin', 'user', 'staff'], default: 'user' })
    role: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop()
    avatarUrl?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
