import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Reservation } from 'src/shared/reservations/reservation.entity';
import { ReservationsService } from 'src/shared/reservations/reservations.service';
import { PassportBasicGuard } from 'src/auth/passport-basic.guard';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('admin/reservations')
@UseGuards(PassportBasicGuard)
@ApiSecurity('basic')
export class ReservationsController {

    constructor(private reservationsSrv: ReservationsService) {}

    @Get()          //   /admin/reservation?category=3&start=2020-06-24&end=2020-07-02
    @ApiQuery({name: 'category', required: false})
    @ApiQuery({name: 'start', required: false})
    @ApiQuery({name: 'end', required: false})
    searchAll(@Query('category') categoryId?: number,
              @Query('start') startDate?: string,
              @Query('end') endDate?: string): Promise<Reservation[]> {
        return this.reservationsSrv
            .searchAll({categoryId, startDate, endDate});
    }
}
