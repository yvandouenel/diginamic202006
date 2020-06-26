import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { ReservationsModule } from 'src/shared/reservations/reservations.module';

@Module({
  imports: [ReservationsModule],
  controllers: [BookingController]
})
export class BookingModule {}
