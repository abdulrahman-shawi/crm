// app/simple-table/page.tsx

"use client"; // الصفحة لا تحتاج لبيانات من السيرفر في هذا المثال

import { SimpleDataTable, ColumnDefinition } from "@/components/components/tables/data-table";
import { Badge } from "@/components/ui/badge";

// 1. تعريف شكل كائن المستخدم (User)
interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "User" | "Editor";
}

// 2. بيانات وهمية لعرضها في الجدول
export const users: User[] = [
  { id: 1, name: "أحمد عبد الله", email: "ahmed@example.com", role: "Admin" },
  { id: 2, name: "فاطمة الزهراء", email: "fatima@example.com", role: "Editor" },
  { id: 3, name: "خالد بن الوليد", email: "khalid@example.com", role: "User" },
  { id: 4, name: "عائشة محمد", email: "aisha@example.com", role: "User" },
];

// 3. تعريف الأعمدة التي نريد عرضها
// نحدد أن نوع البيانات هو User
export const columns: ColumnDefinition<User>[] = [
  {
    accessorKey: "name",
    header: "الاسم",
  },
  {
    accessorKey: "email",
    header: "البريد الإلكتروني",
  },
  {
    accessorKey: "role",
    header: "الدور",
    // هنا نستخدم دالة `cell` المخصصة لعرض الدور بشكل أجمل باستخدام Badge
    cell: ({ row }) => {
      const role = row.role;
      let variant: "default" | "secondary" | "destructive" = "default";
      if (role === "Admin") variant = "destructive";
      if (role === "Editor") variant = "secondary";
      
      return <Badge variant={variant}>{role}</Badge>;
    },
  },
];
