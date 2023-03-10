import { Entry } from "./entry"

export interface User {
    id:string
    name: string
    state:boolean
    createAt:string
    entries:[Entry]
  }

export interface UserCreateRequest {
  name?: string
  state?:boolean
}