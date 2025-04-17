import { Observable } from "rxjs"


export interface GetOrderRequest {
    id: string
}

export interface GetOrderResponse {
    status: number
    error: string[]
    data: OrderData | undefined
}

export interface OrderData {
    buyDate: string
    products: ProductData[]
}

export interface ProductData {
    id: string
    name: string
    price: number
    description: string
}

export interface OrderQueryServiceClient {
    getOrder(request: GetOrderRequest): Observable<GetOrderResponse>
}