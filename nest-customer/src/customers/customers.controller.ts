import { Controller, Get, Param, Post, Delete, Put } from '@nestjs/common';
import {CustomersService} from './customers.service';

@Controller('customers')
export class CustomersController {
  // injection de service 
  constructor(private customerDb: CustomersService) {
    
  }

  @Get()
  getList() {
    return this.customerDb.getList();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return 'Renvoie un client';
  }
  @Post()
  add() {
    return 'Ajouter un client';
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
