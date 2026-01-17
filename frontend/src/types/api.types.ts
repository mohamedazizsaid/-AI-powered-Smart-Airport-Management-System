// ========================
// API Response Types
// ========================

export interface ApiResponse<T> {
    data: T;
    error?: string;
}

// ========================
// Entity Types (Matching Backend Schemas)
// ========================

export interface Flight {
    _id: string;
    flightNumber: string;
    airline: string;
    origin: string;
    destination: string;
    scheduledDeparture: string;
    scheduledArrival: string;
    estimatedDeparture?: string;
    estimatedArrival?: string;
    status: 'Scheduled' | 'Delayed' | 'Departed' | 'Arrived' | 'Cancelled';
    gateAssignment?: string;
    terminal?: string;
    gateId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Baggage {
    _id: string;
    tagNumber: string;
    passengerId: string;
    flightId: string;
    status: 'CheckedIn' | 'InTransit' | 'Loaded' | 'Unloaded' | 'AtCarousel' | 'Claimed' | 'Lost';
    currentLocation?: string;
    estimatedDeliveryTime?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Staff {
    _id: string;
    name: string;
    employeeId: string;
    department: 'Security' | 'Check-in' | 'Maintenance' | 'Ground Crew';
    status: 'Available' | 'On Duty' | 'On Break' | 'Off Duty';
    currentZone?: string;
    aiEfficiencyMetrics?: {
        taskCompletionRate: number;
        stressLevel: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface Maintenance {
    _id: string;
    assetId: string;
    assetType: string;
    status: 'Healthy' | 'Warning' | 'Critical' | 'Under Maintenance';
    lastInspectionDate: string;
    nextScheduledMaintenance: string;
    wearLevel: number;
    aiDetectedRisks: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Gate {
    _id: string;
    gateNumber: string;
    terminal: string;
    status: 'Available' | 'Occupied' | 'Maintenance' | 'Closed';
    currentFlightId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Revenue {
    _id: string;
    category: string;
    transactionAmount: number;
    passengerId?: string;
    locationId: string;
    aiClusteringData?: {
        segment: string;
        propensityToSpend: number;
    };
    createdAt: string;
    updatedAt: string;
}

// ========================
// AI Service Response Types
// ========================

export interface FlightOptimizationSuggestion {
    flightId: string;
    flightNumber: string;
    recommendedGate: string;
    terminal: string;
    confidence: number;
    reasoning: string;
}

export interface FlightOptimizationResponse {
    suggestions: FlightOptimizationSuggestion[];
    optimizationTimestamp: string;
    algorithm: string;
}

export interface SecurityAnalysisAnomaly {
    type: string;
    location: string;
    confidence: number;
    frame_id: number;
}

export interface SecurityAnalysisResponse {
    status: string;
    risk_level: 'low' | 'elevated' | 'critical';
    anomalies: SecurityAnalysisAnomaly[];
    processed_fps: number;
    inference_engine: string;
}

export interface BaggagePredictionAnomaly {
    type: string;
    message: string;
    risk: string;
}

export interface BaggagePredictionResponse {
    tagNumber: string;
    estimatedDeliveryTimeMinutes: number;
    currentStatus: string;
    anomalies: BaggagePredictionAnomaly[];
    predictionConfidence: number;
    model_used: string;
}

export interface MaintenancePredictionResponse {
    assetId: string;
    wearLevel: number;
    riskScore: number;
    status: string;
    nextRecommendedMaintenance: string;
    analysis_engine: string;
}

export interface StaffAllocationResponse {
    allocation: {
        security: number;
        checkin: number;
        maintenance: number;
    };
    efficiencyScore: number;
    sentiment_context: string[];
    model: string;
}

export interface DynamicPricingResponse {
    parking: {
        economy: number;
        premium: number;
        demand_index: number;
    };
    retailInsights: string;
    recommendedPromos: string[];
    algorithm: string;
}

export interface EnvironmentStatsResponse {
    airQualityIndex: number;
    status: string;
    energySavingMode: boolean;
    predictedConsumption_kWh: number;
    carbonOffset_Tons: number;
    active_optimizations: string[];
    sensor_network: string;
}

export interface ChatbotResponse {
    response: string;
    sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
    userId: string;
    timestamp: string;
    model: string;
}

export interface AnalyticsForecastPoint {
    time: string;
    value: number;
    confidence_interval: [number, number];
}

export interface AnalyticsPredictionResponse {
    context: string;
    forecast: AnalyticsForecastPoint[];
    model: string;
}

// ========================
// Auth Types
// ========================

export interface User {
    _id: string;
    email: string;
    name: string;
    role: 'admin' | 'staff' | 'user';
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    user: User;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    role?: string;
}

// ========================
// WebSocket Event Types
// ========================

export interface SecurityAlertEvent {
    type: string;
    location: string;
    message: string;
    timestamp: string;
    risk_level: string;
    anomalies: SecurityAnalysisAnomaly[];
}

export interface FlightUpdateEvent {
    flightId: string;
    flightNumber: string;
    status: string;
    gate?: string;
    timestamp: string;
}
