import { Module } from '@nestjs/common';
import { BaggageService } from './baggage.service';
import { BaggageController } from './baggage.controller';
import { AIModule } from '../ai/ai.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    imports: [AIModule, NotificationsModule],
    controllers: [BaggageController],
    providers: [BaggageService],
    exports: [BaggageService],
})
export class BaggageModule { }
