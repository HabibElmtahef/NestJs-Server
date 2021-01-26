import {Category} from "src/category/category.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "games"})
export class GameEntity {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 30, nullable: false, unique: true})
    title: string

    @Column({nullable: false})
    description: string

    @Column({nullable: false})
    image: string

    @Column()
    trailer: string

    @Column({nullable: false})
    rating: number

    @ManyToOne(() => Category, Category => Category.id)
    category: Category

    @Column()
    categoryId: number
}