import { Product } from "./product"

export interface DetailProduct {
    id:string
    price: number
    cant:number
    product:Product
    createAt:string
  }

export interface DetailProductCreateRequest {
    price?: number
    cant?:number
}