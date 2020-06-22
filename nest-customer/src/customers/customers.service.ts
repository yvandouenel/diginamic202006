import { Injectable, HttpException, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
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
  async getOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne(id);
    if(!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return customer;
  }
  create(customerDto: CustomerDto): Promise<Customer> {
    return this.customerRepository.save(customerDto);
  }
  async update(@Param('id', ParseIntPipe) id: number,
    customerDto: CustomerDto): Promise<void> {
      const result = await this.customerRepository.update(id, customerDto);
      if(result.affected === 0) {
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      }
  }
  async delete(id: number): Promise<void> {
    const result = await this.customerRepository.delete(id);
    if(result.affected === 0) {
      throw new HttpException("Customer not found", HttpStatus.NOT_FOUND)
    }
    
  }
}
