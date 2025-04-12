import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "products" })
export class Product {
    @PrimaryGeneratedColumn()
    id: string

    @Column({ type: "int" })
    price: number

    @Column({ type: "varchar" })
    name: string

    @Column({ type: "text" })
    description: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}