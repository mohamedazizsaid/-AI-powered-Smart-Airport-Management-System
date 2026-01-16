import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RevenueDocument = Revenue & Document;

@Schema({ timestamps: true })
export class Revenue {
    @Prop({ required: true })
    category: string; // Parking, Retail, Lounge

    @Prop({ required: true })
    transactionAmount: number;

    @Prop()
    passengerId?: string;

    @Prop()
    locationId: string;

    @Prop({ type: Object })
    aiClusteringData?: {
        segment: string;
        propensityToSpend: number;
    };
}

export const RevenueSchema = SchemaFactory.createForClass(Revenue);
