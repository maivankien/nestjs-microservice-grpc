import { OrderProduct } from "./order-product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "orders" })
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "buy_date" })
    buyDate: Date;

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
        cascade: true,
        eager: true,
    })
    products: OrderProduct[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}