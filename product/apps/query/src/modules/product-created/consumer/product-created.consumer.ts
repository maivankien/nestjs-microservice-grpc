import { EventBus } from "@nestjs/cqrs";
import { KafkaMessagePattern } from "@shared/kafka/constants";
import { ProductCreatedPayload } from "../dtos/product-created.dto";
import { ProductCreatedEvent } from "@shared/events/product-created.event";
import { ClientKafka, MessagePattern, Payload } from "@nestjs/microservices";
import { KAFKA_SERVICE } from "@query/common/constants/common.constant";
import { Controller, Inject, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";


@Controller()
export class ProductCreatedConsumer implements OnApplicationBootstrap, OnApplicationShutdown {
    constructor(
        private readonly eventBus: EventBus,

        @Inject(KAFKA_SERVICE)
        private readonly kafkaClient: ClientKafka,
    ) { }

    public onApplicationBootstrap() {
        this.kafkaClient.subscribeToResponseOf(KafkaMessagePattern.ProductCreatedEvent)
    }

    public onApplicationShutdown() {
        this.kafkaClient.close()
    }

    @MessagePattern(KafkaMessagePattern.ProductCreatedEvent)
    private async handleMessage(@Payload() message: ProductCreatedPayload): Promise<void> {
        const event = new ProductCreatedEvent(message)

        this.eventBus.publish(event)
    }
}