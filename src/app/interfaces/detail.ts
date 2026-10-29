import { Locker } from "./locker"
import { Service } from "./service"

export interface Detail {
    id:string
    price: number
    cant:number
    paid:boolean
    lockers:[Locker]
    createAt:string
    service:Service
  }

export interface DetailCreateRequest {
    name?: string
    price?: number
    cant?:number
    paid?: boolean
    serviceId?: string
    lockerId?: string[]
    entryId?: string
}
