export interface Customer {
    id:string
    name: string
    ci?:string
    phone?:string
    observation?:string
    gender:number
    state:boolean
    createAt:string
  }
  export interface CustomerListResponse {
    customers: Customer[]
  }
  export interface CustomerCreateRequest {
    name?: string
    ci?:string
    phone?:string
    gender?:number
    observation?:string
    state?:boolean
  }