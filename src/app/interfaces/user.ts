
import { Data } from "./Data"
import { Role } from "./Role"
import { Entry } from "./entry"

export interface User {
  id : number
  name : string
  ci : string
  phone : string
  gender : number
  birthdate : Date
  observation : string
  state : boolean
  createAt : Date
  updateAt : Date
  data: Data
  role :Role
  entries: [Entry]
  }

export interface UserCreateRequest {
  name? : string
  ci? : string
  phone? : string
  gender? : number
  birthdate? : Date
  observation? : string
  username? : string
  password? : string
  state? : boolean
}
