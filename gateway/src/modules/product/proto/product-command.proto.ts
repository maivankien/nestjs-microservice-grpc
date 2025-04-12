import { Observable } from "rxjs";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto";

export interface CreateProductResponse {
    status: number
    error: string[]
}

export interface UpdateProductResponse {
    status: number
    error: string[]
}

export interface ProductCommandServiceClient {
    createProduct(request: CreateProductDto): Observable<CreateProductResponse>
    updateProduct(request: UpdateProductDto): Observable<UpdateProductResponse>
}