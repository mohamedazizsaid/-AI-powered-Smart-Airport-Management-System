import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AppGateway } from '../gateway/app.gateway';

@Injectable()
export class AIService {
    private readonly logger = new Logger(AIService.name);
    private readonly aiBaseUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly appGateway: AppGateway,
    ) {
        this.aiBaseUrl =
            this.configService.get<string>('AI_SERVICE_URL') ||
            'http://localhost:8000';
    }

    async predictFlightOptimization(data: any) {
        try {
            const response = (await firstValueFrom(
                this.httpService.post(`${this.aiBaseUrl}/optimize-flights`, data),
            )) as any;
            return response.data;
        } catch (error) {
            this.logger.error(
                `Error predicting flight optimization: ${error.message}`,
            );
            throw error;
        }
    }

    async analyzeSecurity(imageData: any) {
        try {
            const response = (await firstValueFrom(
                this.httpService.post(`${this.aiBaseUrl}/security/analyze`, imageData),
            )) as any;

            if (
                response.data &&
                response.data.anomalies &&
                response.data.anomalies.length > 0
            ) {
                this.appGateway.sendSecurityAlert(response.data);
            }

            return response.data;
        } catch (error) {
            this.logger.error(`Error in security analysis: ${error.message}`);
            throw error;
        }
    }

    async chatbotResponse(query: string, userId: string) {
        try {
            const response = (await firstValueFrom(
                this.httpService.post(`${this.aiBaseUrl}/chatbot`, { query, userId }),
            )) as any;
            return response.data;
        } catch (error) {
            this.logger.error(`Error getting chatbot response: ${error.message}`);
            throw error;
        }
    }

    async predictBaggage(tagNumber: string) {
        try {
            const response = (await firstValueFrom(
                this.httpService.post(`${this.aiBaseUrl}/baggage/predict`, {
                    tagNumber,
                }),
            )) as any;
            return response.data;
        } catch (error) {
            this.logger.error(`Error predicting baggage status: ${error.message}`);
            throw error;
        }
    }

    async predictMaintenance(assetId: string) {
        try {
            const response = (await firstValueFrom(
                this.httpService.post(`${this.aiBaseUrl}/maintenance/predict`, {
                    assetId,
                }),
            )) as any;
            return response.data;
        } catch (error) {
            this.logger.error(
                `Error predicting maintenance status: ${error.message}`,
            );
            throw error;
        }
    }

    async getStaffAllocation(predictedPassengers: number) {
        try {
            const response = (await firstValueFrom(
                this.httpService.post(`${this.aiBaseUrl}/staff/allocate`, {
                    predictedPassengers,
                }),
            )) as any;
            return response.data;
        } catch (error) {
            this.logger.error(`Error getting staff allocation: ${error.message}`);
            throw error;
        }
    }

    async getRevenueStats() {
        try {
            const response = (await firstValueFrom(
                this.httpService.post(`${this.aiBaseUrl}/revenue/pricing`, {}),
            )) as any;
            return response.data;
        } catch (error) {
            this.logger.error(`Error getting revenue stats: ${error.message}`);
            throw error;
        }
    }

    async getEnvironmentalStats() {
        try {
            const response = (await firstValueFrom(
                this.httpService.post(`${this.aiBaseUrl}/environment/stats`, {}),
            )) as any;
            return response.data;
        } catch (error) {
            this.logger.error(`Error getting environmental stats: ${error.message}`);
            throw error;
        }
    }
}
