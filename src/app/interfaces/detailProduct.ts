import { Product } from "./product"
import { Customer } from "./customer"
import { Locker } from "./locker"

export interface DetailProduct {
    id:string
    price: number
    cant:number
    product:Product
    createAt:string
    state:number
  }

export interface DetailProductCreateRequest {
    name?:string
    price?: number
    cant?:number
    state?:number
    productId?:string
    entryId?:string
  
}   

export interface PendingDetailProduct extends DetailProduct {
    entryId: string
    customer: Customer
    lockers: Locker[]
}
