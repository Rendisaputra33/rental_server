import { Global, Module } from '@nestjs/common';
import { GatewayGateway } from './gateway';
import { SocketService } from './gateway.service';

@Global()
@Module({
  providers: [GatewayGateway, SocketService],
})
export class GatewayModule {}
