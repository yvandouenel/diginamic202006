import { Controller, Get, Param, Post, Delete, Put, Body, ParseIntPipe, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import {CustomersService} from './customers.service';
import { Customer } from './customer.entity';
import { CustomerDto } from './customer.dto';

@Controller('customers')
@UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted:true}))
export class CustomersController {
  
  // injection de service 
  constructor(private customerDb: CustomersService) {
    
  }

  @Get()
  getList(): Promise<Customer[]> { // renvoie une promesse de tableau de customer ou Promise<Array<Customer>>
    return this.customerDb.getList();
  }

  @Get(':id')
  // ligne suivante, le ParseIntPipe va vérifier que la variable peut bien être transformé 
  // en int
  getOne(@Param('id',ParseIntPipe) id: number) {
    return this.customerDb.getOne(+id);
  }
  @Post()
  add(@Body() CustomerDto: CustomerDto): Promise<Customer> { //@Body : décorateur qui va parser le body de la requête et va renvoyer l'objet Customer Dto attendu
    return this.customerDb.create(CustomerDto);
  }
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id', ParseIntPipe) id: number,
    @Body() customerDto: CustomerDto) {
    return  this.customerDb.update(id, customerDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id',ParseIntPipe) id: number): Promise<void> {
    return this.customerDb.delete(id);
  }
}

