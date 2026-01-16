import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatesService } from './gates.service';
import { GatesController } from './gates.controller';
import { Gate, GateSchema } from '../schemas/gate.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Gate.name, schema: GateSchema }])],
    controllers: [GatesController],
    providers: [GatesService],
    exports: [GatesService],
})
export class GatesModule { }
