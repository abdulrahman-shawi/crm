// components/ui/DynamicSelect.tsx

import React from 'react';

// 1. استيراد المكونات الأساسية من shadcn/ui
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// 2. استيراد الواجهة التي عرفناها في الخطوة السابقة
import { DynamicSelectProps } from '@/components/types/forms';

/**
 * DynamicSelect هو Component ديناميكي وقابل لإعادة الاستخدام لعرض قائمة منسدلة.
 * تم بناؤه باستخدام shadcn/ui و TypeScript لضمان الجودة والأمان.
 * @param {DynamicSelectProps} props - الخصائص التي يتحكم بها الـ Component.
 */
export function DynamicSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled = false, // نعطي قيمة افتراضية false للـ disabled
}: DynamicSelectProps) {
  
  // 3. عرض الـ Component
  return (
    <div className="grid w-full items-center gap-1.5">
      {/* 4. نعرض الـ Label فقط إذا تم تمريره كـ prop */}
      {label && <Label htmlFor={label}>{label}</Label>}

      {/* 5. هذا هو المكون الرئيسي من shadcn/ui */}
      <Select
        // onValueChange: هي دالة خاصة بـ shadcn/ui تُستدعى عند تغيير القيمة.
        // نحن نربطها مع دالة onChange التي مررناها عبر props.
        onValueChange={onChange}
        
        // value: القيمة الحالية المختارة.
        value={value}
        
        // disabled: لتعطيل الحقل.
        disabled={disabled}
      >
        {/* 6. SelectTrigger هو الجزء الذي يراه المستخدم ويضغط عليه لفتح القائمة */}
        <SelectTrigger id={label}>
          {/* SelectValue يعرض القيمة المختارة، أو الـ placeholder إذا لم يتم اختيار شيء */}
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        
        {/* 7. SelectContent هو الحاوية التي تظهر عند فتح القائمة وتحتوي على الخيارات */}
        <SelectContent>
          {/* 8. هنا الجزء الديناميكي الأهم: */}
          {/* نستخدم .map() للمرور على كل عنصر في مصفوفة options */}
          {options.map((option, index) => {
            // 9. نتحقق من نوع العنصر في المصفوفة
            const isStringOption = typeof option === 'string';
            
            // إذا كان العنصر نصًا (string)، نستخدمه كـ value و label.
            const optionValue = isStringOption ? option : option.value;
            const optionLabel = isStringOption ? option : option.label;
            
            // 10. SelectItem يمثل خيارًا واحدًا داخل القائمة
            return (
              <SelectItem
                // key: مطلوب من React لتمييز كل عنصر في القائمة بشكل فريد.
                // نستخدم القيمة + الـ index لضمان عدم تكرار الـ key.
                key={`${optionValue}-${index}`}
                
                // value: هي القيمة الفعلية التي سيتم إرسالها عند الاختيار.
                value={optionValue}
              >
                {/* هذا هو النص الذي سيظهر للمستخدم في القائمة */}
                {optionLabel}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}