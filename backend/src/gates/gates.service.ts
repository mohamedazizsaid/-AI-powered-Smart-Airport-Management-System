import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gate, GateDocument } from '../schemas/gate.schema';

@Injectable()
export class GatesService {
    private readonly logger = new Logger(GatesService.name);

    constructor(@InjectModel(Gate.name) private gateModel: Model<GateDocument>) { }

    async findAll() {
        return this.gateModel.find().exec();
    }

    async updateStatus(gateNumber: string, status: string, flightId?: string) {
        return this.gateModel.findOneAndUpdate(
            { gateNumber },
            { status, currentFlightId: flightId },
            { new: true }
        ).exec();
    }
}
