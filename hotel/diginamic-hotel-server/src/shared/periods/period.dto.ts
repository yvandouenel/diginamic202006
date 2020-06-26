import {PeriodData} from './period.entity';
import { IsNumber, IsISO8601, Allow } from 'class-validator';

export class PeriodDto {
    
    @IsNumber()
    categoryId: number;
    
    @IsISO8601({strict: true})
    startDate: string; // '2020-06-24'
    
    @IsISO8601({strict: true})
    endDate: string; // '2020-06-24'
    
    @Allow()
    data: PeriodData;
}