import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight, FlightDocument } from '../schemas/flight.schema';
import { AIService } from '../ai/ai.service';
import { GatesService } from '../gates/gates.service';

@Injectable()
export class FlightsService {
    private readonly logger = new Logger(FlightsService.name);

    constructor(
        @InjectModel(Flight.name) private flightModel: Model<FlightDocument>,
        private readonly aiService: AIService,
        private readonly gatesService: GatesService
    ) { }

    async create(createFlightDto: any): Promise<Flight> {
        const createdFlight = new this.flightModel(createFlightDto);
        return createdFlight.save();
    }

    async findAll(): Promise<Flight[]> {
        return this.flightModel.find().exec();
    }

    async findOne(id: string): Promise<Flight> {
        return this.flightModel.findById(id).exec();
    }

    async update(id: string, updateFlightDto: any): Promise<Flight> {
        return this.flightModel.findByIdAndUpdate(id, updateFlightDto, { new: true }).exec();
    }

    async remove(id: string): Promise<Flight> {
        return this.flightModel.findByIdAndDelete(id).exec();
    }

    async optimizeGateAssignment(flightId: string) {
        const flight = await this.findOne(flightId);
        if (!flight) throw new Error('Flight not found');

        this.logger.log(`Optimizing gate for flight ${flight.flightNumber}`);

        // Use AI to get optimal gate
        const optimization = await this.aiService.predictFlightOptimization({
            flights: [{
                id: (flight as any)._id,
                flightNumber: flight.flightNumber,
                airline: flight.airline,
                origin: flight.origin,
                destination: flight.destination,
                scheduledDeparture: flight.scheduledDeparture,
                scheduledArrival: flight.scheduledArrival
            }]
        });

        // The AI service returns a list of suggestions
        const suggestion = optimization.suggestions[0];

        // Update flight with AI recommended gate
        const updatedFlight = await this.update(flightId, {
            gateAssignment: suggestion?.recommendedGate || 'A1',
            terminal: suggestion?.terminal || 'T1'
        });

        return {
            flight: updatedFlight,
            aiReasoning: suggestion?.reasoning || 'Optimization based on turn-around time efficiency'
        };
    }
}
