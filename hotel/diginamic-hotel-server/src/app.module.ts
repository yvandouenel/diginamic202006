import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './shared/categories/category.entity';
import { Period } from './shared/periods/period.entity';
import { AdminModule } from './admin/admin.module';
import { Reservation } from './shared/reservations/reservation.entity';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'hotel',
      password: '51biba95',
      database: 'hoteldb',
      schema: 'hotel', //Choose a specfic schema (default: user name, then public)
      entities: [Category, Period, Reservation],
      synchronize: true,
    }),
    AdminModule,
    BookingModule,
    AuthModule,
  ],
})
export class AppModule {}
