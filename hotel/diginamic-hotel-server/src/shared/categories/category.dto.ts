
import { IsString, MaxLength, IsInt, IsOptional } from 'class-validator';
import { CategoryData } from './category.entity';

export class CategoryDto {
    
    @IsString()
    @MaxLength(50)
    name: string;

    @IsString()
    @MaxLength(500)
    @IsOptional()
    description?: string;

    @IsInt()
    persons: number;

    @IsOptional()
    data?: CategoryData;

    get rooms(): string[] {
        return this.data?.rooms || [];
    }

}