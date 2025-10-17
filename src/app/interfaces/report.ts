
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