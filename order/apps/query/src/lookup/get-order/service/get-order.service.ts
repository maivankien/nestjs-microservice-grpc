import { firstValueFrom } from 'rxjs';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PRODUCT_QUERY_SERVICE_NAME } from '@shared/constants/microservice.constant';
import { ProductData, ProductQueryServiceClient } from '@shared/proto/product-query.pb';

@Injectable()
export class GetOrderProductServiceClient implements OnModuleInit {
    private productQueryService: ProductQueryServiceClient

    constructor(
        @Inject(PRODUCT_QUERY_SERVICE_NAME)
        private readonly productClient: ClientGrpc,
    ) { }

    onModuleInit() {
        this.productQueryService = this.productClient.getService<ProductQueryServiceClient>(PRODUCT_QUERY_SERVICE_NAME)
    }

    async getProductByIds(ids: string[]): Promise<ProductData[]> {
        const promises = ids.map(id => {
            return firstValueFrom(this.productQueryService.getProduct({ id }))
        })

        const results = await Promise.all(promises)

        return results.map(res => res.data).filter(res => res !== undefined)
    }
}