import { ProductStatusEnum } from "@shared/enums/product.enum"
import { Observable } from "rxjs"

export interface GetProductRequest {
    id: string
}

export interface GetProductResponse {
    status: number
    error: string[]
    data: ProductData
}


export interface ProductData {
    id: string
    name: string
    price: number
    description: string
    status: ProductStatusEnum
}

export interface ProductQueryServiceClient {
    getProduct(request: GetProductRequest): Observable<GetProductResponse>
}