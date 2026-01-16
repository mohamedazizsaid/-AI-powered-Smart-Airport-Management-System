import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Revenue, RevenueDocument } from '../schemas/revenue.schema';
import { AIService } from '../ai/ai.service';

@Injectable()
export class RevenueService {
    private readonly logger = new Logger(RevenueService.name);

    constructor(
        @InjectModel(Revenue.name) private revenueModel: Model<RevenueDocument>,
        private readonly aiService: AIService,
    ) { }

    async getDynamicPricing() {
        this.logger.log('Fetching dynamic pricing models');
        return this.aiService.getRevenueStats();
    }

    async recordTransaction(transactionDto: any) {
        const transaction = new this.revenueModel(transactionDto);
        return transaction.save();
    }

    async findAll() {
        return this.revenueModel.find().exec();
    }
}
