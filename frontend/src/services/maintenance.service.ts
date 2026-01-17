import { api } from './api';
import type { Maintenance, MaintenancePredictionResponse } from '../types/api.types';

export const maintenanceService = {
    /**
     * Get all airport assets maintenance status
     */
    async getAll(): Promise<Maintenance[]> {
        const response = await api.get<Maintenance[]>('/maintenance');
        return response.data;
    },

    /**
     * Get AI-powered maintenance status for a specific asset
     */
    async getAssetStatus(assetId: string): Promise<MaintenancePredictionResponse> {
        const response = await api.get<MaintenancePredictionResponse>(`/maintenance/${assetId}`);
        return response.data;
    },
};

export default maintenanceService;
