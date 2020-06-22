import {IsEmail, IsString, IsOptional, MaxLength} from 'class-validator';

export class CustomerDto{
    @IsString()
    firstname: string;
    
    @IsString()
    lastname: string;
    
    @IsEmail()
    @IsOptional()
    @MaxLength(5)
    email?: string;
} 