import { EventBus } from "@nestjs/cqrs";
import { KafkaMessagePattern } from "@shared/kafka/constants";
import { ClientKafka, MessagePattern, Payload } from "@nestjs/microservices";
import { KAFKA_SERVICE } from "@query/common/constants/common.constant";
import { ProductUpdatedPayload } from '../dtos/product-updated.dto';
import { Controller, Inject, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { ProductUpdatedEvent } from "@shared/events/product-updated.event";


@Controller()
export class ProductUpdatedConsumer implements OnApplicationBootstrap, OnApplicationShutdown {
    constructor(
        private readonly eventBus: EventBus,

        @Inject(KAFKA_SERVICE)
        private readonly kafkaClient: ClientKafka,
    ) { }

    public onApplicationBootstrap() {
        this.kafkaClient.subscribeToResponseOf(KafkaMessagePattern.ProductUpdatedEvent)
    }

    public onApplicationShutdown() {
        this.kafkaClient.close()
    }

    @MessagePattern(KafkaMessagePattern.ProductUpdatedEvent)
    private async handleMessage(@Payload() message: ProductUpdatedPayload): Promise<void> {
        const event = new ProductUpdatedEvent(message)

        this.eventBus.publish(event)
    }
}