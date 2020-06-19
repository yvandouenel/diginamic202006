import { Injectable } from '@nestjs/common';
// injection de dépendance : 
@Injectable()
export class CustomersService {

  getList() {
    return "on est dans le service";
  }
}
