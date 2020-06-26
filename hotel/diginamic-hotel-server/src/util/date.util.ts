export class DateUtil {

  static weekDay(day: string): number {
    const date = new Date(day);
    return date.getDay();
  }

  static computeNights(stay: WithStartEndDate): number {
    let nights = 0;
    for (let day = stay.startDate ; day <= stay.endDate ; day = DateUtil.nextDay(day)) {
      nights++;
    }
    return nights;
  }

  static addDays(day: string, add: number): string {
    const date = new Date(day);
    date.setDate(date.getDate() + add);
    const [next] = date.toISOString().split('T');
    return next;
  }

  static nextDay(day: string): string {
    return DateUtil.addDays(day, 1);
  }

  static filterForDay<T extends WithStartEndDate>(day: string, items: T[]): T[] {
    return items
      .filter(item => item.startDate <= day && item.endDate >= day);
  }

  static findForDay<T extends WithStartEndDate>(day: string, items: T[]): T {
    return DateUtil.filterForDay(day, items)[0];
  }

}

export interface WithStartEndDate {
  startDate: string; // ex: 2020-06-01
  endDate: string;
}
