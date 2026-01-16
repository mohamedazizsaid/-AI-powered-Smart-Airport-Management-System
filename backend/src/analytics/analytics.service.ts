import { Injectable, Logger } from '@nestjs/common';
import { AIService } from '../ai/ai.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight, FlightDocument } from '../schemas/flight.schema';
import { Revenue, RevenueDocument } from '../schemas/revenue.schema';

@Injectable()
export class AnalyticsService {
    private readonly logger = new Logger(AnalyticsService.name);

    constructor(
        private readonly aiService: AIService,
        @InjectModel(Flight.name) private flightModel: Model<FlightDocument>,
        @InjectModel(Revenue.name) private revenueModel: Model<RevenueDocument>,
    ) { }

    async getDashboardStats() {
        this.logger.log('Aggregating real-time dashboard analytics');

        // Aggregate real data
        const activeFlightsCount = await this.flightModel.countDocuments({ status: 'Scheduled' }).exec();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dailyRevenue = await this.revenueModel.aggregate([
            { $match: { createdAt: { $gte: today } } },
            { $group: { _id: null, total: { $sum: '$transactionAmount' } } }
        ]).exec();

        const revenueStats = await this.aiService.getRevenueStats();
        const environment = await this.aiService.getEnvironmentalStats();

        // AI Predictions
        const passengerForecast = await this.aiService.predictAnalytics('passenger_flow', 24);
        const revenueForecast = await this.aiService.predictAnalytics('revenue', 24);

        return {
            overview: {
                activeFlights: activeFlightsCount,
                dailyRevenue: dailyRevenue[0]?.total || 0,
                systemHealth: '99.9%',
                securityRisk: 'Low'
            },
            revenue: revenueStats,
            environment,
            forecast: {
                passengers: passengerForecast.forecast,
                revenue: revenueForecast.forecast
            },
            timestamp: new Date()
        };
    }
}
