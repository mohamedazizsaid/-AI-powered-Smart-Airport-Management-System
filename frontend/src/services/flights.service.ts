import { api } from './api';
import type { Flight, FlightOptimizationResponse } from '../types/api.types';

export const flightsService = {
    /**
     * Get all flights
     */
    async getAll(): Promise<Flight[]> {
        const response = await api.get<Flight[]>('/flights');
        return response.data;
    },

    /**
     * Get flight by ID
     */
    async getById(id: string): Promise<Flight> {
        const response = await api.get<Flight>(`/flights/${id}`);
        return response.data;
    },

    /**
     * Create a new flight (Admin only)
     */
    async create(flight: Omit<Flight, '_id' | 'createdAt' | 'updatedAt'>): Promise<Flight> {
        const response = await api.post<Flight>('/flights', flight);
        return response.data;
    },

    /**
     * Update flight details (Admin only)
     */
    async update(id: string, updates: Partial<Flight>): Promise<Flight> {
        const response = await api.patch<Flight>(`/flights/${id}`, updates);
        return response.data;
    },

    /**
     * Delete a flight (Admin only)
     */
    async delete(id: string): Promise<void> {
        await api.delete(`/flights/${id}`);
    },

    /**
     * Trigger AI flight optimization (Admin only)
     */
    async optimize(): Promise<FlightOptimizationResponse> {
        const response = await api.post<FlightOptimizationResponse>('/flights/optimize');
        return response.data;
    },
};

export default flightsService;
