export interface Service {
    id : string
    name : string
    type : number
    price : number
    description : string
    createAt:string
    state:boolean
  }
  export interface ServiceCreateRequest {
    name? : string
    type ?: number
    price ?: number
    description? : string
    state?:boolean
  }

