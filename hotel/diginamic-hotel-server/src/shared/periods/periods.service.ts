import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult, InsertResult } from 'typeorm';
import { Period } from './period.entity';
import { PeriodDto } from './period.dto';

@Injectable()
export class PeriodsService {

    constructor(@InjectRepository(Period) 
                private periodRepository: Repository<Period>) {
    }

    async searchAll(options?: {startDate?: string, endDate?: string, categoryId?: number, ignorePeriodId?: number}): Promise<Period[]> {
        let query = this.periodRepository.createQueryBuilder('period');
        if (options?.startDate) {
            query = query.andWhere('period.endDate >= :startDate', {startDate: options.startDate});
        }
        if (options?.endDate) {
            query = query.andWhere('period.startDate <= :endDate', {endDate: options.endDate});
        }
        if (options?.categoryId) {
            query = query.andWhere('period.categoryId = :catId', {catId: options.categoryId});
        }
        const allPeriods: Period[] = await query.getMany();
        // return allPeriods.filter(period => !options?.ignorePeriodId || period.id !== options.ignorePeriodId);
        const mustIgnoreId = options?.ignorePeriodId;
        return mustIgnoreId 
            ? allPeriods.filter(period => period.id !== options.ignorePeriodId)
            : allPeriods;
    }
    
    async readOne(id: number): Promise<Period> {
        const period: Period = await this.periodRepository.findOne(id);
        if (!period) {
            throw new HttpException('Period not found', HttpStatus.NOT_FOUND);
        }
        return period;
    }

    async create(periodDto: PeriodDto): Promise<Period> {
        const existingPeriods: Period[] = await this.searchAll({
            startDate: periodDto.startDate, 
            endDate: periodDto.endDate,
            categoryId: periodDto.categoryId
        });
        if (existingPeriods.length > 0) {
            throw new HttpException('Periods must not overlap.', HttpStatus.CONFLICT);
        }
        const insertResult: InsertResult = await this.periodRepository.insert(periodDto);
        const insertedId = insertResult.identifiers[0].id;
        return this.periodRepository.findOne(insertedId);
    }

    async update(id: number, periodDto: PeriodDto): Promise<void> {
        const existingPeriods: Period[] = await this.searchAll({
            startDate: periodDto.startDate, 
            endDate: periodDto.endDate,
            categoryId: periodDto.categoryId,
            ignorePeriodId: id,
        });
        if (existingPeriods.length > 0) {
            throw new HttpException('Periods must not overlap.', HttpStatus.CONFLICT);
        }
        const updateResult: UpdateResult = await this.periodRepository.update(id, periodDto);
        if (updateResult.affected === 0) {
            throw new HttpException('Period not found', HttpStatus.NOT_FOUND);
        }
    }

    async delete(id: number): Promise<void> {
        const deleteResult: DeleteResult
            = await this.periodRepository.delete(id);
        if (deleteResult.affected === 0) {
            throw new HttpException('Period not found', HttpStatus.NOT_FOUND);
        }
    }

}
