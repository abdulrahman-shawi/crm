// app/payments/columns.tsx

"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Order } from "@/components/types/definitions"

export const columnsOrder: ColumnDef<Order>[] = [
  {
    accessorKey: "customer_name",
    header: "اسم العميل",
    filterFn: "includesString",
  },
  {
    accessorKey: "items_total",
    header: "إجمالي المنتجات",
    filterFn: "includesString",
  },
  {
    accessorKey: "order_total",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        المبلغ
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    filterFn: "includesString",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("order_total"))
      const formatted = new Intl.NumberFormat("ar-SY", {
        style: "currency",
        currency: "SYP",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "selectedpaytype",
    header: "طريقة الدفع",
    filterFn: "includesString",
  },
  {
    accessorKey: "selectedrecipienttype",
    header: "طريقة التسليم",
    filterFn: "includesString",
  },
  {
    accessorKey: "under_order",
    header: "حالة الطلب",
    filterFn: "includesString",
  },
  {
    accessorKey: "created_at",
    header: "تاريخ الإضافة",
    filterFn: "includesString",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">فتح القائمة</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>إجراءات</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.id)}
            >
              نسخ معرف الطلب
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => alert(JSON.stringify(order, null, 2))}
            >
              عرض تفاصيل الطلب
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
