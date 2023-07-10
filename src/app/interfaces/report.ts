export interface Report {
    name: string
    cant: number
    price: number
}
export interface ReportDayDetailResponse{
    detail:[Report]
    product:[Report]
}