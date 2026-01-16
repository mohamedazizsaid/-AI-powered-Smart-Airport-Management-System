import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { AIModule } from '../ai/ai.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight, FlightSchema } from '../schemas/flight.schema';
import { Revenue, RevenueSchema } from '../schemas/revenue.schema';

@Module({
    imports: [
        AIModule,
        MongooseModule.forFeature([
            { name: Flight.name, schema: FlightSchema },
            { name: Revenue.name, schema: RevenueSchema },
        ]),
    ],
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
})
export class AnalyticsModule { }
