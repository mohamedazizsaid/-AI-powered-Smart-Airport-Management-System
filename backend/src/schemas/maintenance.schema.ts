import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MaintenanceDocument = Maintenance & Document;

@Schema({ timestamps: true })
export class Maintenance {
    @Prop({ required: true })
    assetId: string;

    @Prop({ required: true })
    assetType: string;

    @Prop({ default: 'Healthy', enum: ['Healthy', 'Warning', 'Critical', 'Under Maintenance'] })
    status: string;

    @Prop()
    lastInspectionDate: Date;

    @Prop()
    nextScheduledMaintenance: Date;

    @Prop()
    wearLevel: number; // 0-100

    @Prop([String])
    aiDetectedRisks: string[];
}

export const MaintenanceSchema = SchemaFactory.createForClass(Maintenance);
