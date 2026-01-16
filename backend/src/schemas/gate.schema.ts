import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GateDocument = Gate & Document;

@Schema({ timestamps: true })
export class Gate {
    @Prop({ required: true, unique: true })
    gateNumber: string;

    @Prop({ required: true })
    terminal: string;

    @Prop({ default: 'Available', enum: ['Available', 'Occupied', 'Maintenance', 'Closed'] })
    status: string;

    @Prop()
    currentFlightId?: string;
}

export const GateSchema = SchemaFactory.createForClass(Gate);
