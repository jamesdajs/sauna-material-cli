import { Product } from "./product"

export interface DetailProduct {
    id:string
    price: number
    cant:number
    product:Product
    createAt:string
    state:number
  }

export interface DetailProductCreateRequest {
    price?: number
    cant?:number
    state?:number
}