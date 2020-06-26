import { Category } from "../categories/category.entity";

export class ListItem {
    category: Category;
    available: boolean;
    price: number;
}

export class AvailabilityResultDto {
    nights: number;
    list: ListItem[];
}