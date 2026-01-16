import { Controller, Post, Body, Get, UseGuards, Query } from '@nestjs/common';
import { AIService } from './ai.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('AI Services')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('ai')
export class AIController {
    constructor(private readonly aiService: AIService) { }

    @Roles('admin')
    @Post('optimize-flights')
    @ApiOperation({ summary: 'Optimize flight schedules using ML' })
    async optimizeFlights(@Body() data: any) {
        return this.aiService.predictFlightOptimization(data);
    }

    @Roles('admin', 'staff')
    @Post('security-analyze')
    @ApiOperation({ summary: 'Analyze security footage for anomalies' })
    async analyzeSecurity(@Body() data: any) {
        return this.aiService.analyzeSecurity(data);
    }

    @Post('chatbot')
    @ApiOperation({ summary: 'Interact with the AI Travel Assistant' })
    async chatbot(@Body() body: { query: string; userId: string }) {
        return this.aiService.chatbotResponse(body.query, body.userId);
    }

    @Roles('admin')
    @Post('staff-allocation')
    @ApiOperation({ summary: 'Get AI-powered staff allocation' })
    async getStaffAllocation(@Body() body: { predictedPassengers: number }) {
        return this.aiService.getStaffAllocation(body.predictedPassengers);
    }

    @Roles('admin')
    @Get('revenue-optimization')
    @ApiOperation({ summary: 'Get dynamic pricing and revenue insights' })
    async getRevenueStats() {
        return this.aiService.getRevenueStats();
    }

    @Roles('admin', 'staff')
    @Get('environment-intelligence')
    @ApiOperation({ summary: 'Get predictive environmental stats' })
    async getEnvironmentalStats() {
        return this.aiService.getEnvironmentalStats();
    }

    @Roles('admin', 'staff')
    @Post('maintenance-predict')
    @ApiOperation({ summary: 'Predict infrastructure maintenance needs' })
    async predictMaintenance(@Body() body: { assetId: string }) {
        return this.aiService.predictMaintenance(body.assetId);
    }
}
