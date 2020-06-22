import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers/customer.entity';
import { CompaniesModule } from './companies/companies.module';
import { Company } from './companies/company.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nest',
      password: '51biba95',
      database: 'nestdb',
      entities: [Customer, Company],
      synchronize: true,
    }),
    CustomersModule,
    CompaniesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}