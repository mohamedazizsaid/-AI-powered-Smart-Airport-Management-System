import { Injectable, Logger } from '@nestjs/common';
import { AppGateway } from '../gateway/app.gateway';

@Injectable()
export class NotificationsService {
    private readonly logger = new Logger(NotificationsService.name);

    constructor(private readonly appGateway: AppGateway) { }

    async sendNotification(userId: string, type: string, message: string, data?: any) {
        this.logger.log(`Sending ${type} notification to user ${userId}: ${message}`);

        // Send to WebSocket clients
        this.appGateway.server.emit('notification', {
            userId,
            type,
            message,
            data,
            timestamp: new Date()
        });

        // Simulated Email/SMS push
        if (type === 'URGENT') {
            this.logger.warn(`Pushing URGENT alert to external channels for user ${userId}`);
        }
    }

    async broadcastAlert(type: string, message: string, data?: any) {
        this.logger.log(`Broadcasting system-wide alert: ${message}`);
        this.appGateway.server.emit('systemAlert', {
            type,
            message,
            data,
            timestamp: new Date()
        });
    }
}
