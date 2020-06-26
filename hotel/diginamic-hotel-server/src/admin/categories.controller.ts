import { Controller, Get, Post, Param, ParseIntPipe, Body, UsePipes, ValidationPipe, Put, Delete, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { Category } from '../shared/categories/category.entity';
import { CategoriesService } from '../shared/categories/categories.service';
import { CategoryDto } from '../shared/categories/category.dto';
import { PassportBasicGuard } from 'src/auth/passport-basic.guard';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('admin/categories')
@UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true, transform: true}))
@UseGuards(PassportBasicGuard)
@ApiSecurity('basic')
export class CategoriesController {

    constructor(private categoriesSrv: CategoriesService) {
    }

    @Get()
    readAll(): Promise<Category[]> {
        return this.categoriesSrv.readAll();
    }

    @Get(':id')
    readOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
        return this.categoriesSrv.readOne(id);
    }

    @Post()
    create(@Body() categoryDto: CategoryDto): Promise<Category> {
        return this.categoriesSrv.create(categoryDto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    update(@Param('id', ParseIntPipe) id: number,
           @Body() categoryDto: CategoryDto): Promise<void> {
         return this.categoriesSrv.update(id, categoryDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.categoriesSrv.delete(id);
    }
}

