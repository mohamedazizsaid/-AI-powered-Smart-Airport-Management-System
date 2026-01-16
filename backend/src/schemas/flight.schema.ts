import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type FlightDocument = Flight & Document;

@Schema({ timestamps: true })
export class Flight {
    @Prop({ required: true })
    flightNumber: string;

    @Prop({ required: true })
    airline: string;

    @Prop({ required: true })
    origin: string;

    @Prop({ required: true })
    destination: string;

    @Prop({ required: true })
    scheduledDeparture: Date;

    @Prop({ required: true })
    scheduledArrival: Date;

    @Prop()
    estimatedDeparture?: Date;

    @Prop()
    estimatedArrival?: Date;

    @Prop({ default: 'Scheduled', enum: ['Scheduled', 'Delayed', 'Departed', 'Arrived', 'Cancelled'] })
    status: string;

    @Prop()
    gateAssignment?: string;

    @Prop()
    terminal?: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Gate' })
    gateId?: string;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
