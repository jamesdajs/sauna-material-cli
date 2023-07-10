import { User } from "./user"

export interface Role{
    id : Number
    name : string
    showname : string
    createAt : Date
    updateAt : Date
    users: [User]
}