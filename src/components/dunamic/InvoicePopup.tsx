// components/invoices/InvoicePopup.tsx

"use client";

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import type { Invoice } from "@/components/types/forms";

interface InvoicePopupProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InvoicePopup({ invoice, isOpen, onClose }: InvoicePopupProps) {
  const componentRef = useRef<HTMLDivElement>(null);

  // ✅ نسخة مستقرة (v2): استخدم content: () => ref.current
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `فاتورة-${invoice?.invoiceNumber}`,
    onBeforeGetContent: () => console.log("Preparing to print..."),
  });

  if (!invoice) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: invoice.currency,
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* === محتوى الفاتورة للطباعة === */}
        <div ref={componentRef} className="p-8 text-gray-900 bg-white">
          <DialogHeader className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <DialogTitle className="text-3xl font-bold">فاتورة</DialogTitle>
                <DialogDescription>
                  رقم الفاتورة: {invoice.invoiceNumber}
                </DialogDescription>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-semibold">
                  شركة تكنولوجيا المستقبل
                </h2>
                <p className="text-sm text-gray-500">
                  الرياض، المملكة العربية السعودية
                </p>
              </div>
            </div>
          </DialogHeader>

          <Separator className="my-6" />

          {/* تفاصيل العميل */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <h3 className="font-semibold mb-2">فاتورة إلى:</h3>
              <p className="font-bold">{invoice.customer.name}</p>
              <p>{invoice.customer.address}</p>
              <p>{invoice.customer.email}</p>
            </div>
            <div className="text-right">
              <p>
                <span className="font-semibold">تاريخ الإصدار:</span>{" "}
                {invoice.issueDate}
              </p>
              <p>
                <span className="font-semibold">تاريخ الاستحقاق:</span>{" "}
                {invoice.dueDate}
              </p>
            </div>
          </div>

          {/* جدول الفاتورة */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 font-semibold">#</th>
                  <th className="p-3 font-semibold">الوصف</th>
                  <th className="p-3 font-semibold">الكمية</th>
                  <th className="p-3 font-semibold">سعر الوحدة</th>
                  <th className="p-3 font-semibold">الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{item.description}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">{formatCurrency(item.unitPrice)}</td>
                    <td className="p-3">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Separator className="my-6" />

          {/* الإجماليات */}
          <div className="flex justify-end">
            <div className="w-full max-w-sm space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">المجموع الفرعي:</span>
                <span className="font-semibold">
                  {formatCurrency(invoice.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الضريبة (15%):</span>
                <span className="font-semibold">
                  {formatCurrency(invoice.tax)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <span>الإجمالي:</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>
        </div>
        {/* === نهاية الفاتورة === */}

        <DialogFooter className="pt-4 pr-8">
          <Button variant="outline" onClick={onClose}>
            إغلاق
          </Button>
          <Button onClick={handlePrint}>طباعة الفاتورة</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
