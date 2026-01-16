import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { BaggageService } from './baggage.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Baggage')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('baggage')
export class BaggageController {
    constructor(private readonly baggageService: BaggageService) { }

    @Post('track')
    @ApiOperation({ summary: 'Track baggage and get AI-based delivery prediction' })
    async track(@Body() body: { tagNumber: string }, @Req() req: any) {
        return this.baggageService.trackBaggage(body.tagNumber, req.user.userId);
    }
}
