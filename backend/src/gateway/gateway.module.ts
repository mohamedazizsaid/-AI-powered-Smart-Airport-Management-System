import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { AppGateway } from './app.gateway';

@Module({
  providers: [GatewayService, AppGateway],
  controllers: [GatewayController],
  exports: [AppGateway],
})
export class GatewayModule { }
