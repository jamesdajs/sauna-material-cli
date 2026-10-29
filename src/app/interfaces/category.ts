export interface Category {
    id:string
    name: string
    description:string
    state:boolean
    creeateAt:string
  }

export interface CategoryCreateRequest {
  name?: string
  state?:boolean
  description?:string
}