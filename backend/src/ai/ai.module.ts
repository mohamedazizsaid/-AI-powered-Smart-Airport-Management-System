import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AIService } from './ai.service';
import { AIController } from './ai.controller';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
    imports: [HttpModule, GatewayModule],
    controllers: [AIController],
    providers: [AIService],
    exports: [AIService],
})
export class AIModule { }
