import { Category } from "./category"

export interface Product {
    id:string
    name: string
    price:string
    description?:string
    urlImage?:number
    state:boolean
    createAt:string
    category?:Category
    categoryId?:string
  }
  export interface ProductCreateRequest {
    name?: string
    price?:string
    description?:string
    urlImage?:number
    state?:boolean
  }