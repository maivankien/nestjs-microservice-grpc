
export interface ProductData {
    id: string
    name: string
    price: number
    description: string
}


export interface OrderData {
    buyDate: string
    products: ProductData[]
}

export interface GetOrderResponse {
    status: number
    error: string[]
    data: OrderData | undefined
}