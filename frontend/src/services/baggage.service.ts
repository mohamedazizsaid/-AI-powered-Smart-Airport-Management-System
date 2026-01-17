import { api } from './api';
import type { BaggagePredictionResponse } from '../types/api.types';

export const baggageService = {
    /**
     * Track baggage and get AI-based delivery prediction
     */
    async track(tagNumber: string): Promise<BaggagePredictionResponse> {
        const response = await api.post<BaggagePredictionResponse>('/baggage/track', { tagNumber });
        return response.data;
    },
};

export default baggageService;
