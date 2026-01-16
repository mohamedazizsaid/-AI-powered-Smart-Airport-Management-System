import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { StaffService } from './staff.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Staff Management')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('staff')
export class StaffController {
    constructor(private readonly staffService: StaffService) { }

    @Get()
    @ApiOperation({ summary: 'Get all staff members' })
    async findAll() {
        return this.staffService.findAll();
    }

    @Post('allocate')
    @ApiOperation({ summary: 'AI-powered staff allocation optimization' })
    async allocate(@Body() body: { predictedPassengers: number }) {
        return this.staffService.optimizeAllocation(body.predictedPassengers);
    }
}
