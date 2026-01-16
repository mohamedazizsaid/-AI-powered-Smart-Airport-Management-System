import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BaggageDocument = Baggage & Document;

@Schema({ timestamps: true })
export class Baggage {
    @Prop({ required: true, unique: true })
    tagNumber: string;

    @Prop({ required: true })
    passengerId: string;

    @Prop({ required: true })
    flightId: string;

    @Prop({ default: 'CheckedIn', enum: ['CheckedIn', 'InTransit', 'Loaded', 'Unloaded', 'AtCarousel', 'Claimed', 'Lost'] })
    status: string;

    @Prop()
    currentLocation?: string;

    @Prop()
    estimatedDeliveryTime?: Date;
}

export const BaggageSchema = SchemaFactory.createForClass(Baggage);
