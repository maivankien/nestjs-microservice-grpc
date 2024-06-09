import { Observable } from "rxjs";
import { CreateProductDto } from "../dtos/product.dto";

export interface CreateProductResponse {
    status: number
    error: string[]
}


export interface ProductCommandServiceClient {
    createProduct(request: CreateProductDto): Observable<CreateProductResponse>
}