import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StaffDocument = Staff & Document;

@Schema({ timestamps: true })
export class Staff {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    employeeId: string;

    @Prop({ required: true, enum: ['Security', 'Check-in', 'Maintenance', 'Ground Crew'] })
    department: string;

    @Prop({ default: 'Available', enum: ['Available', 'On Duty', 'On Break', 'Off Duty'] })
    status: string;

    @Prop()
    currentZone?: string;

    @Prop({ type: Object })
    aiEfficiencyMetrics?: {
        taskCompletionRate: number;
        stressLevel: string;
    };
}

export const StaffSchema = SchemaFactory.createForClass(Staff);
