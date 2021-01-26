import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Category} from './category.entity';
import {CategoryRepository} from './category.repository'

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private categoryRepository: CategoryRepository) {}

    async getAll(): Promise<Category[]> {
        const list = this.categoryRepository.find();
        return list;
    }

    async getOne(id: number): Promise<Category> {
        const res = this.categoryRepository.findOne(id)
        if(!res) throw new NotFoundException({msg: "Category Invalid"})
        else return res;
    }
}
