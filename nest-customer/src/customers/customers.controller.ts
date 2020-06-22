import { Controller, Get, Param, Post, Delete, Put, Body } from '@nestjs/common';
import {CustomersService} from './customers.service';
import { Customer } from './customer.entity';
import { CustomerDto } from './customer.dto';

@Controller('customers')
export class CustomersController {
  // injection de service 
  constructor(private customerDb: CustomersService) {
    
  }

  @Get()
  getList(): Promise<Customer[]> { // renvoie une promesse de tableau de customer ou Promise<Array<Customer>>
    return this.customerDb.getList();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return 'Renvoie un client';
  }
  @Post()
  add(@Body() CustomerDto: CustomerDto): Promise<Customer> { //@Body : décorateur qui va parser le body de la requête et va renvoyer l'objet Customer Dto attendu
    return this.customerDb.create(CustomerDto);
  }
  @Put(':id')
  update(@Param('id') id: string) {
    return 'Modifier un client';
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return 'Supprimer un client par id';
  }
}

