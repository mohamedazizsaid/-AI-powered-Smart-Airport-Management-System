import { api } from './api';
import type { DynamicPricingResponse, Revenue } from '../types/api.types';

export const revenueService = {
    /**
     * Get AI recommended dynamic pricing
     */
    async getDynamicPricing(): Promise<DynamicPricingResponse> {
        const response = await api.get<DynamicPricingResponse>('/revenue/dynamic-pricing');
        return response.data;
    },

    /**
     * Record a new revenue transaction
     */
    async recordTransaction(transaction: Omit<Revenue, '_id' | 'createdAt' | 'updatedAt'>): Promise<Revenue> {
        const response = await api.post<Revenue>('/revenue/transaction', transaction);
        return response.data;
    },
};

export default revenueService;
