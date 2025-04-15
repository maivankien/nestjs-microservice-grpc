import { EventBus } from "@nestjs/cqrs";
import { ClientKafka, MessagePattern } from "@nestjs/microservices";
import { OrderCreatedEvent } from "@shared/events/created.event";
import { KAFKA_SERVICE, KafkaMessagePattern } from "@shared/constants/kafka.constant";
import { CreatedOrderPayload } from "@command/common/aggregate/order.aggregate";
import { Controller, Inject, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";


@Controller()
export class OrderCreatedConsumer implements OnApplicationBootstrap, OnApplicationShutdown {
    constructor(
        private readonly eventBus: EventBus,

        @Inject(KAFKA_SERVICE)
        private readonly kafkaClient: ClientKafka,
    ) { }


    onApplicationBootstrap() {
        this.kafkaClient.subscribeToResponseOf(KafkaMessagePattern.OrderCreatedEvent)
    }

    onApplicationShutdown() {
        this.kafkaClient.close()
    }

    @MessagePattern(KafkaMessagePattern.OrderCreatedEvent)
    async handleOrderCreatedEvent(message: CreatedOrderPayload) {
        const event = new OrderCreatedEvent(message)

        this.eventBus.publish(event)
    }
}