import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { CategoriesModule } from '../categories/categories.module';
import { PeriodsModule } from '../periods/periods.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    CategoriesModule,
    PeriodsModule,
  ],
  providers: [ReservationsService],
  exports: [ReservationsService] 
})
export class ReservationsModule {}
