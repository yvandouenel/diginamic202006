import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { PeriodsController } from './periods.controller';
import { CategoriesModule } from '../shared/categories/categories.module';
import { PeriodsModule } from '../shared/periods/periods.module';
import { ReservationsController } from './reservations.controller';
import { ReservationsModule } from 'src/shared/reservations/reservations.module';

@Module({
    imports: [
        CategoriesModule,
        PeriodsModule,
        ReservationsModule,
    ],
    controllers: [
        CategoriesController,
        PeriodsController,
        ReservationsController,
    ]
})
export class AdminModule {}
