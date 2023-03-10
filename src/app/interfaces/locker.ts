export interface Locker {
    id:string
    code: string
    type: string
    observation:string
    state:boolean
    createAt:string
  }

export interface LockerCreateRequest {
    code?: string
    type?: string
    observation?:string
    state?:boolean
}