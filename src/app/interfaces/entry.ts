import { Customer } from "./customer"
import { Detail } from "./detail"
import { DetailProduct } from "./detailProduct"
import { User } from "./user"

export interface Entry {
    id:string
    dateOut: string
    state:boolean
    createAt:string
    customer:Customer
    user:User
    details:[Detail]
    detailsProduct:[DetailProduct]
  }

export interface EntryCreateRequest {
    dateOut?: string
    state?:boolean
    customerId?:string
}