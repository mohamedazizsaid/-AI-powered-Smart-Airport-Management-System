import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Maintenance')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('maintenance')
export class MaintenanceController {
    constructor(private readonly maintenanceService: MaintenanceService) { }

    @Get()
    @ApiOperation({ summary: 'Get all airport assets maintenance status' })
    async findAll() {
        return this.maintenanceService.findAll();
    }

    @Get(':assetId')
    @ApiOperation({ summary: 'Get AI-powered maintenance status for a specific asset' })
    async getStatus(@Param('assetId') assetId: string) {
        return this.maintenanceService.getAssetStatus(assetId);
    }
}
