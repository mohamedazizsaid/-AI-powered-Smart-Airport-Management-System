import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { AIService } from '../ai/ai.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Flights')
@Controller('flights')
export class FlightsController {
    constructor(
        private readonly flightsService: FlightsService,
        private readonly aiService: AIService,
    ) { }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('Admin')
    @Post()
    @ApiOperation({ summary: 'Create a new flight (Admin only)' })
    create(@Body() createFlightDto: any) {
        return this.flightsService.create(createFlightDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all flights' })
    findAll() {
        return this.flightsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get flight details' })
    findOne(@Param('id') id: string) {
        return this.flightsService.findOne(id);
    }

    @Post('optimize')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('Admin')
    @ApiOperation({ summary: 'Trigger AI flight schedule optimization (Admin only)' })
    async optimize() {
        const flights = await this.flightsService.findAll();
        return this.aiService.predictFlightOptimization({ flights });
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('Admin')
    @Patch(':id')
    @ApiOperation({ summary: 'Update flight details (Admin only)' })
    update(@Param('id') id: string, @Body() updateFlightDto: any) {
        return this.flightsService.update(id, updateFlightDto);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('Admin')
    @Delete(':id')
    @ApiOperation({ summary: 'Remove a flight (Admin only)' })
    remove(@Param('id') id: string) {
        return this.flightsService.remove(id);
    }
}
