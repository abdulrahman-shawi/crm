"use client";

import { fetchData } from "@/api/api";
import { BreadcrumbDemo } from "@/components/components/barcom";
import AddressForm from "@/components/components/contry";
import ZipChecker from "@/components/components/contry";
import CountryCodeSelect from "@/components/components/contry";
import CountrySelector from "@/components/components/contry";
import { DialogComponent } from "@/components/components/dialog";
import SelectedForm from "@/components/components/forms";
import Interests from "@/components/components/Interests";
import SelectDynamic from "@/components/components/select";
import { CustomerTable } from "@/components/tABLES/customer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/utils/provider";
import { publicDecrypt } from "crypto";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CustomerPage() {
  const router = useRouter();
  const [medicalConditions, setMedicalConditions] = useState<string[]>([]); // افتراضي "0"
  const [Diseases, setDiseases] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [activeInterests, setActiveInterests] = useState<string[]>([]);

  const [nameCustomer, setnameCustomer] = useState("");
  const [city, setcity] = useState("");
  const [phone, setphone] = useState<number>(+905);
  const [wight, setwight] = useState<number>(0);
  const [hieght, sethieght] = useState<number>(0);
  const [problem, setproblem] = useState("");
  const [note, setnote] = useState("");
  const [data , setData] = useState([])

  const {ID} = useUser()


  

  useEffect(() => {
  // لو ID فاضي أو null لا تسوي fetch
  if (!ID) return;

  fetchData(setData , ID);
}, [ID]); // ✅ ينفذ فقط لما ID تتغير // مهم تحط ID dependency

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

  

  const agents = ["الجنس", "ذكر", "أنثئ"];
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const agents2 = ["الجنس", "ذكر", "أنثئ"];
  const [selectedAgent2, setSelectedAgent2] = useState(agents2[0]);
  const agents3 = ["الجنس", "ذكر", "أنثئ"];
  const [selectedAgent3, setSelectedAgent3] = useState(agents3[0]);
  const [isOpen, setIsOpen] = useState(false); // 🔹 للتحكم بالـ Dialog

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
  const [selectedcustomerSource, setSelectedcustomerSource] = useState(
    customerSource[0]
  );

  

  const customerAge = [
    "الفئة العمرية",
    "18 - 25 سنة",
    "26 - 35 سنة",
    "36 - 45 سنة",
    "أكثر من 45 سنة",
  ];
  const [selectedcustomerAge, setSelectedcustomerAge] = useState(
    customerAge[0]
  );

  const maritalstatus = ["الحالة الإجتماعية", "عزباء", "متزوج/ة", "مطلق/ة"];
  const [selectedmaritalstatus, setSelectedmaritalstatus] = useState(maritalstatus[0]);

  const skineType = ["نوع البشرة", "دهنية", "جافة", "مختلطة", "حساسة", "عادية"];
  const [selectedskineType, setSelectedskineType] = useState(skineType[0]);

  const handleAgentChange = (value: string) => {
    setSelectedAgent(value);
  };

  const handleAgent2Change = (value: string) => {
    setSelectedAgent2(value);
  };

  const handleAgent3Change = (value: string) => {
    setSelectedAgent3(value);
  };

  const skinecolor = ["لون البشرة", "فاتحة", "متوسطة", "سمراء", "داكنة"];
  const [selectedskinecolor, setSelectedskinecolor] = useState(skinecolor[0]);

  const handlesjincolorChange = (value: string) => {
    setSelectedskinecolor(value);
  };

  const bodytype = ["نوع الجسم", "نحيف", "ممتلئ", "يعاني من ترهلات"];
  const [selectedbodytype, setSelectedbodytype] = useState(bodytype[0]);

  const handlebodytypeChange = (value: string) => {
    setSelectedbodytype(value);
  };

  const haircolor = ["لون الشعر", "أشقر", "أبيض", "أسود"];
  const [selectedhaircolor, setSelectedhaircolor] = useState(haircolor[0]);

  const handlehaircolorChange = (value: string) => {
    setSelectedhaircolor(value);
  };

  const purpose = ["الغرض", "إزالة شعر", "رتوش"];
  const [selectedpurpose, setSelectedpurpose] = useState(purpose[0]);

  const handlepurposeChange = (value: string) => {
    setSelectedpurpose(value);
  };

  const handleCustomerAgeChange = (value: string) => {
    setSelectedcustomerAge(value);
  };
  const handleskineTypeChange = (value: string) => {
    setSelectedskineType(value);
  };

  const handleCustomerSourceChange = (value: string) => {
    setSelectedcustomerSource(value);
  };

  const handlemaritalstatusChange = (value: string) => {
    setSelectedmaritalstatus(value);
  };

  // const child2 = (
  //   <div>
  //     <h1 className="font-bold text-md">أجهزة الليزر</h1>
  //     <SelectDynamic
  //       value={selectedskinecolor}
  //       items={skinecolor} // تمرير المصفوفة
  //       onChange={handlesjincolorChange} // دالة التغيير
  //       placeholder="لون البشرة"
  //       className="mt-3"
  //       label="لون البشرة"
  //     />
  //     <SelectDynamic
  //       value={selectedhaircolor}
  //       items={haircolor} // تمرير المصفوفة
  //       onChange={handlehaircolorChange} // دالة التغيير
  //       placeholder="لون الشعر"
  //       className="mt-3"
  //       label="لون الشعر"
  //     />
  //     <SelectDynamic
  //       value={selectedAgent2}
  //       items={agents2} // تمرير المصفوفة
  //       onChange={handleAgent2Change} // دالة التغيير
  //       placeholder="اختر الجنس"
  //       className="mt-3"
  //       label="الجنس"
  //     />
  //     <SelectDynamic
  //       value={selectedpurpose}
  //       items={purpose} // تمرير المصفوفة
  //       onChange={handlepurposeChange} // دالة التغيير
  //       placeholder="الغرض"
  //       className="mt-3"
  //       label="الغرض"
  //     />
  //   </div>
  // );

  // const child3 = (
  //   <div>
  //     <h1 className="font-bold text-md">برامج التنحيف</h1>
  //     <SelectDynamic
  //       value={selectedbodytype}
  //       items={bodytype} // تمرير المصفوفة
  //       onChange={handlebodytypeChange} // دالة التغيير
  //       placeholder="نوع الجسم"
  //       className="mt-3"
  //       label="نوع الجسم"
  //     />
  //     <Input
  //       type="number"
  //       placeholder="الوزن"
  //       className="w-full p-3 my-3"
  //       onChange={(e) => setwight(Number(e.target.value))}
  //     />
  //     <Input
  //       type="number"
  //       placeholder="الطول"
  //       className="w-full p-3 my-3"
  //       onChange={(e) => sethieght(Number(e.target.value))}
  //     />
  //     <SelectDynamic
  //       value={selectedAgent3}
  //       items={agents3} // تمرير المصفوفة
  //       onChange={handleAgent3Change} // دالة التغيير
  //       placeholder="اختر الجنس"
  //       className="mt-3"
  //       label="الجنس"
  //     />
  //     <Input
  //       type="text"
  //       placeholder="المشكلة التي ترغب في حلها"
  //       className="w-full p-3 my-3"
  //       onChange={(e) => setproblem(e.target.value)}
  //     />
  //   </div>
  // );

  // const child1 = (
  //   <div>
  //     <h1 className="font-bold text-md">منتجات و أجهزة البشرة</h1>
  //     <SelectDynamic
  //       value={selectedskineType}
  //       items={skineType} // تمرير المصفوفة
  //       onChange={handleskineTypeChange} // دالة التغيير
  //       placeholder="نوع البشرة"
  //       className="mt-3"
  //       label="نوع البشرة"
  //     />
  //     <SelectDynamic
  //       value={selectedAgent}
  //       items={agents} // تمرير المصفوفة
  //       onChange={handleAgentChange} // دالة التغيير
  //       placeholder="اختر الجنس"
  //       className="mt-3"
  //       label="الجنس"
  //     />
  //     <SelectedForm
  //       object={skinConditions}
  //       onChange={(values) => setMedicalConditions(values)}
  //     />
  //   </div>
  // );

  const allInterests = [
  {
    id: "منتجات و أجهزة البشرة",
    label: "منتجات و أجهزة البشرة",
    child: (
      <div>
        <h1 className="font-bold text-md">منتجات و أجهزة البشرة</h1>
        <SelectDynamic
          value={selectedskineType}
          items={skineType}
          onChange={handleskineTypeChange}
          placeholder="نوع البشرة"
          className="mt-3"
          label="نوع البشرة"
        />
        <SelectDynamic
          value={selectedAgent}
          items={agents}
          onChange={handleAgentChange}
          placeholder="اختر الجنس"
          className="mt-3"
          label="الجنس"
        />
        <SelectedForm
          object={skinConditions}
          onChange={(values) => setMedicalConditions(values)}
        />
      </div>
    ),
  },
  {
    id: "أجهزة الليزر",
    label: "أجهزة الليزر",
    child: (
      <div>
        <h1 className="font-bold text-md">أجهزة الليزر</h1>
        <SelectDynamic
          value={selectedskinecolor}
          items={skinecolor}
          onChange={handlesjincolorChange}
          placeholder="لون البشرة"
          className="mt-3"
          label="لون البشرة"
        />
        <SelectDynamic
          value={selectedhaircolor}
          items={haircolor}
          onChange={handlehaircolorChange}
          placeholder="لون الشعر"
          className="mt-3"
          label="لون الشعر"
        />
        <SelectDynamic
          value={selectedAgent2}
          items={agents2}
          onChange={handleAgent2Change}
          placeholder="اختر الجنس"
          className="mt-3"
          label="الجنس"
        />
        <SelectDynamic
          value={selectedpurpose}
          items={purpose}
          onChange={handlepurposeChange}
          placeholder="الغرض"
          className="mt-3"
          label="الغرض"
        />
      </div>
    ),
  },
  {
    id: "برامج التنحيف",
    label: "برامج التنحيف",
    child: (
      <div>
        <h1 className="font-bold text-md">برامج التنحيف</h1>
        <SelectDynamic
          value={selectedbodytype}
          items={bodytype}
          onChange={handlebodytypeChange}
          placeholder="نوع الجسم"
          className="mt-3"
          label="نوع الجسم"
        />
        <Input
          type="number"
          placeholder="الوزن"
          className="w-full p-3 my-3"
          onChange={(e) => setwight(Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="الطول"
          className="w-full p-3 my-3"
          onChange={(e) => sethieght(Number(e.target.value))}
        />
        <SelectDynamic
          value={selectedAgent3}
          items={agents3}
          onChange={handleAgent3Change}
          placeholder="اختر الجنس"
          className="mt-3"
          label="الجنس"
        />
        <Input
          type="text"
          placeholder="المشكلة التي ترغب في حلها"
          className="w-full p-3 my-3"
          onChange={(e) => setproblem(e.target.value)}
        />
      </div>
    ),
  },
];


  const children = (
    <div>
      <form action="" className="w-full">
        <Input
          type="text"
          placeholder="اسم العميل"
          className="w-full p-3 my-3"
          onChange={(e) => setnameCustomer(e.target.value)}
        />
        <CountryCodeSelect
          defaultCountry="D"
          onSelect={(data) => setSelectedCountry(data)}
        />
        <Input
          type="text"
          placeholder="المدينة"
          className="w-full p-3 my-3"
          onChange={(e) => setcity(e.target.value)}
        />
        <Input
          type="tel"
          placeholder="الهاتف"
          className="w-full p-3 my-3"
          onChange={(e) => setphone(Number(e.target.value))}
        />
        <SelectDynamic
          value={selectedcustomerSource}
          items={customerSource} // تمرير المصفوفة
          onChange={handleCustomerSourceChange} // دالة التغيير
          placeholder="مصدر العميل"
          label="مصدر العميل"
        />
        <Interests
          activeInterests={activeInterests}
          setActiveInterests={setActiveInterests}
          allInterests={allInterests }
        />
        <h1 className="font-bold text-md mt-3">
          معلومات اختيارية مشتركة لجميع الإقسام
        </h1>
        <SelectDynamic
          value={selectedcustomerAge}
          items={customerAge} // تمرير المصفوفة
          onChange={handleCustomerAgeChange} // دالة التغيير
          placeholder="الفئة العمرية"
          label="الفئة العمرية"
          className="mt-3"
        />
        <SelectDynamic
          value={selectedmaritalstatus}
          items={maritalstatus} // تمرير المصفوفة
          onChange={handlemaritalstatusChange} // دالة التغيير
          placeholder="الحالة الإجتماعية"
          label="الحالة الإجتماعية"
          className="mt-3"
        />
        <SelectedForm
          object={customerInfo}
          onChange={(va) => setDiseases(va)}
        />
        <Textarea placeholder="ملاحظات" className="W-FULL resize-none" onChange={(e) =>setnote(e.target.value)} />
      </form>
    </div>
  );

  const handleSubmit = async () => {
  const finalData = {
    name: nameCustomer,
    country: selectedCountry,
    city: city,
    phone: phone,
    customerSource: selectedcustomerSource,
    interests: activeInterests.join(' , '), // ✅ الآن عندك الاهتمامات المختارة
    selectedskineType:selectedskineType,
    agent1:selectedAgent,
    skinecolor:selectedskinecolor,
    haircolor:selectedhaircolor,
    agent2:selectedAgent2,
    purpose:selectedpurpose,
    bodytype:selectedbodytype,
    medicalConditions: medicalConditions.join(" , "),
    diseases: Diseases.join(" , "),
    weight: wight,
    height: hieght,
    customerAge:selectedcustomerAge,
    agent3:selectedAgent3,
    problem: problem,
    note: note,
    material:selectedmaritalstatus,
    id:ID
  };

  try {
    const response = await fetch("http://localhost:5678/webhook/9b7da4db-7d98-4d7c-b918-e607e023542b", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    });

    if (response.ok) {
      alert("تم إرسال البيانات بنجاح!");
    } else {
      alert("حدث خطأ أثناء الإرسال.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};




  // لا تنس ربط هذه الدالة بزر الإرسال
  // <form onSubmit={handleSubmit}> ... </form>
  return (
    <div className="">
      <div className="relative top-[-27px]">
        <div className="flex shadow  py-4 px-7 items-center justify-between">
          <BreadcrumbDemo linkpage="العملاء" />
          <DialogComponent
            onclick={handleSubmit}
            textButton="اضافة عميل"
            children={children}
            
          />
        </div>
        <div className="w-full">
          <CustomerTable data={data} setDATA={setData} />
        </div>
      </div>
    </div>
  );
}
