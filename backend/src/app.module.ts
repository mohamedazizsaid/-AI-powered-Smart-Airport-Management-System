import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FlightsModule } from './flights/flights.module';
import { GatewayModule } from './gateway/gateway.module';
import { AIModule } from './ai/ai.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { NotificationsModule } from './notifications/notifications.module';
import { BaggageModule } from './baggage/baggage.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { StaffModule } from './staff/staff.module';
import { RevenueModule } from './revenue/revenue.module';
import { GatesModule } from './gates/gates.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI') || 'mongodb://localhost:27017/airport_db',
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    FlightsModule,
    GatewayModule,
    AIModule,
    AnalyticsModule,
    NotificationsModule,
    BaggageModule,
    MaintenanceModule,
    StaffModule,
    RevenueModule,
    GatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
