"use client";
import React, { useEffect, useState } from "react";

type Props = {
  object: Record<string, string>;               // { key: "العرض للعميل" }
  onChange?: (selectedLabels: string[]) => void; // يرجّع القيم بالعربي (labels)
  defaultValue?: string[];                      // يمكن تكون labels
  value?: string[];                             // (اختياري) للتحكم الكامل بالمكون
};

export default function SelectedForm({
  object,
  onChange,
  defaultValue = [],
  value,
}: Props) {
  // الحالة = labels مباشرة
  const [selectedLabels, setSelectedLabels] = useState<string[]>(defaultValue);

  // مزامنة مع prop "value" لو الكومبوننت controlled
  useEffect(() => {
    if (value) {
      setSelectedLabels(value);
    }
  }, [value?.join("|")]);

  useEffect(() => {
    if (!value) {
      setSelectedLabels(defaultValue);
    }
  }, [defaultValue?.join("|")]);

  // تبديل الحالة عند النقر
  const toggleLabel = (label: string) => {
    const exists = selectedLabels.includes(label);
    const next = exists
      ? selectedLabels.filter((l) => l !== label)
      : [...selectedLabels, label];

    setSelectedLabels(next);
    onChange?.(next); // ✅ يرجع labels مباشرة
  };

  return (
    <div className="p-4">
      <h2 className="text-md font-bold mb-4">المشاكل التي تعاني منها</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.values(object).map((label) => (
          <label key={label} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedLabels.includes(label)}   // ✅ يعتمد على labels
              onChange={() => toggleLabel(label)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
