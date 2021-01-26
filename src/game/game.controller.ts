import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import {GameDto} from './dto/game.dto';
import {GameService} from './game.service';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Get()
    async getAll() {
        return await this.gameService.getAll()
    }
    
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.gameService.findBy(id)
    }

    @Get('category/:id')
    async test(@Param('id', ParseIntPipe) id: number) {
        return await this.gameService.getByCategory(id)
    }

    @Post('addgame')
    async create(@Body() dto: GameDto) {
        return await this.gameService.create(dto)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: GameDto) {
        return await this.gameService.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.gameService.delete(id)
    }
}
