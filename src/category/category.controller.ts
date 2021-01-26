import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import {CategoryService} from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async getAll() {
        return await this.categoryService.getAll();
    }

    @Get(':id') 
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.categoryService.getOne(id);
    }
}
