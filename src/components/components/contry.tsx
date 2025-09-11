"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import codesJson from "@/lib/codes.json";

// تعريف نوع بيانات الدولة
interface CountryData {
  country: string;
  iso2: string;
  iso3: string;
  phone: string;
}

// تعريف نوع الـ codes مع index signature
interface Codes {
  [key: string]: CountryData;
}

const codes: Codes = codesJson;

type Props = {
  defaultCountry?: string;
  onSelect?: (data: CountryData) => void; // callback لتمرير البيانات
};

export default function CountrySelect({ defaultCountry = "D", onSelect }: Props) {
  const [country, setCountry] = React.useState(defaultCountry);

  const handleChange = (value: string) => {
    setCountry(value);
    if (onSelect && codes[value]) {
      onSelect(codes[value]); // إرسال بيانات الدولة للصفحة الأم
    }
  };

  return (
    <div className="w-full"> {/* الحاوية الأم تأخذ كامل العرض */}
      <Select value={country} onValueChange={handleChange} className="w-full my-3">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختر الدولة" />
        </SelectTrigger>
        <SelectContent className="w-full max-h-60 overflow-auto">
          <SelectGroup className="w-full">
            <SelectLabel>الدول</SelectLabel>
            {Object.entries(codes).map(([code, data]) => (
              <SelectItem key={code} value={code} className="w-full my-3">
                {data.country} - {data.phone}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
