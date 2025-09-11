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
import { Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DialogComponent } from "../components/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Calendar22 } from "../components/datapicker";
import SelectDynamic from "../components/select";
import { useUser } from "@/utils/provider";
import { useRouter } from "next/navigation";
import { fetchData } from "@/api/api";
import { Button } from "../ui/button";
import { TabsWebs } from "../components/tabs";
import Interests from "../components/Interests";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import CountrySelect from "../components/contry";
import SelectedForm from "../components/forms";

export function CustomerTable({
  data,
  setDATA,
}: {
  data: any[];
  setDATA: any;
}) {
  const [isOpen, setIsOpen] = useState(false); // 🔹 للتحكم بالـ Dialog
  const [isOpen2, setIsOpen2] = useState(false); // 🔹 للتحكم بالـ Dialog
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [country, Setcountry] = useState("");
  const [phone, Setphone] = useState(Number);
  const [hieght, Sethieght] = useState(Number);
  const [wight, Setwight] = useState(Number);
  const [openDialogId, setOpenDialogId] = useState<number | null>(null);
  const [city, Setcity] = useState("");
  const [customerSourceEdit, SetcustomerSource] = useState("");
  const [problem, Setproblem] = useState("");
  const [skanType, SetskanType] = useState("");
  const [countrycode, Setcountrycode] = useState("");
  const [countryiso, Setcountryiso] = useState("");
  const [medicalConditions, SetmedicalConditions] = useState("");
  const [customerinfoEdit, SetcustomerinfoEdit] = useState("");
  const [id, SetId] = useState("");
  const { ID } = useUser();
  const [activeInterests, setActiveInterests] = useState<string[]>([]);
  const [datamessage, setdatamessage] = useState([]);
  const [activeInterestsEdit, setActiveInterestsEdits] = useState("");
  const [note, setnote] = useState("");
  const fieldsToCheck = [
    "name",
    "country_code",
    "country",
    "city",
    "customerSource",
    "interests",
    "selectedskineType",
    "agent1",
    "skinecolor",
    "haircolor",
    "agent2",
    "purpose",
    "bodytype",
    "medicalConditions",
    "diseases",
    "weight",
    "height",
    "customerAge",
    "agent3",
    "problem",
    "note",
    "phone",
  ];

  
  const skinConditions = {
    acne: "حب الشباب",
    freckles: "كلف / نمش",
    large_pores: "مسامات واسعة",
    sagging: "ترهلات",
    stretch_marks: "علامات تمدد",
    hair_loss: "تساقط شعر",
    pigmentation: "تصبغات",
    fine_lines: "خطوط دقيقة",
    other: "أخرى",
  };
  

  const customerSource = [
    "مصدر العميل",
    "whatsApp",
    "Meta",
    "Tiktok",
    "إحالة",
    "علاقة شخصية",
    "زيالرة الموقع مباشرة",
    "فعالية أو معرض",
    "أخرى",
  ];

  const customerInfo = {
    diabetes: "مريضة سكر",
    pressure: "ضغط",
    pregnant: "حامل",
    breastfeeding: "مرضعة",
    hormonal_treatment: "تخضع لعلاج هرموني",
    diet: "تتبع حمية غذائية",
    exercise: "تمارس الرياضة بانتظام",
    offers: "مهتم بالعروض أو الاشتراكات",
    customer_interested: "العميل هو المهتم",
    customer_ask: "يستفسر لشخص آخر",
  };

  function normalizeToArray(value: any): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => String(v).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  }
  return [];
}

  const arraymedicalConditions = normalizeToArray(medicalConditions)
  const arraycustomerinfo = normalizeToArray(customerinfoEdit)

  const skineType = ["نوع البشرة", "دهنية", "جافة", "مختلطة", "حساسة", "عادية"];

  const handleskineTypeChange = (value: string) => {
    SetskanType(value);
  };
  const agents = ["الجنس", "ذكر", "أنثئ"];
  const [selectedAgent, setSelectedAgent] = useState("");
  const handleAgentChange = (value: string) => {
    setSelectedAgent(value);
  };

  const agents2 = ["الجنس", "ذكر", "أنثئ"];
  const [selectedAgent2, setSelectedAgent2] = useState("");
  const handleAgentChange2 = (value: string) => {
    setSelectedAgent2(value);
  };

  const agents3 = ["الجنس", "ذكر", "أنثئ"];
  const [selectedAgent3, setSelectedAgent3] = useState("");
  const handleAgentChange3 = (value: string) => {
    setSelectedAgent3(value);
  };

  const maritalstatus = ["الحالة الإجتماعية", "عزباء", "متزوج/ة", "مطلق/ة"];
    const [selectedmaritalstatus, setSelectedmaritalstatus] = useState("");

    const handlemaritalstatusChange = (value: string) => {
    setSelectedmaritalstatus(value);
  };

  const Seriousnessassessment = [
    "تقييم الجدية",
    "أبدى إهتماما واضحا",
    "غير رأيه",
    "يحتاج وقت للتفكير",
    "لديه إعتراض على السعر",
    "تم إغلاق البيع",
    "يحتاج متابعة و استشاره",
  ];
  const [selectedSeriousnessassessment, setSelectedSeriousnessassessment] =
    useState(Seriousnessassessment[0]);

  const handleSeriousnessassessmentChange = (value: string) => {
    setSelectedSeriousnessassessment(value);
  };

  const calculateCompletion = (customer: any) => {
    if (!customer || customer.length === 0) return 0;
    let filledCount = 0;
    fieldsToCheck.forEach((field) => {
      const value = customer[field];
      if (
        value &&
        value !== "" &&
        value !== " " &&
        value !== "نوع البشرة" &&
        value !== "الجنس" &&
        value !== "لون البشرة" &&
        value !== "لون الشعر" &&
        value !== "ممتلئ"
      ) {
        filledCount++;
      }
    });
    return Math.round((filledCount / fieldsToCheck.length) * 100);
  };

  const bodytype = ["نوع الجسم", "نحيف", "ممتلئ", "يعاني من ترهلات"];
    const [selectedbodytype, setSelectedbodytype] = useState(bodytype[0]);
  
    const handlebodytypeChange = (value: string) => {
      setSelectedbodytype(value);
    };

  const skinecolor = ["لون البشرة", "فاتحة", "متوسطة", "سمراء", "داكنة"];
    const [selectedskinecolor, setSelectedskinecolor] = useState("");
  
    const handlesjincolorChange = (value: string) => {
      setSelectedskinecolor(value);
    };

    const haircolor = ["لون الشعر", "أشقر", "أبيض", "أسود"];
  const [selectedhaircolor, setSelectedhaircolor] = useState("");

  const handlehaircolorChange = (value: string) => {
    setSelectedhaircolor(value);
  };

  const purpose = ["الغرض", "إزالة شعر", "رتوش"];
    const [selectedpurpose, setSelectedpurpose] = useState("");
  
    const handlepurposeChange = (value: string) => {
      setSelectedpurpose(value);
    };

    const customerAge = [
    "الفئة العمرية",
    "18 - 25 سنة",
    "26 - 35 سنة",
    "36 - 45 سنة",
    "أكثر من 45 سنة",
  ];
  const [selectedcustomerAge, setSelectedcustomerAge] = useState("");

    const handleCustomerAgeChange = (value: string) => {
    setSelectedcustomerAge(value);
  };

  const [dob, setDob] = React.useState<Date | undefined>(undefined);
  const [message, setmessage] = useState("");
  const route = useRouter();

  const child1 = (
    <div>
      <Textarea
        onChange={(e) => setmessage(e.target.value)}
        placeholder="أخر ما تم التواصل معه"
      />
      <Calendar22 value={dob} onChange={setDob} />
      <SelectDynamic
        value={selectedSeriousnessassessment}
        items={Seriousnessassessment}
        onChange={setSelectedSeriousnessassessment}
        placeholder="جدية العميل"
        className="mt-3"
        label="جدية العميل"
      />
    </div>
  );

  const chaild2 = (
    <div className="w-full">
      <div className="my-4">
        <Label className="my-4">الاسم</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="my-4">
        <Label className="my-4">بلد العميل</Label>
       <CountrySelect
  defaultCountry={countrycode}
  onSelect={(val) => {
    Setcountry(val.country);   // اسم الدولة
    Setcountrycode(val.iso2); 
    Setcountryiso(val.phone) // كود الدولة مثل "SY"
    // ولو تحتاج باقي البيانات تقدر تخزن val.phone أو val.iso2 أو val.iso3
  }}
/>

      </div>
      <div className="my-4">
        <Label className="my-4">المدينة</Label>
        <Input
          type="text"
          value={city}
          onChange={(e) => Setcity(e.target.value)}
        />
      </div>
      <div className="my-4">
        <Label className="my-4">الهاتف</Label>
        <Input
          type="number"
          value={phone}
          onChange={(e) => Setphone(Number(e.target.value))}
        />
      </div>
      <div className="my-4">
        <Label className="my-4">مصدر العميل</Label>
        <SelectDynamic
          items={customerSource}
          value={customerSourceEdit}
          onChange={SetcustomerSource}
        />
      </div>
      <div className="my-4">
        <Label className="my-4">الإهتمامات</Label>
        <Input
          type="text"
          value={activeInterestsEdit}
          onChange={(e) => setActiveInterestsEdits(e.target.value)}
        />
      </div>
      <div className="border-b-2 border-gray-200 حغ-2"></div>
      <div className="my-4">
        <Label className="my-4"> منتجات و أجهزة البشرة</Label>
        <Label className="my-4">نوع البشرة</Label>
        <SelectDynamic
          items={skineType}
          value={skanType}
          onChange={SetskanType}
        />
      </div>
      <div className="my-4">
        <Label className="my-4">جنس العميل</Label>
        <SelectDynamic
          items={agents}
          value={selectedAgent}
          onChange={handleAgentChange}
        />
      </div>
      <div className="my-4">
       <SelectedForm
               object={skinConditions}
               onChange={(values) => SetmedicalConditions(values)}
               defaultValue={arraymedicalConditions}
             />
      </div>
      <div className="border-b-2 border-gray-200"></div>
      <div className="my-4">
        <Label className="my-4"> أجهزة الليزر</Label>
        <Label className="my-4">لون البشرة</Label>
        <SelectDynamic
          items={skinecolor}
          value={selectedskinecolor}
          onChange={handlesjincolorChange}
        />
      </div>
      <div className="my-4">
        <Label className="my-4">لون الشعر</Label>
        <SelectDynamic
          items={haircolor}
          value={selectedhaircolor}
          onChange={handlehaircolorChange}
        />
      </div>
      <div className="my-4">
        <Label className="my-4">جنس العميل</Label>
        <SelectDynamic
          items={agents2}
          value={selectedAgent2}
          onChange={handleAgentChange2}
        />
      </div>
      <div className="my-4">
        <Label className="my-4">الغرض</Label>
        <SelectDynamic
          items={purpose}
          value={selectedpurpose}
          onChange={handlepurposeChange}
        />
      </div>
      <div className="border-b-2 border-gray-200 حغ-2"></div>
      <div className="my-4">
        <Label className="my-4"> برامج التنحيف</Label>
        <Label className="my-4">نوع الجسم</Label>
        <SelectDynamic
          items={bodytype}
          value={selectedbodytype}
          onChange={handlebodytypeChange}
        />
      </div>
      <div className="my-4">
        <Label className="my-4">الطول</Label>
        <Input
          type="number"
          value={hieght}
          onChange={(e) => Sethieght(Number(e.target.value))}
        />
      </div>
      <div className="my-4">
        <Label className="my-4">الوزن</Label>
        <Input
          type="number"
          value={wight}
          onChange={(e) => Setwight(Number(e.target.value))}
        />
      </div>
      <div className="my-4">
        <Label className="my-4">جنس العميل</Label>
        <SelectDynamic
          items={agents3}
          value={selectedAgent3}
          onChange={handleAgentChange3}
        />
      </div>
      <div className="my-4">
        <Label className="my-4">المشكلة التي يرغب في حلها</Label>
        <Input
          type="text"
          value={city}
          onChange={(e) => Setproblem(e.target.value)}
        />
      </div>
      <div className="my-4">
        <Label className="my-4">الفئة العمرية</Label>
        <SelectDynamic
                  value={selectedcustomerAge}
                  items={customerAge} // تمرير المصفوفة
                  onChange={handleCustomerAgeChange} // دالة التغيير
                />
      </div>
      <div className="my-4">
        <Label className="my-4">الحالة الإجتماعية</Label>
        <SelectDynamic
                  value={selectedmaritalstatus}
                  items={maritalstatus} // تمرير المصفوفة
                  onChange={handlemaritalstatusChange} // دالة التغيير
                />
      </div>
      <div className="my-4">
        <Label className="my-4">ملاحظات</Label>
        <Textarea placeholder="ملاحظات" value={note} className="W-FULL resize-none" onChange={(e) =>setnote(e.target.value)} />
      </div>
            <div className="my-4">
       <SelectedForm
               object={customerInfo}
               onChange={(values) => SetcustomerinfoEdit(values)}
               defaultValue={arraycustomerinfo}
             />
      </div>

    </div>
  );

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

  const chaild3 = <div className="w-full">
    {datamessage.map(e => (
      <div className="w-[95%] mx-auto p-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-md font-bold ">الرسالة : </h1>
          <p>{e.message}</p>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-md font-bold ">الجدية : </h1>
          <p>{e.serial}</p>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-md font-bold ">تاريخ اللقاء : </h1>
          <p>{formatDisplayDate(e.meet_date)}</p>
        </div>
        <div className="border border-gray-200 w-full"></div>
      </div>
      
    ))}
  </div>;

  const chaild4 = <div className="w-full">4</div>;

  const allInterests = [
    { id: "بيانات العميل", label: "بيانات العميل", child: chaild2 },
    { id: "اتصالات العميل", label: "إتصالات العميل", child: chaild3 },
    { id: "طلبات العميل", label: "طلبات العميل", child: chaild4 },
  ];

  function formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  

  

  const handleSubmit = async (id: string) => {
    const fetchDatam = {
      id: id,
      date: dob ? formatDateTime(dob) : null,
      message: message,
      serous: selectedSeriousnessassessment,
    };
    console.log(fetchDatam)
    try {
      const res = await fetch(
        "http://localhost:5678/webhook/33ed5a79-4128-4f22-9650-8fa6326d5e89",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fetchDatam),
        }
      );

      if (!res.ok) {
        alert("حدث خطأ أثناء إرسال البيانات 🚨");
        return;
      }

      await res.json();
      setIsOpen(false); // ✅ إغلاق الـ popup
      fetchData(setDATA, ID);
      
    } catch (error) {
      console.error("Error sending data:", error);
      alert("فشل الاتصال بالسيرفر ❌");
    }
  };

  const handleEditSubmit = (id: string) => {
    fetch(
      `http://localhost:5678/webhook/a3809885-390f-4f7d-b4d8-2a4b79960ffe?id=${id}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        SetId(data.customer.json.id)
        setName(data.customer.json.name);
        Setcountry(data.customer.json.country);
        Setcountrycode(data.customer.json.country_cod);
        Setcity(data.customer.json.city);
        setUser(data.user);
        Setphone(data.customer.json.phone);
        SetcustomerSource(data.customer.json.customerSource);
        SetskanType(data.customer.json.selectedskineType)
        setActiveInterestsEdits(data.customer.json.interests);
        SetmedicalConditions(data.customer.json.medicalConditions);
        setSelectedAgent(data.customer.json.agent1)
        setSelectedAgent2(data.customer.json.agent2)
        setSelectedAgent3(data.customer.json.agent3)
        setSelectedpurpose(data.customer.json.purpose)
        setSelectedskinecolor(data.customer.json.skinecolor)
        setSelectedhaircolor(data.customer.json.haircolor)
        setSelectedbodytype(data.customer.json.bodytype)
        Sethieght(data.customer.json.height)
        Setwight(data.customer.json.weight)
        setSelectedcustomerAge(data.customer.json.customerAge)
        setSelectedmaritalstatus(data.customer.json.material)
        setnote(data.customer.json.note)
        SetcustomerinfoEdit(data.customer.json.diseases)
      });

      fetch(`http://localhost:5678/webhook/3eb9d7ce-b6a8-46ef-b162-a518373903a5?id=${id}`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setdatamessage(data)
      })
  };

  const editdata = () => {
    const formdata ={
      id:id,
      name:name,
      country:country,
      countryCode:countrycode,
      countryiso:countryiso,
      city:city,
      user:user,
      phone:phone,
      customerSource:customerSourceEdit,
      medicalConditions:medicalConditions,
      agents:selectedAgent,
      agents2:selectedAgent2,
      agents3:selectedAgent3,
      purpose:selectedpurpose,
      skinecolor:selectedskinecolor,
      skanType:skanType,
      haircolor:selectedhaircolor,
      bodytype:selectedbodytype,
      wight:wight,
      hieght:hieght,
      customerAge:selectedcustomerAge,
      maritalstatus:selectedmaritalstatus,
      customerinfoEdit:customerinfoEdit,
      problem:problem
    }
    fetch("http://localhost:5678/webhook/3c00ddcc-f910-4bff-b297-fb68c4340e2a",{
      method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
    })
  }

  const deleteData = (id:string) => {
    fetch(`http://localhost:5678/webhook/79ed67ab-27cd-4cc5-95ea-b24d2acea3fd?id=${id}`)
    .then(() => {
      fetchData(setDATA, ID);
    })
    
  }
  

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

  return (
    <div className="w-full mt-2">
      {" "}
      {/* ✅ يضيف Scroll أفقي عند الحاجة */}
      <Table className="">
        {/* ✅ يجبر الجدول أن يتمدد */}
        <TableCaption>قائمة العملاء</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className=" text-center border-l-2 border-gray-100">
              اتصال
            </TableHead>
            <TableHead className=" text-center border-l-2 border-gray-100">
              الاسم
            </TableHead>
            <TableHead className=" text-center border-l-2 border-gray-100">
              الملف الشخصي
            </TableHead>
            <TableHead className=" text-center border-l-2 border-gray-100">
              المسؤول
            </TableHead>
            <TableHead className=" text-center border-l-2 border-gray-100">
              رقم الموبايل
            </TableHead>
            <TableHead className=" text-center border-l-2 border-gray-100">
              الدولة
            </TableHead>
            <TableHead className=" text-center border-l-2 border-gray-100">
              الجنس
            </TableHead>
            <TableHead className=" text-center border-l-2 border-gray-100">
              الفئة العمرية
            </TableHead>
            <TableHead className=" text-center border-l-2 border-gray-100">
              تاريخ أخر اتصال
            </TableHead>
            <TableHead className=" text-center border-l-2 border-gray-100">
              أخر اتصال
            </TableHead>
            <TableHead className=" text-center border-l-2 border-gray-100">
              التاريخ
            </TableHead>
            <TableHead className=" text-center border-l-2 border-gray-100">
              العمليات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoice, index) => (
            
            <TableRow key={index}>
              <TableCell>
                <DialogComponent
                    open={openDialogId === invoice.customer.id} // ✅ التحكم بالفتح
                    onOpenChange={(open) => setOpenDialogId(open ? invoice.customer.id : null)} // ✅ تحديث الحالة
                  onclick={() => handleSubmit(invoice.customer.id)}
                  textButton={<Phone />}
                  children={child1}
                />
              </TableCell>
              <TableCell className="text-center border-l-2 border-gray-100">
                {invoice.customer.name}
              </TableCell>
              <TableCell className="text-center border-l-2 border-gray-100">
                {calculateCompletion(invoice.customer)}%
              </TableCell>
              <TableCell className="text-center border-l-2 border-gray-100">
                {invoice.user.name}
              </TableCell>
              <TableCell className="text-center border-l-2 border-gray-100">
                {invoice.customer.phone}
              </TableCell>
              <TableCell className="text-center border-l-2 border-gray-100">
                {invoice.customer.country}
              </TableCell>
              <TableCell className="text-center border-l-2 border-gray-100">
                {invoice.customer.agent3}
              </TableCell>
              <TableCell className="text-center border-l-2 border-gray-100">
                {invoice.customer.customerAge}
              </TableCell>
              <TableCell className="text-center border-l-2 border-gray-100">
                {timeAgo(invoice.customer.lastCall)}
              </TableCell>
              <TableCell className="text-center border-l-2 border-gray-100">
                {invoice.customer.message_call}
              </TableCell>
              <TableCell className="text-center border-l-2 border-gray-100">
                {formatDisplayDate(invoice.customer.meet_time)}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-between gap-5">
                  <DialogComponent
                    id={invoice.customer.id}
                    onclickChange={() => handleEditSubmit(invoice.customer.id)}
                    open={isOpen2} // ✅ التحكم بالفتح
                    onOpenChange={setIsOpen2} // ✅ تحديث الحالة
                    onclick={() => editdata()}
                    textButton={"تعديل"}
                    classButton="p-3 rounded bg-green-600 hover:bg-green-500 hover:text-white duration-500 text-white cursor-pointer"
                    children={
                      <Interests
                        allInterests={allInterests}
                        child1={chaild2}
                        child2={chaild3}
                        child3={chaild4}
                        activeInterests={activeInterests}
                        setActiveInterests={setActiveInterests}
                      />
                    }
                  />
                  <Button onClick={() => deleteData(invoice.customer.id)} className="p-3 rounded cursor-pointer bg-red-600 hover:bg-red-500 duration-500 text-white">
                    حذف
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="">
            <TableCell className="text-center" colSpan={12}>
              مجموع العملاء : {data.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
