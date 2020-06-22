import { Controller } from '@nestjs/common';
import { CrudController, Crud } from '@nestjsx/crud';
import { Company } from './company.entity';
import { CompaniesService } from './companies.service';

@Crud({
    model: { type: Company },
})
@Controller('companies')
export class CompaniesController implements CrudController<Company> {
    
    constructor(public service: CompaniesService) {
    }

}
