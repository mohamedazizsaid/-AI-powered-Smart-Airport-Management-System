import { api } from './api';
import type { Staff, StaffAllocationResponse } from '../types/api.types';

export const staffService = {
    /**
     * Get all staff members
     */
    async getAll(): Promise<Staff[]> {
        const response = await api.get<Staff[]>('/staff');
        return response.data;
    },

    /**
     * Get AI-powered staff allocation optimization
     */
    async allocate(predictedPassengers: number): Promise<StaffAllocationResponse> {
        const response = await api.post<StaffAllocationResponse>('/staff/allocate', {
            predictedPassengers,
        });
        return response.data;
    },
};

export default staffService;
