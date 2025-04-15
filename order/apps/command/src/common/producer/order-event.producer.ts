import { ConfigService } from '@nestjs/config';
import { Kafka, Partitioners, Producer } from 'kafkajs';
import { KafkaClientId } from '@shared/constants/kafka.constant';
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";


@Injectable()
export class OrderEventProducer implements OnModuleInit, OnModuleDestroy {
    private producer: Producer

    constructor(
        private readonly configService: ConfigService
    ) { }

    async onModuleInit(): Promise<void> {
        const kafka: Kafka = new Kafka({
            clientId: KafkaClientId.Order,
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