"use client";

import { fetchOrder } from "@/api/api";
import { columnsOrder } from "@/components/columns/columnOrder";
import {  columns, users } from "@/components/columns/columns";
import { BreadcrumbDemo } from "@/components/components/barcom";
import { DialogComponent } from "@/components/components/dialog";
import SelectDynamic from "@/components/components/select";
import { SimpleDataTable } from "@/components/components/tables/data-table";
import OrderTable from "@/components/tABLES/order";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { error } from "console";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [customername, setCustomername] = useState<any[]>([
    { name: "اسم العميل" },
  ]);
  const [itemname, setitemname] = useState<any[]>([{ name: "اسم المنتج" }]);

  const [selectedCustomername, setSelectedcustomername] = useState<string>(""); // مبدئياً فاضي
  const [selecteditemname, setSelecteditemname] = useState<string>(""); // مبدئياً فاضي
  const [note, SetNote] = useState<string>(""); // مبدئياً فاضي
  const [anthornote, Setanthornote] = useState<string>(""); // مبدئياً فاضي
  const [recipientname, Setrecipientname] = useState<string>(""); // مبدئياً فاضي
  const [recipientnote, Setrecipientnote] = useState<string>(""); // مبدئياً فاضي
  const [companyname, Setcompanyname] = useState<string>(""); // مبدئياً فاضي
  const [map, Setmap] = useState<string>(""); // مبدئياً فاضي
  const [code, Setcode] = useState<string>(""); // مبدئياً فاضي
  const [city, Setrecity] = useState<string>(""); // مبدئياً فاضي
  const [municipality, Setmunicipality] = useState<string>(""); // مبدئياً فاضي
  const [address, Setaddress] = useState<string>(""); // مبدئياً فاضي
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setIamount] = useState(1);
  const [itemprice, setItemprice] = useState(0);
  const [itemdiscount, setItemDiscount] = useState(0);
  const [total, setItotal] = useState(0);
  const [recipientphone, setrecipientphone] = useState(0);
  const [totalDisvount, settotalDisvount] = useState(0);
  const [datacustomer, setcustomerdata] = useState<any[]>([]);
  const [dataitem, setitemdata] = useState<any[]>([]);
  const [dataorder, setorderdata] = useState<any[]>([]);

  const [products, setProducts] = useState<any[]>([
      { item: "", amount: 1, price: 0, discount: 0, total: 0 },
    ]);
    const [orderTotal, setOrderTotal] = useState(0);

     // ✅ تحديث منتج معين
  const updateProduct = (index: number, field: string, value: any) => {
    const newProducts = [...products];
    newProducts[index][field] = value;

    // إذا غيّر المنتج → جيب السعر من API
    if (field === "item" && value) {
      fetch(
        `http://localhost:5678/webhook/d4b5e5de-9939-42e3-8e48-5b239c341f57?name=${value}`
      )
        .then((res) => res.json())
        .then((data) => {
          newProducts[index].price = Number(data.price) || 0;
          newProducts[index].total =
            newProducts[index].amount * newProducts[index].price;

          setProducts(newProducts);
        });
    } else {
      // تحديث المجموع
      newProducts[index].total =
        newProducts[index].amount * newProducts[index].price -
        newProducts[index].discount;
      setProducts(newProducts);
    }
  };

  // ✅ إضافة منتج جديد
  const addProduct = () => {
    setProducts([
      ...products,
      { item: "", amount: 1, price: 0, discount: 0, total: 0 },
    ]);
  };

  useEffect(() => {
      const sum = products.reduce((acc, p) => acc + p.total, 0);
      setOrderTotal(sum);
    }, [products]);

  const handleSubmit = async () => {
    console.log("الطلب النهائي:", {
      customer: selectedCustomername,
      products,
      note,
      total: orderTotal,
    });
    const formdata = {
        selectedCustomername,
        products,
        orderTotal,
        itemdiscount,
        totalDisvount,
        selectedpaytype,
        recipientname,
        recipientphone,
        selectedCountry,
        city,
        municipality,
        address,
        recipientnote,
        map,
        companyname,
        code,
        selectedrecipienttype,
        anthornote
    }
    fetch(
      "http://localhost:5678/webhook/859c77a9-a794-44dd-be78-4e294a309995",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      }
    ).then(() => {
        fetchOrder(setorderdata , setIsOpen)
    });
  };

  // أسماء العملاء
  const customerName = [
    "اسم العميل",
    ...datacustomer.map((e) => e.customer.name),
  ];
  const itemName = ["اسم المنتج", ...dataitem.map((e) => e.name)];

  const paytype = ["طريقة الدفع", "عند الإستلام", "تحويل بنكي", "أخرى"];
    const [selectedpaytype, setSelectedpaytype] = useState(paytype[0]);
  
    const handlepaytypeChange = (value: string) => {
      setSelectedpaytype(value);
    };

    const recipienttype = ["طريقة التسليم", "التوصيل الى المنزل", "استلام من أقرب شعبة", "أخرى"];
    const [selectedrecipienttype, setSelectedrecipienttype] = useState(paytype[0]);
  
    const handlerecipienttypeChange = (value: string) => {
      setSelectedrecipienttype(value);
    };

    const country = ["إختر المدينة", "تركيا", "سوريا", "العراق", "ليبيا", "أميركا", "أوروبا", "أخرى"];
    const [selectedCountry, setSelectedCountry] = useState(country[0]);
  
    const handleCountryChange = (value: string) => {
      setSelectedCountry(value);
    };
  const handlesetnameChange = (val: string) => {
    setSelectedcustomername(val);
  };
  const handlesetitemnameChange = (val: string) => {
    setSelecteditemname(val);
  };

  const handletotal = () => {
    setItotal(amount * itemprice);
  };

  const children = (
    <div className="">
      <div className="flex flex-col gap-4">
        <Label className="font-bold">اسم العميل</Label>
        <SelectDynamic
          items={customerName}
          onChange={handlesetnameChange}
          value={selectedCustomername || "اسم العميل"}
        />
      </div>
      <div className="">
        <h1 className="text-md font-bold m-3 p-3">تفاصيل المنتجات</h1>

        {/* ✅ تكرار لكل منتج */}
        {products.map((product, index) => (
          <div
            key={index}
            className="m-3 p-3 grid grid-cols-1 md:grid-cols-2 gap-4 border rounded"
          >
            <div className="flex flex-col gap-4">
              <Label className="font-bold">اسم المنتج</Label>
              <SelectDynamic
                items={itemName}
                onChange={(val) => updateProduct(index, "item", val)}
                value={product.item || "اسم المنتج"}
              />
            </div>

            <div className="flex flex-col gap-4">
              <Label className="font-bold">الكمية</Label>
              <Input
                type="number"
                value={product.amount}
                onChange={(e) =>
                  updateProduct(index, "amount", Number(e.target.value))
                }
              />
            </div>

            <div className="flex flex-col gap-4 col-span-2">
              <Label className="font-bold">السعر</Label>
              <Input type="text" disabled value={product.price} />
            </div>

            <div className="flex flex-col gap-4 col-span-2">
              <Label className="font-bold">المجموع</Label>
              <Input type="text" disabled value={product.total} />
            </div>
          </div>
        ))}

        {/* زر إضافة منتج */}
        <Button onClick={addProduct} className="mt-3">
          ➕ إضافة منتج آخر
        </Button>
      </div>
      <div className="flex flex-col gap-4 mt-3">
        <Label className="font-bold">المجموع النهائي</Label>
        <Input type="number" disabled value={orderTotal} />
      </div>
      <div className="flex flex-col gap-4 mt-3">
        <Label className="font-bold">الخصم</Label>
        <Input type="number" value={itemdiscount} onChange={(e) => setItemDiscount(Number(e.target.value))} />
      </div>
      <div className="flex flex-col gap-4 mt-3">
        <Label className="font-bold">المجموع النهائي بعد الخصم</Label>
        <Input type="number" disabled value={totalDisvount} />
      </div>
      <div className="flex flex-col gap-4 mt-3">
        <Label className="font-bold">طريقة الدفع</Label>
        <SelectDynamic items={paytype} onChange={handlepaytypeChange} value={selectedpaytype} />
      </div>
      <div className="flex flex-col gap-4 mt-3">
        <Label className="font-bold">اسم المستلم</Label>
        <Input type="text" value={recipientname} onChange={(e) => Setrecipientname(e.target.value)} />
      </div>
      <div className="flex flex-col gap-4 mt-3">
        <Label className="font-bold">رقم المستلم</Label>
        <Input type="tel" value={recipientphone} onChange={(e) => setrecipientphone(Number(e.target.value))} />
      </div>
      <div className="flex flex-col gap-4 mt-3">
        <Label className="font-bold">الدولة</Label>
        <SelectDynamic items={country} onChange={handleCountryChange} value={selectedCountry} />
      </div>
      <div className="flex flex-col gap-4 mt-3">
        <Label className="font-bold">المدينة</Label>
        <Input type="text" value={city} onChange={(e) => Setrecity(e.target.value)} />
      </div>
      <div className="flex flex-col gap-4 mt-3">
        <Label className="font-bold">البلدية</Label>
        <Input type="text" value={municipality} onChange={(e) => Setmunicipality(e.target.value)} />
      </div>
      <div className="flex flex-col gap-4 mt-3">
        <Label className="font-bold">عنوان التسليم</Label>
        <Input type="text" value={address} onChange={(e) => Setaddress(e.target.value)} />
      </div>
      <div className="flex flex-col gap-4 mt-3">
        <Label className="font-bold">ملاحظات التسليم</Label>
        <Input type="text" value={recipientnote} onChange={(e) => Setrecipientnote(e.target.value)} />
      </div>
      <div className="flex flex-col gap-4 mt-3">
        <Label className="font-bold">موقع التسليم على خرائط غوغل</Label>
        <Input type="text" value={map} onChange={(e) => Setmap(e.target.value)} />
      </div>
       <div className="flex flex-col gap-4 mt-3">
        <Label className="font-bold">اسم شركة الشحن</Label>
        <Input type="text" value={companyname} onChange={(e) => Setcompanyname(e.target.value)} />
      </div>
       <div className="flex flex-col gap-4 mt-3">
        <Label className="font-bold">كود التعقب</Label>
        <Input type="text" value={code} onChange={(e) => Setcode(e.target.value)} />
      </div>
      <div className="flex flex-col gap-4 mt-3">
        <Label className="font-bold">طريقة الإستلام</Label>
        <SelectDynamic items={recipienttype} onChange={handlerecipienttypeChange} value={selectedrecipienttype || "طريقة التسليم"} />
      </div>
      <div className="flex flex-col gap-4 mt-3">
            <Label className="font-bold">ملاحظات اضافية</Label>
            <Textarea
              placeholder="ملاحظات"
              onChange={(e) => Setanthornote(e.target.value)}
            />
          </div>
    </div>
  );

  useEffect(() => {
    fetch(
      `http://localhost:5678/webhook/d4b5e5de-9939-42e3-8e48-5b239c341f57?name=${selecteditemname}`
    )
      .then((res) => {
        
        return res.json();
      })
      .then((data) => {
        setItemprice(Number(data.price));
      });
  }, [selecteditemname]);

  useEffect(() => {
    setItotal(amount * itemprice);
    settotalDisvount(orderTotal - itemdiscount)
  }, [amount, itemprice , itemdiscount]);

  useEffect(() => {
    fetchOrder(setorderdata , setIsOpen)
    fetch(
      "http://localhost:5678/webhook/74a413dc-6501-41ea-8200-a5536493430b",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: "1" }),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("لا يوجد بيانات");
        return res.json();
      })
      .then((data) => {
        setcustomerdata(data);
        setCustomername((prev) => {
          const merged = [...prev, ...data];
          return merged.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.name === item.name)
          );
        });
      })
      .catch((error) => {
        alert(error);
      });
    fetch("http://localhost:5678/webhook/b8776e2c-e47f-4a40-bda0-81d8ce462038")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setitemdata(data);
      });
  }, []);

  return (
    <div className="relative top-[-27px]">
      <div className="flex shadow py-4 px-7 items-center justify-between">
        <BreadcrumbDemo linkpage="الطلبات" />
        <DialogComponent
          open={isOpen}
          onOpenChange={setIsOpen}
          onclick={handleSubmit}
          textButton="اضافة طلب"
          children={children}
        />
      </div>

      <div className="w-full mt-4">
        <OrderTable data={dataorder} set={setorderdata}/>
        {/* <SimpleDataTable columns={columns} data={users} /> */}
      </div>
    </div>
  );
}
