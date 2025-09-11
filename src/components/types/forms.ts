// types/forms.ts (يمكن وضع هذا في ملف منفصل لتنظيم الكود)

// 1. نُعرّف نوعًا يمثل الخيار الواحد في القائمة المنسدلة عندما يكون كائنًا.
// يجب أن يحتوي كل خيار على قيمة فريدة (value) ونص ليراه المستخدم (label).
export interface SelectOption {
  value: string;
  label: string;
}

// 2. نُعرّف الواجهة (Interface) الخاصة بالـ props التي سيستقبلها الـ Component.
// هذا يضمن أن أي مبرمج يستخدم هذا الـ Component سيمرر البيانات الصحيحة.
export interface DynamicSelectProps {
  /**
   * القيمة الحالية المختارة في الـ Select.
   * تُستخدم للتحكم في الـ Component من الخارج (controlled component).
   */
  value?: string;
  
  /**
   * دالة تُستدعى عند تغيير المستخدم للقيمة المختارة.
   * تستقبل القيمة الجديدة كوسيط (parameter).
   */
  onChange: (value: string) => void;
  
  /**
   * مصفوفة الخيارات التي ستظهر في القائمة.
   * يمكن أن تكون مصفوفة من النصوص البسيطة (string[])
   * أو مصفوفة من الكائنات التي تتبع شكل SelectOption.
   */
  options: string[] | SelectOption[];
  
  /**
   * النص الذي يظهر كعنوان فوق حقل الإدخال (اختياري).
   */
  label?: string;
  
  /**
   * النص الذي يظهر داخل الحقل قبل اختيار أي قيمة (اختياري).
   */
  placeholder?: string;
  
  /**
   * لتحديد ما إذا كان الحقل معطلاً (disabled) أم لا (اختياري).
   */
  disabled?: boolean;
}


// lib/types.ts (ملف جديد لتعريف الأنواع)

// يمثل عنصرًا واحدًا (منتج أو خدمة) داخل الفاتورة
export interface LineItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// يمثل بيانات العميل
export interface Customer {
  name: string;
  address: string;
  email: string;
}

// يمثل كائن الفاتورة الكامل
export interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  customer: Customer;
  items: LineItem[];
  subtotal: number;
  tax: number; // قيمة الضريبة
  total: number;
  currency: string; // مثل "SAR" أو "USD"
}

// components/ui/SimpleDataTable.tsx (سنضع الأنواع في نفس الملف لسهولة العرض)

// TData: يمثل نوع كائن البيانات في كل صف (مثلاً: User, Product, Payment).
// TValue: يمثل نوع القيمة داخل الخلية.
export interface ColumnDefinition<TData, TValue = any> {
  /**
   * مفتاح الوصول للبيانات في الكائن.
   * مثلاً، إذا كان كائن البيانات هو { id: 1, name: 'Ahmed' }،
   * فإن الـ accessorKey يمكن أن يكون 'id' أو 'name'.
   */
  accessorKey: keyof TData;

  /**
   * العنوان الذي سيظهر في رأس العمود.
   */
  header: string;

  /**
   * دالة اختيارية لتخصيص كيفية عرض الخلية.
   * إذا لم يتم توفيرها، سيتم عرض القيمة كما هي.
   * تستقبل `row` وهو كائن البيانات للصف الحالي.
   */
  cell?: ({ row }: { row: TData }) => React.ReactNode;
}

// واجهة الـ Props للمكون الرئيسي للجدول
export interface SimpleDataTableProps<TData, TValue> {
  columns: ColumnDefinition<TData, TValue>[];
  data: TData[];
}