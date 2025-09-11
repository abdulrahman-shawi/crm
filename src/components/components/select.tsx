"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SelectDynamicProps = {
  value: string;
  items: any[]; // أي مصفوفة نصوص أو كائنات
  onChange: (value: string, item?: any) => void;
  placeholder?: string;
  className?: string;
  label?: string;
};

export default function SelectDynamic({
  value,
  items,
  onChange,
  placeholder,
  className,
  label,
}: SelectDynamicProps) {
  const handleChange = (val: string) => {
    const selected = items.find((i) =>
      typeof i === "string" ? i === val : i.code === val
    );
    onChange(val, selected);
  };

  return (
    <div className={`w-full ${className}`}>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className={`w-full my-3`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="w-full max-h-60 overflow-auto">
          <SelectGroup>
            {label && <SelectLabel>{label}</SelectLabel>}
            {items.map((item, idx) => {
              const val = typeof item === "string" ? item : item.code;
              const display = typeof item === "string" ? item : item.country;
              return (
                <SelectItem key={idx} value={val}>
                  {display}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
