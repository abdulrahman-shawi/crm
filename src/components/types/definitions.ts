// lib/definitions.ts (ملف جديد لتعريف الأنواع)
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed" // حالة الدفع
  email: string
}

export type Order = {
    id:string
    customer_name:string
    order_total:number
    items_total:number
    total_iteme:string
    selectedpaytype:string
    selectedrecipienttype:string
    under_order:string
    created_at:string
}