import { Observable } from "rxjs";
import { ProductStatusEnum } from "@shared/enums/product.enum";


export interface UpdateProductRequest {
    id: string
    status: ProductStatusEnum
}

export interface UpdateProductResponse {
    status: number
    error: string[]
}

export interface ProductCommandServiceClient {
    updateProduct(request: UpdateProductRequest): Observable<UpdateProductResponse>
}