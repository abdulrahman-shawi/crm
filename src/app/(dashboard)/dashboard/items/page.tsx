"use client";

import { fetchItem } from "@/api/api";
import { BreadcrumbDemo } from "@/components/components/barcom";
import { DialogComponent } from "@/components/components/dialog";
import SelectDynamic from "@/components/components/select";
import { ItemsTable } from "@/components/tABLES/items";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

export default function Items() {
  // 👇 نبدأ بخيار 0
  const [categoriesName, setCategoriesName] = useState<any[]>([
    { name: "تصنيف المنتج" },
  ]);
  const [data , Setdata] = useState([])

  const [selectedCategory, setSelectedCategory] = useState<string>("تصنيف المنتج");

  const [name, setName] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [driveLink, setdriveLink] = useState("");
  const [note, setNote] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false); // 🔹 للتحكم بالـ Dialog

  // 👇 جلب التصنيفات من السيرفر ودمجها مع 0
  useEffect(() => {
    fetch("http://localhost:5678/webhook/d1928b34-517e-462c-9bee-c67cc47a7229")
      .then((res) => res.json())
      .then((data) => {
        setCategoriesName((prev) => {
          const merged = [...prev, ...data];
          // إزالة التكرارات
          return merged.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.name === item.name)
          );
        });
      });
      
  }, []);


   useEffect(() => {
    fetchItem(Setdata , setIsOpen)
  }, []);

  const handleSubmit = async () => {
    let uploadedFileName = "";

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("فشل رفع الملف");
        return;
      }

      const data = await res.json();
      uploadedFileName = data?.url || file.name;
    }

    const formData = {
      name,
      category: selectedCategory,
      price,
      discount,
      linkPhoto: photoLink,
      linkVideo: videoLink,
      driveLink,
      note,
      file: uploadedFileName,
    };

    await fetch("http://localhost:5678/webhook/821bec41-af8f-4db3-a7a7-b18ed614d49d", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => {
  fetchItem(Setdata , setIsOpen)   // 👈 فقط نحدّث الجدول
  console.log("✅ المنتج أُضيف بنجاح");
});

    console.log("✅ المنتج أُضيف بنجاح");
  };

  const children = (
    <div className="space-y-2">
      <Input type="text" placeholder="اسم المنتج" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="number" placeholder="السعر" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      <Input type="number" placeholder="الخصم" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
      <Input type="text" placeholder="رابط صورة" value={photoLink} onChange={(e) => setPhotoLink(e.target.value)} />
      <Input type="text" placeholder="رابط فيديو" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />
      <Input type="text" placeholder="رابط الدرايف" value={driveLink} onChange={(e) => setdriveLink(e.target.value)} />
      <Input type="text" placeholder="ملاحظات" value={note} onChange={(e) => setNote(e.target.value)} />
      <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />

      {/* 👇 Dropdown التصنيفات */}
      <SelectDynamic
        items={categoriesName.map((c) => c.name)}
        onChange={setSelectedCategory}
        value={selectedCategory}
      />
    </div>
  );

  return (
    <div className="relative top-[-27px]">
      <div className="flex shadow py-4 px-7 items-center justify-between">
        <BreadcrumbDemo linkpage="المنتجات" />
        <DialogComponent open={isOpen} onOpenChange={setIsOpen} onclick={handleSubmit} textButton="اضافة منتج" children={children} />
      </div>

      <div className="w-full mt-4">
            <ItemsTable data={data} setDATA={Setdata} catname={categoriesName.map((e) => e.name)} />
      </div>
    </div>
  );
}
