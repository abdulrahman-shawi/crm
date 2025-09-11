"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Layout, Phone, Section, SectionIcon } from "lucide-react";
import React, { useState } from "react";
import { DialogComponent } from "../components/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Calendar22 } from "../components/datapicker";
import SelectDynamic from "../components/select";
import { useUser } from "@/PROVIDER";
import { useRouter } from "next/navigation";
import { fetchData, fetchItem } from "@/api/api";
import { Button } from "../ui/button";
import { TabsWebs } from "../components/tabs";
import Interests from "../components/Interests";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import CountrySelect from "../components/contry";
import SelectedForm from "../components/forms";
import Link from "next/link";

export function ItemsTable({
  data,
  setDATA,
  catname = [],
}: {
  data: any[];
  setDATA?: any;
  catname?: any[];
}) {
  const [sections, setSections] = useState(2); // الحالة: عدد الأقسام
  const [open, setisopen] = useState(false); // الحالة: عدد الأقسام
  const [dataEdit, setdataEdit] = useState({}); // الحالة: عدد الأقسام
  const [name, setName] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const [fileedit, setfileedit] = useState("");
  const [filedel, setfiledel] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [catnames, setcatnames] = useState("");
  const [note, setNote] = useState("");
  const [id, setid] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);

  function formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  function formatDisplayDate(dateString: string | null) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  const handleSubmit = async (id: string) => {};

  const handleEditSubmit = (id: string) => {
    fetch(
      `http://localhost:5678/webhook/bb0d193d-2c0c-483a-aea4-0132fcf08d09?id=${id}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("خطأ في تحميل البيانات");
        return res.json();
      })
      .then((data) => {
        setdataEdit(data);
        setName(data.name);
        setPhotoLink(data.photo_link);
        setVideoLink(data.video_link);
        setPrice(data.price);
        setDiscount(data.discount);
        setNote(data.note);
        setcatnames(data.categories);
        setfileedit(data.file);
        setid(data.id)
      });
  };

  function timeAgo(dateString: string | null) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "الآن";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `منذ ${hours} ساعة`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `منذ ${days} يوم`;
    const months = Math.floor(days / 30);
    if (months < 12) return `منذ ${months} شهر`;
    const years = Math.floor(months / 12);
    return `منذ ${years} سنة`;
  }

  const handlesubmitEdit = async () => {
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
  } else {
    // إذا لم يرفع ملف جديد، نستعمل الملف القديم
    uploadedFileName = fileedit;
  }
    const formData = {
      id:id,
      name,
      category: catnames,
      price,
      discount,
      linkPhoto: photoLink,
      linkVideo: videoLink,
      note,
      file: uploadedFileName,
    };

    fetch(
      "http://localhost:5678/webhook/5792f447-762d-413e-a9ac-5747631ad74c",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    ).then(() => {
      fetchItem(setDATA, setisopen); // 👈 فقط نحدّث الجدول

      console.log("✅ المنتج أُضيف بنجاح");
    });
  };

  const deleteData = async (id: string, fileUrl: string) => {
  try {
    // 🟢 حذف المنتج من n8n
    const res = await fetch(
      `http://localhost:5678/webhook/c999d565-3cc6-4402-acde-7efc64dc6ccf?id=${id}`
    );

    const data = await res.json();

    setfiledel(data.file);
    console.log(`file del: ${data.file}`);

    // 🟢 حذف الصورة من السيرفر إذا عندك API خاص
    if (fileUrl) {
      await fetch("/api/delete-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileUrl }),
      });
    }

    // 🟢 تحديث البيانات في الجدول
    fetchItem(setDATA, setisopen);

    console.log("✅ تم حذف المنتج والصورة بنجاح");
  } catch (error) {
    console.error("خطأ أثناء الحذف:", error);
  }
};

  const children = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <img  src={file ? URL.createObjectURL(file) : fileedit}  className="w-full h-full rounded-2xl" alt="" />
      <div className="">
        <div className="my-2 flex flex-col gap-3">
          <Label>اسم المنتج</Label>
          <Input
          type="text"
          placeholder="اسم المنتج"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </div>
        <div className="my-2 flex flex-col gap-3">
          <Label>السعر</Label>
          <Input
          type="number"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        </div>
        <div className="my-2 flex flex-col gap-3">
          <Label>الخصم</Label>
          <Input
          type="number"
          placeholder="الخصم"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />
        </div>
        <div className="my-2 flex flex-col gap-3">
          <Label>رابط الصورة</Label>
          <Input
          type="text"
          placeholder="رابط صورة"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        </div>
        <div className="my-2 flex flex-col gap-3">
          <Label>رابط فيديو</Label>
<Input
          type="text"
          placeholder="رابط فيديو"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
        </div>
        <div className="my-2 flex flex-col gap-3">
          <Label>تصنيف المنتج</Label>
          <SelectDynamic
              items={catname}
              onChange={setcatnames}
              value={catnames}
            />
        </div>
        <div className="my-2 flex flex-col gap-3">
          <Label>ملاحظات</Label>
           <Textarea
           rows={4}
          placeholder="ملاحظات"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        </div>
       <div className="my-4 flex flex-col gap-3">
          
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        </div>
        
      </div>
    </div>
  );

  if (!data || data.length === 0) {
    return <p className="text-red-500 text-center">⚠ لا توجد بيانات متاحة</p>;
  }
  return (
    <div className="w-full mt-4">
      {/* الأزرار */}
      <div className="flex gap-2 mb-4">
        <Button onClick={() => setSections(2)}>
          <Layout />
        </Button>
        <Button onClick={() => setSections(3)}>
          <Section />
        </Button>
      </div>

      {/* الأقسام */}
      <div
        className={` mx-2 my-4 grid gap-4 ${
          sections === 1
            ? "grid-cols-1"
            : sections === 2
            ? "grid-cols-2"
            : "grid-cols-3"
        }`}
      >
        {data.map((e, i) => (
          <div
            key={i}
            className="p-2 shadow rounded-2xl text-center flex items-center justify-center flex-col gap-3"
          >
            <img className="w-full h-[50vh] rounded-2xl" src={e.file} alt="" />
            <div className="flex items-center justify-between flex-col md:flex-row gap-4 w-[95%]">
              <h1 className="text-sm font-bold ">{e.name}</h1>
              <h1 className="text-sm font-bold ">التصنيف: {e.categories}</h1>
            </div>
            <div className="flex items-center justify-between gap-4 w-[95%]">
              <p className="text-sm font-semibold text-gray-500">
                السعر :{e.price}
              </p>
              <p className="text-sm font-semibold text-gray-500">
                الخصم: {e.discount}
              </p>
            </div>
            {e.drive_link !== "" && e.drive_link !== null ? (
              <Link className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-500 duration-200" target="_blank" href={e.drive_link}>المزيد من الصور</Link>
            ):(
              <p></p>
            )}
            <div className="flex items-center justify-between gap-4 w-[80%]">
             
                <DialogComponent
                open={open}
                onOpenChange={setisopen}
                onclickChange={() => handleEditSubmit(e.id)}
                classButton="bg-green-600 text-white hover:bg-green-500 cursor-pointer hover:text-white"
                  onclick={handlesubmitEdit}
                  textButton="تعديل"
                  children={children}
                />
              <Button onClick={() => deleteData(e.id , filedel)} className="bg-red-600 hover:bg-red-500 text-white rounded duration-500 cursor-pointer">
                حذف
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
