import { Order } from './order.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'order_products' })
export class OrderProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'order_id' })
    orderId: string;

    @Column({ name: 'product_id' })
    productId: string;

    @ManyToOne(() => Order, (order) => order.products)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}