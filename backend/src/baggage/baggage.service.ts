import { Injectable, Logger } from '@nestjs/common';
import { AIService } from '../ai/ai.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class BaggageService {
    private readonly logger = new Logger(BaggageService.name);

    constructor(
        private readonly aiService: AIService,
        private readonly notificationsService: NotificationsService,
    ) { }

    async trackBaggage(tagNumber: string, userId: string) {
        this.logger.log(`Tracking baggage for tag: ${tagNumber}`);

        // Call AI service for prediction
        const prediction = await this.aiService.predictBaggage(tagNumber);

        // If anomalies detected, notify user
        if (prediction.anomalies && prediction.anomalies.length > 0) {
            await this.notificationsService.sendNotification(
                userId,
                'URGENT',
                `Anomaly detected for your baggage ${tagNumber}: ${prediction.anomalies[0].message}`,
                prediction
            );
        }

        return prediction;
    }
}
