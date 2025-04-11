import { ConfigService } from '@nestjs/config';
import { KafkaClientId } from '@shared/kafka/constants';
import { Kafka, Partitioners, Producer } from 'kafkajs';
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";


@Injectable()
export class ProductEventProducer implements OnModuleInit, OnModuleDestroy {
    private producer: Producer

    constructor(
        private readonly configService: ConfigService
    ) { }

    async onModuleInit(): Promise<void> {
        const kafka: Kafka = new Kafka({
            clientId: KafkaClientId.Product,
            brokers: [this.configService.get('KAFKA_URL')]
        })

        this.producer = kafka.producer({
            createPartitioner: Partitioners.LegacyPartitioner
        })

        await this.producer.connect()
    }

    onModuleDestroy(): void {
        this.producer.disconnect()
    }

    public produce<T>(topic: string, event: T): void {
        this.producer.send({ topic, messages: [{ value: JSON.stringify(event) }] })
    }
}