import { api } from './api';
import type {
    ChatbotResponse,
    FlightOptimizationResponse,
    SecurityAnalysisResponse,
    StaffAllocationResponse,
    DynamicPricingResponse,
    EnvironmentStatsResponse,
    MaintenancePredictionResponse,
    AnalyticsPredictionResponse,
} from '../types/api.types';

export const aiService = {
    /**
     * Send message to AI chatbot
     */
    async sendChatMessage(query: string, userId: string): Promise<ChatbotResponse> {
        const response = await api.post<ChatbotResponse>('/ai/chatbot', { query, userId });
        return response.data;
    },

    /**
     * Optimize flight schedules using ML (Admin only)
     */
    async optimizeFlights(data: { flights?: unknown[] }): Promise<FlightOptimizationResponse> {
        const response = await api.post<FlightOptimizationResponse>('/ai/optimize-flights', data);
        return response.data;
    },

    /**
     * Analyze security footage for anomalies (Admin/Staff)
     */
    async analyzeSecurity(data: unknown): Promise<SecurityAnalysisResponse> {
        const response = await api.post<SecurityAnalysisResponse>('/ai/security-analyze', data);
        return response.data;
    },

    /**
     * Get AI-powered staff allocation recommendation (Admin)
     */
    async getStaffAllocation(predictedPassengers: number): Promise<StaffAllocationResponse> {
        const response = await api.post<StaffAllocationResponse>('/ai/staff-allocation', {
            predictedPassengers,
        });
        return response.data;
    },

    /**
     * Get dynamic pricing and revenue insights (Admin)
     */
    async getRevenueOptimization(): Promise<DynamicPricingResponse> {
        const response = await api.get<DynamicPricingResponse>('/ai/revenue-optimization');
        return response.data;
    },

    /**
     * Get predictive environmental stats (Admin/Staff)
     */
    async getEnvironmentStats(): Promise<EnvironmentStatsResponse> {
        const response = await api.get<EnvironmentStatsResponse>('/ai/environment-intelligence');
        return response.data;
    },

    /**
     * Predict maintenance needs for an asset (Admin/Staff)
     */
    async predictMaintenance(assetId: string): Promise<MaintenancePredictionResponse> {
        const response = await api.post<MaintenancePredictionResponse>('/ai/maintenance-predict', {
            assetId,
        });
        return response.data;
    },

    /**
     * Get analytics predictions for a context
     */
    async predictAnalytics(
        context: 'passenger_flow' | 'revenue',
        horizonHours: number = 24
    ): Promise<AnalyticsPredictionResponse> {
        const response = await api.post<AnalyticsPredictionResponse>('/analytics/predict', {
            context,
            horizon_hours: horizonHours,
        });
        return response.data;
    },
};

export default aiService;
