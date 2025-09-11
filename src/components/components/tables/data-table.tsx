
// components/ui/SimpleDataTable.tsx

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ... (انسخ تعريفات الأنواع من الخطوة 1 هنا) ...
export interface ColumnDefinition<TData, TValue = any> {
    accessorKey: keyof TData;
    header: string;
    cell?: ({ row }: { row: TData }) => React.ReactNode;
}

export interface SimpleDataTableProps<TData, TValue> {
    columns: ColumnDefinition<TData, TValue>[];
    data: TData[];
}


/**
 * SimpleDataTable هو مكون جدول بيانات بسيط لا يستخدم مكتبة TanStack Table.
 * يعتمد على shadcn/ui للتصميم ويعرض البيانات بشكل مباشر.
 * @template TData - نوع كائن البيانات للصف.
 * @template TValue - نوع القيمة داخل الخلية.
 */
export function SimpleDataTable<TData, TValue>({
  columns,
  data,
}: SimpleDataTableProps<TData, TValue>) {

  return (
    <div className="rounded-md border">
      <Table>
        {/* 1. بناء رأس الجدول (Header) */}
        <TableHeader>
          <TableRow>
            {/* نمر على مصفوفة الأعمدة لإنشاء العناوين */}
            {columns.map((column) => (
              <TableHead key={String(column.accessorKey)}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* 2. بناء جسم الجدول (Body) */}
        <TableBody>
          {/* نتحقق أولاً إذا كانت هناك بيانات لعرضها */}
          {data.length > 0 ? (
            // إذا كانت هناك بيانات، نمر عليها لإنشاء الصفوف
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {/* داخل كل صف، نمر على تعريفات الأعمدة مرة أخرى لإنشاء الخلايا */}
                {columns.map((column) => (
                  <TableCell key={`${String(column.accessorKey)}-${rowIndex}`}>
                    {/* هنا الجزء الديناميكي لعرض محتوى الخلية */}
                    {column.cell ? (
                      // إذا كانت هناك دالة `cell` مخصصة، نستدعيها ونمرر لها بيانات الصف
                      column.cell({ row })
                    ) : (
                      // إذا لم تكن هناك دالة مخصصة، نعرض القيمة مباشرة من الكائن
                      // row[column.accessorKey] يصل إلى القيمة، مثلاً: row['name']
                      row[column.accessorKey] as React.ReactNode
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            // إذا لم تكن هناك بيانات، نعرض رسالة للمستخدم
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                لا توجد بيانات لعرضها.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}