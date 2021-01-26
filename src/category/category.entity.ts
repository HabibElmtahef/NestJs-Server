import {GameEntity} from "src/game/game.entity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";


@Entity({name: "category"})
export class Category {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Category, GameEntity => GameEntity.id)
    games: GameEntity[]

}