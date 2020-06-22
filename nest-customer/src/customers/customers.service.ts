import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { CustomerDto } from './customer.dto';
// injection de dépendance : 
@Injectable()
export class CustomersService {
  constructor(@InjectRepository(Customer) private customerRepository: Repository<Customer> ) {

  }
  getList() {
    return this.customerRepository.find();
  }
  create(customerDto: CustomerDto): Promise<Customer> {
    return this.customerRepository.save(customerDto);
  }
}
