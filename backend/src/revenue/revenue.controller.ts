import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Revenue Optimization')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('revenue')
export class RevenueController {
    constructor(private readonly revenueService: RevenueService) { }

    @Get('dynamic-pricing')
    @ApiOperation({ summary: 'Get AI recommended dynamic pricing' })
    async getPricing() {
        return this.revenueService.getDynamicPricing();
    }

    @Post('transaction')
    @ApiOperation({ summary: 'Record a new revenue transaction' })
    async record(@Body() body: any) {
        return this.revenueService.recordTransaction(body);
    }
}
