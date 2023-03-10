export interface Category {
    id:string
    name: string
    state:boolean
    creeateAt:string
  }

export interface CategoryCreateRequest {
  name?: string
  state?:boolean
}