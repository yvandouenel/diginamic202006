import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Company } from './company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService extends TypeOrmCrudService<Company> {

    constructor(@InjectRepository(Company) companyRepository: Repository<Company>) {
        super(companyRepository);
    }
    
}
