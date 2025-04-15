import { Observable } from "rxjs"
import { CreateOrderDto } from "../dtos/order.dto"


export interface CreateOrderResponse {
    status: number
    error: string[]
}


export interface OrderCommandServiceClient {
    createOrder(request: CreateOrderDto): Observable<CreateOrderResponse>
}