import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Staff, StaffDocument } from '../schemas/staff.schema';
import { AIService } from '../ai/ai.service';

@Injectable()
export class StaffService {
    private readonly logger = new Logger(StaffService.name);

    constructor(
        @InjectModel(Staff.name) private staffModel: Model<StaffDocument>,
        private readonly aiService: AIService,
    ) { }

    async optimizeAllocation(predictedPassengers: number) {
        this.logger.log(`Optimizing staff for ${predictedPassengers} passengers`);

        const allocation = await this.aiService.getStaffAllocation(predictedPassengers);

        // Potentially update on-duty status of staff in DB here

        return allocation;
    }

    async findAll() {
        return this.staffModel.find().exec();
    }

    async create(staffDto: any) {
        const staff = new this.staffModel(staffDto);
        return staff.save();
    }
}
