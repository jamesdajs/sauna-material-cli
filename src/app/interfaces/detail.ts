import { Locker } from "./locker"
import { Service } from "./service"

export interface Detail {
    id:string
    price: number
    cant:number
    lockers:[Locker]
    createAt:string
    service:Service
  }

export interface DetailCreateRequest {
    price?: number
    cant?:number
}