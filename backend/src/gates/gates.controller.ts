import { Controller, Get, UseGuards } from '@nestjs/common';
import { GatesService } from './gates.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Gate Management')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('gates')
export class GatesController {
    constructor(private readonly gatesService: GatesService) { }

    @Get()
    @ApiOperation({ summary: 'Get status of all airport gates' })
    async findAll() {
        return this.gatesService.findAll();
    }
}
