
export interface Report {
    name: string
    cant: number
    price: number
    belongs:number
}
export interface GroupedReport  {
  [key: string]: Report[]; 
}
export interface ReportDayDetailResponse{
    detail:[Report]
    product:[Report]
}

export interface DeliveredUnpaidProductReport {
    id: number
    entryId: number
    product: string
    customer: string
    user: string | null
    cant: number
    price: number
    total: number
    deliveredAt: string
}