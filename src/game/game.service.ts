import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {GameDto} from './dto/game.dto';
import {GameEntity} from './game.entity';
import {GameRepository} from './game.repository';

@Injectable()
export class GameService {
    
    constructor ( @InjectRepository(GameEntity) private gameRepository: GameRepository) {}

    async getAll(): Promise<GameEntity[]> {
        const list = await this.gameRepository.find();
        if(!list.length)
        throw new NotFoundException({message: "Games Indisponible"})
        return list
    }

    async findBy(id: number): Promise<GameEntity> {
        const game = await this.gameRepository.findOne(id)
        if(!game) {
            throw new NotFoundException({message: "Game Invalid"})
        }
        return game
    }

    async getByCategory(id: number): Promise<any> {
        const games = await this.gameRepository.find({categoryId: id})
        return games
    }

    async create(dto: GameDto): Promise<GameEntity> {
        const game = this.gameRepository.create(dto)
        if(!game.title || !game.description || !game.image || !game.trailer || !game.rating || !game.categoryId) {
            throw new BadRequestException({message : "please Complete All fields"})
        }
        if(game.rating <= 0 || game.rating > 5) {
            throw new BadRequestException({message : "Rating entre 0 et 5"})
        }
        await this.gameRepository.save(game)
        return game
    }

    async update(id: number, dto: GameDto) {
        const game = await this.gameRepository.findOne(id)
        if(!game) {
            throw new NotFoundException({message: "Game Invalid"})
        }
        dto.title ? game.title = dto.title : game.title = game.title
        dto.description ? game.description = dto.description : game.description = game.description
        dto.image ? game.image = dto.image : game.image = game.image
        dto.trailer ? game.trailer = dto.trailer : game.trailer = game.trailer
        dto.rating ? game.rating = dto.rating : game.rating = game.rating
        dto.categoryId ? game.categoryId = dto.rating : game.categoryId = game.categoryId
        await this.gameRepository.save(game)
        return {message: `${game.title} : Game Updated`}
    }

    async delete(id: number) {
       const game =  await this.gameRepository.findOne(id)
       if(!game) {
            throw new NotFoundException({message: "Game Invalid"})
        }
        await this.gameRepository.delete(game)
        return {message: `${game.title} : Game Deleted`}
    }
}
