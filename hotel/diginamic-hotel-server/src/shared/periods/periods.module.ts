import { Module } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Period } from './period.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Period])
  ],
  providers: [PeriodsService],
  exports: [PeriodsService],
})
export class PeriodsModule {}
