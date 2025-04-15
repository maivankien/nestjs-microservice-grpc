import { ProductStatusEnum } from "@shared/enums/product.enum"

export type ProductUpdatedPayload = Readonly<{
    id: string
    name?: string
    price?: number
    status?: ProductStatusEnum
    description?: string
}>