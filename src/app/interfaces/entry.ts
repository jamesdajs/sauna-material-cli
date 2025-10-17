import { Customer } from "./customer"
import { Detail } from "./detail"
import { DetailProduct } from "./detailProduct"
import { User } from "./user"

export interface Entry {
    id:string
    dateOut: string
    state:boolean
    createAt:Date
    customer:Customer
    user:User
    paid:number
    observation:string
    details:[Detail]
    detailsProduct:[DetailProduct]
    total:number
  }

export interface EntryCreateRequest {
    dateOut?: string
    state?:boolean
    paid?:number
    customerId?:string
    observation?:string
}