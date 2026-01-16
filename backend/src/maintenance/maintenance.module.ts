import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaintenanceService } from './maintenance.service';
import { MaintenanceController } from './maintenance.controller';
import { Maintenance, MaintenanceSchema } from '../schemas/maintenance.schema';
import { AIModule } from '../ai/ai.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Maintenance.name, schema: MaintenanceSchema }]),
        AIModule,
    ],
    controllers: [MaintenanceController],
    providers: [MaintenanceService],
    exports: [MaintenanceService],
})
export class MaintenanceModule { }
