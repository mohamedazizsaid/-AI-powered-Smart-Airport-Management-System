import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Maintenance, MaintenanceDocument } from '../schemas/maintenance.schema';
import { AIService } from '../ai/ai.service';

@Injectable()
export class MaintenanceService {
    private readonly logger = new Logger(MaintenanceService.name);

    constructor(
        @InjectModel(Maintenance.name) private maintenanceModel: Model<MaintenanceDocument>,
        private readonly aiService: AIService,
    ) { }

    async getAssetStatus(assetId: string) {
        let asset = await this.maintenanceModel.findOne({ assetId }).exec();

        // Use AI to predict maintenance needs
        const prediction = await this.aiService.predictMaintenance(assetId);

        if (asset) {
            asset = await this.maintenanceModel.findOneAndUpdate(
                { assetId },
                {
                    wearLevel: prediction.wearLevel,
                    status: prediction.status,
                    aiDetectedRisks: prediction.visionDetection
                },
                { new: true }
            ).exec();
        }

        return asset || prediction;
    }

    async findAll() {
        return this.maintenanceModel.find().exec();
    }
}
