import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RevenueService } from './revenue.service';
import { RevenueController } from './revenue.controller';
import { Revenue, RevenueSchema } from '../schemas/revenue.schema';
import { AIModule } from '../ai/ai.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Revenue.name, schema: RevenueSchema }]),
        AIModule,
    ],
    controllers: [RevenueController],
    providers: [RevenueService],
    exports: [RevenueService],
})
export class RevenueModule { }
