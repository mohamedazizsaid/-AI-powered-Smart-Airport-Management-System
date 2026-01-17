import { create } from 'zustand';
import type {
    Flight,
    Maintenance,
    Staff,
    DynamicPricingResponse,
    EnvironmentStatsResponse,
    StaffAllocationResponse,
    SecurityAlertEvent,
    FlightUpdateEvent,
} from '../types/api.types';
import flightsService from '../services/flights.service';
import maintenanceService from '../services/maintenance.service';
import staffService from '../services/staff.service';
import revenueService from '../services/revenue.service';
import aiService from '../services/ai.service';
import { getErrorMessage } from '../services/api';

// ========================
// Store Types
// ========================

interface LoadingState {
    isLoading: boolean;
    error: string | null;
}

interface ApiStore {
    // Flights
    flights: Flight[];
    flightsState: LoadingState;
    fetchFlights: () => Promise<void>;

    // Maintenance
    maintenanceAssets: Maintenance[];
    maintenanceState: LoadingState;
    fetchMaintenanceAssets: () => Promise<void>;

    // Staff
    staff: Staff[];
    staffAllocation: StaffAllocationResponse | null;
    staffState: LoadingState;
    fetchStaff: () => Promise<void>;
    fetchStaffAllocation: (passengers: number) => Promise<void>;

    // Revenue
    dynamicPricing: DynamicPricingResponse | null;
    revenueState: LoadingState;
    fetchDynamicPricing: () => Promise<void>;

    // Environment
    environmentStats: EnvironmentStatsResponse | null;
    environmentState: LoadingState;
    fetchEnvironmentStats: () => Promise<void>;

    // Real-time events
    securityAlerts: SecurityAlertEvent[];
    flightUpdates: FlightUpdateEvent[];
    addSecurityAlert: (alert: SecurityAlertEvent) => void;
    addFlightUpdate: (update: FlightUpdateEvent) => void;
    clearAlerts: () => void;
}

// ========================
// Store Implementation
// ========================

export const useApiStore = create<ApiStore>((set) => ({
    // ---- Flights ----
    flights: [],
    flightsState: { isLoading: false, error: null },

    fetchFlights: async () => {
        set({ flightsState: { isLoading: true, error: null } });
        try {
            const flights = await flightsService.getAll();
            set({ flights, flightsState: { isLoading: false, error: null } });
        } catch (error) {
            set({ flightsState: { isLoading: false, error: getErrorMessage(error) } });
        }
    },

    // ---- Maintenance ----
    maintenanceAssets: [],
    maintenanceState: { isLoading: false, error: null },

    fetchMaintenanceAssets: async () => {
        set({ maintenanceState: { isLoading: true, error: null } });
        try {
            const assets = await maintenanceService.getAll();
            set({ maintenanceAssets: assets, maintenanceState: { isLoading: false, error: null } });
        } catch (error) {
            set({ maintenanceState: { isLoading: false, error: getErrorMessage(error) } });
        }
    },

    // ---- Staff ----
    staff: [],
    staffAllocation: null,
    staffState: { isLoading: false, error: null },

    fetchStaff: async () => {
        set({ staffState: { isLoading: true, error: null } });
        try {
            const staff = await staffService.getAll();
            set({ staff, staffState: { isLoading: false, error: null } });
        } catch (error) {
            set({ staffState: { isLoading: false, error: getErrorMessage(error) } });
        }
    },

    fetchStaffAllocation: async (passengers: number) => {
        set({ staffState: { isLoading: true, error: null } });
        try {
            const allocation = await aiService.getStaffAllocation(passengers);
            set({ staffAllocation: allocation, staffState: { isLoading: false, error: null } });
        } catch (error) {
            set({ staffState: { isLoading: false, error: getErrorMessage(error) } });
        }
    },

    // ---- Revenue ----
    dynamicPricing: null,
    revenueState: { isLoading: false, error: null },

    fetchDynamicPricing: async () => {
        set({ revenueState: { isLoading: true, error: null } });
        try {
            const pricing = await revenueService.getDynamicPricing();
            set({ dynamicPricing: pricing, revenueState: { isLoading: false, error: null } });
        } catch (error) {
            set({ revenueState: { isLoading: false, error: getErrorMessage(error) } });
        }
    },

    // ---- Environment ----
    environmentStats: null,
    environmentState: { isLoading: false, error: null },

    fetchEnvironmentStats: async () => {
        set({ environmentState: { isLoading: true, error: null } });
        try {
            const stats = await aiService.getEnvironmentStats();
            set({ environmentStats: stats, environmentState: { isLoading: false, error: null } });
        } catch (error) {
            set({ environmentState: { isLoading: false, error: getErrorMessage(error) } });
        }
    },

    // ---- Real-time Events ----
    securityAlerts: [],
    flightUpdates: [],

    addSecurityAlert: (alert: SecurityAlertEvent) => {
        set((state) => ({
            securityAlerts: [alert, ...state.securityAlerts].slice(0, 50), // Keep last 50
        }));
    },

    addFlightUpdate: (update: FlightUpdateEvent) => {
        set((state) => ({
            flightUpdates: [update, ...state.flightUpdates].slice(0, 50),
        }));
    },

    clearAlerts: () => {
        set({ securityAlerts: [], flightUpdates: [] });
    },
}));

export default useApiStore;
