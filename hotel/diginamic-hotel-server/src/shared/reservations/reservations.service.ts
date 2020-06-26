import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { PeriodsService } from '../periods/periods.service';
import { Category } from '../categories/category.entity';
import { Period } from '../periods/period.entity';
import { DateUtil } from 'src/util/date.util';
import { AvailabilityResultDto } from './availability-result.dto';
import { ReservationDto } from './reservation.dto';
import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class ReservationsService {

    constructor(@InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
                private categoriesSrv: CategoriesService,
                private periodsSrv: PeriodsService) {
    }

    searchAll(options?: {startDate?: string, endDate?: string, categoryId?: number}): Promise<Reservation[]> {
        let query = this.reservationRepository.createQueryBuilder('reservation');
        if (options?.startDate) {
            query = query.andWhere('reservation.endDate >= :startDate', {startDate: options.startDate});
        }
        if (options?.endDate) {
            query = query.andWhere('reservation.startDate <= :endDate', {endDate: options.endDate});
        }
        if (options?.categoryId) {
            query = query.andWhere('reservation.categoryId = :catId', {catId: options.categoryId});
        }
        return query.getMany();
    }

    async searchAvailable(stay: Stay, persons: number): Promise<AvailabilityResultDto> {
        // Catégories de chambres
        const categories: Category[] = (await this.categoriesSrv.readAll())
            .filter(category => category.persons >= persons);
        // Périodes de prix qui chevauchent les dates du séjour
        const periods: Period[] = await this.periodsSrv.searchAll(stay);
        // Réservations qui chevauchent les dates du séjour
        const reservations: Reservation[] = await this.searchAll(stay);

        const list = categories.map(category => {
            const max = (category.data?.rooms || []).length;
            const categoryReservations: Reservation[] = 
                reservations.filter(resa => resa.categoryId === category.id);
            const categoryPeriods: Period[] = 
                periods.filter(period => period.categoryId === category.id);
            const available = this.checkAvailabilityEachDay(stay, categoryReservations, max);
            const price = this.computePrice(stay, categoryPeriods);
            return {category, available, price};
        });
        return {nights: DateUtil.computeNights(stay), list};
    }

    async tryBooking(stay: Stay, persons: number, 
                     categoryId: number, reservationDto: ReservationDto): Promise<Reservation> {
        // Catégorie demandée
        const category: Category = await this.categoriesSrv.readOne(categoryId);
        if (category.persons < persons) {
            throw new HttpException('Room too small.', 
                                    HttpStatus.PRECONDITION_FAILED);
        }
        // Périodes de prix (de la catégorie demandée) qui chevauchent les dates du séjour
        const categoryPeriods: Period[] = await this.periodsSrv.searchAll({...stay, categoryId});
        // Réservations (de la catégorie demandée) qui chevauchent les dates du séjour
        const categoryReservations: Reservation[] = await this.searchAll({...stay, categoryId});

        const max = (category.data?.rooms || []).length;
        const available = this.checkAvailabilityEachDay(stay, categoryReservations, max);
        const price = this.computePrice(stay, categoryPeriods);
        
        if (available) {
            const uuid = uuidv1();
            const reservationData = {
                nights: DateUtil.computeNights(stay),
                price,
                persons,
                customer: reservationDto.customer 
            };
            return await this.reservationRepository.save({
                categoryId, 
                ...stay, 
                code: uuid,
                data: reservationData
            });
        } else {
            throw new HttpException('No room left in this category.', 
                                    HttpStatus.PRECONDITION_FAILED);
        }
    }

    async delete(code: string): Promise<Reservation> {
        const resa = await this.reservationRepository
          .createQueryBuilder('reservation')
          .where('reservation.code = :code', {code})
          .getOne();
        if (resa) {
          return this.reservationRepository.remove(resa);
        } else {
          throw new HttpException('Reservation not found, code may be wrong.', HttpStatus.NOT_FOUND)
        }
      }

    private computePrice(stay: Stay, periods: Period[]) {
        let price = 0;
        for (let day = stay.startDate; day <= stay.endDate; day = DateUtil.nextDay(day)) {
            const period = DateUtil.findForDay(day, periods);
            if (!period) {
                return null;
            }
            price += period.data.prices[DateUtil.weekDay(day)];
        }
        return price;
    }

    private checkAvailabilityEachDay(stay: Stay, reservations: Reservation[], max: number) {
        let maxResa = 0;
        for (let day = stay.startDate; day <= stay.endDate; day = DateUtil.nextDay(day)) {
            const count = DateUtil.filterForDay(day, reservations).length;
            maxResa = Math.max(maxResa, count);
        }
        const available = maxResa < max;
        return available;
    }
}

export interface Stay {
    startDate: string;
    endDate: string;
}
