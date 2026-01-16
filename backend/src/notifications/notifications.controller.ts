import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @Roles('admin')
    @Post('broadcast')
    @ApiOperation({ summary: 'Broadcast a system-wide alert (Admin only)' })
    async broadcast(@Body() body: { type: string; message: string; data?: any }) {
        return this.notificationsService.broadcastAlert(body.type, body.message, body.data);
    }

    @Roles('admin', 'staff')
    @Post('notify-user')
    @ApiOperation({ summary: 'Send a targeted notification to a user' })
    async notify(
        @Body() body: { userId: string; type: string; message: string; data?: any },
    ) {
        return this.notificationsService.sendNotification(
            body.userId,
            body.type,
            body.message,
            body.data,
        );
    }
}
