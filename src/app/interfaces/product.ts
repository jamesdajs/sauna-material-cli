import { Category } from "./category"

export interface Product {
    id:string
    name: string
    price:number
    description?:string
    urlImage?:number
    state:boolean
    belongs:number
    createAt:string
    category?:Category
    categoryId?:string
  }
  export interface ProductCreateRequest {
    name?: string
    price?:string
    description?:string
    urlImage?:number
    belongs?:number
    state?:boolean
  }