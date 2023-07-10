import { User } from "./user"

export interface Data{
    id : number
    username : string
    password : string
    createAt : Date
    updateAt : Date
    user: User
}