"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import SelectDynamic from "../components/select";
import { Divide, Edit, Eye } from "lucide-react";
import { DialogComponent } from "../components/dialog";
import Error from "next/error";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { fetchOrder } from "@/api/api";

export default function OrderTable({ data, set }: { data: any[]; set: any }) {
  type ProductItem = {
    item: string;
    amount: number;
    price: number;
    discount: number;
    total: number;
  };

  type ProductData = {
    id: number;
    customer_name: string;
    product: {
      product: ProductItem[];
    };
    order_total: string;
    items_discount: string;
    total_iteme: string;
    selectedpaytype: string;
    recipientname: string;
    recipientphone: string;
    selectedCountry: string;
    city: string;
    municipality: string;
    address: string;
    recipientnote?: string;
    map?: string;
    companyname?: string;
    code?: string;
    selectedrecipienttype: string;
    anthornote?: string;
    under_order: string;
    created_at: string;
  };

  type OrderDataType = {
    product?: { json: ProductData; pairedItem?: any };
    customer?: any;
  };

  const listOrder = [
    "اختر الحالة",
    "طلب جديد",
    "تم التجهيز",
    "قيد الإستلام",
    "تم الإستلام",
    "نقص معلومات",
    "تم إلغاء الطلب",
    "فشل التسليم",
    "حجز بمبلغ مال",
  ];
  const [ordersStatus, setOrdersStatus] = useState<string[]>([]);
  const [orderdatas, setOrderData] = useState<OrderDataType>({});
  const [open, setisopen] = useState(false);
  const [open2, setisopen2] = useState(false);
  const [orderEdit, setOrderEdit] = useState([]);
  const [products, setProducts] = useState<any[]>([
    { item: "", amount: 1, price: 0, discount: 0, total: 0 },
  ]);
  const [customerName, setCustomerName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [orderTotal, setOrderTotal] = useState("");
  const [itemsDiscount, setItemsDiscount] = useState("");
  const [totalIteme, setTotalIteme] = useState("");
  const [recipientNote, setRecipientNote] = useState("");
  const [map, setMap] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [code, setCode] = useState("");
  const [selectedRecipientType, setSelectedRecipientType] = useState("");
  const [anthorNote, setAnthorNote] = useState("");
  const [recipienttype, setrecipienttype] = useState("");
  const [selectedpaytype, setselectedpaytype] = useState("");
  const [id, setid] = useState("");
  const [country, setcountry] = useState("");
  const [municipality, setcmunicipality] = useState("");

  const paytype = ["طريقة الدفع", "عند الإستلام", "تحويل بنكي", "أخرى"];

  const countrylist = [
    "إختر المدينة",
    "تركيا",
    "سوريا",
    "العراق",
    "ليبيا",
    "أميركا",
    "أوروبا",
    "أخرى",
  ];

  const recipienttypelist = [
    "طريقة التسليم",
    "التوصيل الى المنزل",
    "استلام من أقرب شعبة",
    "أخرى",
  ];
  useEffect(() => {
    if (data && data.length > 0) {
      setOrdersStatus(
        data.map((e) => e.order.json.under_order || "اختر الحالة")
      );
    }
  }, [data]);

  const fetchproduct = (id: string) => {
    fetch(
      `http://localhost:5678/webhook/875824d8-5a2a-41e8-a6f5-a28a39703219?id=${id}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("gh" as any);
        return res.json();
      })
      .then((data) => {
        setOrderData(data);
        console.log(orderdatas);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleUnderOrderChange = (index: number, value: string, id: string) => {
    const newStatus = [...ordersStatus];
    newStatus[index] = value;
    setOrdersStatus(newStatus);
    console.log(value);
    fetch(
      `http://localhost:5678/webhook/f24e7e7f-49d4-4925-b848-e1e9b54170fb?id=${id}&order=${value}`
    );
  };

  const children = <div className=""></div>;

  const getUpdate = (id: string) => {
    fetch(
      `http://localhost:5678/webhook/f7f598d1-9cdd-4392-be6d-47fa9f195bc5?id=${id}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const order = data[0];
        setOrderEdit(order);
        setProducts(data[0].product.product);

        // تعبية الحقول
        setCustomerName(order.customer_name);
        setRecipientName(order.recipientname);
        setRecipientPhone(order.recipientphone);
        setCity(order.city);
        setAddress(order.address);
        setOrderTotal(order.order_total);
        setItemsDiscount(order.items_discount);
        setTotalIteme(order.total_iteme);
        setRecipientNote(data[0].recipientnote || "");
        setMap(data[0].map || "");
        setCompanyName(data[0].companyname || "");
        setCode(data[0].code || "");
        setSelectedRecipientType(data[0].selectedrecipienttype || "");
        setAnthorNote(data[0].anthornote || "");
        setid(data[0].id);
        setcountry(data[0].selectedCountry);
        setrecipienttype(data[0].selectedrecipienttype);
        setselectedpaytype(data[0].selectedpaytype);
        setcmunicipality(data[0].municipality);
      })
      .catch((err) => console.error("❌ خطأ في جلب البيانات:", err));
  };

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center gap-2">
      <p className="font-medium">{label}:</p>
      <p>{value}</p>
    </div>
  );

  const handleSubmit = () => {
    const f = {
      id,
      customerName,
      selectedpaytype,
      recipientName,
      recipientPhone,
      city,
      country,
      address,
      orderTotal,
      itemsDiscount,
      totalIteme,
      products,
      map,
      code,
      selectedRecipientType,
      companyName,
      recipientNote,
      anthorNote,
      municipality,
    };

    fetch(
      "http://localhost:5678/webhook/c76fe851-77c4-488c-a1c1-88a5c05388db",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      }
    ).then(() => {
      fetchOrder(set, setisopen);
      setisopen2(false);
    });
  };

  const deleteorder = (id: string) => {
    fetch(
      `http://localhost:5678/webhook/bae46ce5-4a88-43bd-9373-4315f8fcc2e1?id=${id}`
    )
      .then((res) => {
        if (!res.json) throw new Error("error in " as any);
        return res.json();
      })
      .then((data) => {
        fetchOrder(set, setisopen);
      });
  };
  return (
    <div>
      <Table className="">
        {/* ✅ يجبر الجدول أن يتمدد */}
        <TableCaption>قائمة العملاء</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center border-l-2 border-gray-100">
              اسم العميل
            </TableHead>
            <TableHead className="text-center border-l-2 border-gray-100">
              رقم الهاتف
            </TableHead>
            <TableHead className="text-center border-l-2 border-gray-100">
              إجمالي المنتجات
            </TableHead>
            <TableHead className="text-center border-l-2 border-gray-100">
              طريقة الدفع
            </TableHead>
            <TableHead className="text-center border-l-2 border-gray-100">
              إجمالي قيمة الطلب
            </TableHead>
            <TableHead className="text-center border-l-2 border-gray-100">
              حالة الطلب
            </TableHead>
            <TableHead className="text-center border-l-2 border-gray-100">
              طريقة التسليم
            </TableHead>
            <TableHead className="text-center border-l-2 border-gray-100">
              تاريخ الاضافة
            </TableHead>
            <TableHead className="text-center border-l-2 border-gray-100">
              العمليات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((order, index) => (
            <TableRow key={index}>
              <TableCell className="text-center border-l-2 border-gray-100">
                {order.customer.name}
              </TableCell>
              <TableCell className="text-center border-l-2 border-gray-100">
                {order.customer.country_code}-{order.customer.phone}
              </TableCell>
              <TableCell className="text-center border-l-2 border-gray-100">
                {order.order.json.product.product.length}
              </TableCell>
              <TableCell className={`text-center border-l-2 border-gray-100`}>
                <p
                  className={`${
                    order.order.json.selectedpaytype === "عند الإستلام"
                      ? "bg-red-300"
                      : "bg-gray-300"
                  } rounded-xl px-3 py-1`}
                >
                  {order.order.json.selectedpaytype}
                </p>
              </TableCell>
              <TableCell className="text-center border-l-2 border-gray-100">
                {order.order.json.order_total}
              </TableCell>
              <TableCell className="text-center border-l-2 border-gray-100">
                <SelectDynamic
                  items={listOrder}
                  onChange={(val) =>
                    handleUnderOrderChange(index, val, order.order.json.id)
                  }
                  value={ordersStatus[index]}
                />
              </TableCell>
              <TableCell className="text-center border-l-2 border-gray-100">
                {order.order.json.selectedrecipienttype}
              </TableCell>
              <TableCell className="text-center border-l-2 border-gray-100">
                {new Date(order.order.json.created_at).toLocaleString("ar-EG", {
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </TableCell>
              <TableCell className="text-center border-l-2 border-gray-100">
                <div className="flex items-center justify-center gap-4">
                  <Button className="w-5 h-5 p-3 bg-blue-500 hover:bg-blue-400 duration-700 cursor-pointer">
                    <DialogComponent
                      open={open}
                      onclickChange={(id) => {
                        fetchproduct(order.order.json.id);
                      }}
                      onOpenChange={setisopen}
                      classButton="bg-blue-500 text-white hover:bg-blue-400 cursor-pointer hover:text-white"
                      onclick={() => setisopen(false)}
                      textButton={<Eye />}
                      children=<>
                        <div className="flex flex-col gap-6 items-center bg-gray-50 p-6 shadow-lg rounded-xl">
                          {/* عنوان القسم */}
                          <h1 className="text-center text-2xl font-bold py-2 px-6 bg-blue-700 text-white rounded-full shadow">
                            تفاصيل الطلب
                          </h1>

                          {/* معلومات عامة */}
                          <div className="flex items-center justify-between w-full">
                            <p className="text-lg font-medium">
                              رقم الطلب:{" "}
                              <span className="font-bold text-blue-700">
                                {orderdatas.product?.json.id}
                              </span>
                            </p>
                            <img
                              src="/skyno-a779f7fb.jpg"
                              className="w-[120px] rounded-lg shadow"
                              alt="شعار"
                            />
                          </div>

                          <div className="w-full border-t border-gray-200 my-3"></div>

                          {/* بيانات العميل */}
                          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                            <p>
                              <span className="font-semibold">اسم العميل:</span>{" "}
                              {orderdatas.customer?.name}
                            </p>
                            <p>
                              <span className="font-semibold">رقم العميل:</span>{" "}
                              0{orderdatas.customer?.phone}
                            </p>
                            <p>
                              <span className="font-semibold">
                                تاريخ الطلب:
                              </span>{" "}
                              {new Date(
                                order.order.json.created_at
                              ).toLocaleString("ar-EG", {
                                dateStyle: "full",
                                timeStyle: "short",
                              })}
                            </p>
                            <p>
                              <span className="font-semibold">الحالة:</span>{" "}
                              {orderdatas.product?.json.under_order}
                            </p>
                          </div>

                          {/* جدول المنتجات */}
                          <div className="w-full my-6">
                            <h2 className="text-lg font-semibold mb-3 border-b-2 border-blue-700 w-fit">
                              تفاصيل المنتج
                            </h2>
                            <Table className="border rounded-lg overflow-hidden">
                              <TableHeader className="bg-blue-100">
                                <TableRow>
                                  <TableHead className="text-center border-l">
                                    اسم المنتج
                                  </TableHead>
                                  <TableHead className="text-center border-l">
                                    الكمية
                                  </TableHead>
                                  <TableHead className="text-center border-l">
                                    سعر الواحدة
                                  </TableHead>
                                  <TableHead className="text-center">
                                    المجموع الكلي
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {orderdatas.product?.json.product.product.map(
                                  (order, index) => (
                                    <TableRow
                                      key={index}
                                      className="hover:bg-gray-50"
                                    >
                                      <TableCell className="text-center border-l">
                                        {order.item}
                                      </TableCell>
                                      <TableCell className="text-center border-l">
                                        {order.amount}
                                      </TableCell>
                                      <TableCell className="text-center border-l">
                                        {order.price}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {order.total}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                              <TableFooter>
                                <TableRow className="bg-gray-100">
                                  <TableCell
                                    className="text-center font-bold text-blue-700"
                                    colSpan={12}
                                  >
                                    مجموع المنتجات:{" "}
                                    {
                                      orderdatas.product?.json.product.product
                                        .length
                                    }
                                  </TableCell>
                                </TableRow>
                              </TableFooter>
                            </Table>
                          </div>

                          {/* الأسعار */}
                          <div className="w-full flex flex-col gap-3 text-gray-800">
                            <div className="flex justify-between border-b pb-1">
                              <p>إجمالي الطلب</p>
                              <p className="font-semibold">
                                {orderdatas.product?.json.order_total}
                              </p>
                            </div>
                            <div className="flex justify-between border-b pb-1">
                              <p>إجمالي الخصم</p>
                              <p className="font-semibold text-red-600">
                                {orderdatas.product?.json.items_discount}
                              </p>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-blue-700">
                              <p>السعر النهائي</p>
                              <p>{orderdatas.product?.json.total_iteme}</p>
                            </div>
                          </div>

                          {/* معلومات الشحن */}
                          <div className="w-full mt-6 p-4 border rounded-lg bg-white shadow-sm">
                            <h2 className="text-lg font-semibold text-blue-700 mb-3">
                              معلومات الشحن
                            </h2>
                            <div className="flex items-center gap-2 mb-3">
                              <p className="font-medium">طريقة الاستلام:</p>
                              <p>{orderdatas.product?.json.selectedpaytype}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <InfoRow
                                label="اسم المستلم"
                                value={
                                  orderdatas.product?.json.recipientname || ""
                                }
                              />
                              <InfoRow
                                label="رقم المستلم"
                                value={
                                  orderdatas.product?.json.recipientphone || ""
                                }
                              />
                              <InfoRow
                                label="الدولة"
                                value={
                                  orderdatas.product?.json.selectedCountry || ""
                                }
                              />
                              <InfoRow
                                label="المدينة"
                                value={orderdatas.product?.json.city || ""}
                              />
                              <InfoRow
                                label="البلدية"
                                value={
                                  orderdatas.product?.json.municipality || ""
                                }
                              />
                              <InfoRow
                                label="العنوان"
                                value={orderdatas.product?.json.address || ""}
                              />
                              <InfoRow
                                label="شركة الشحن"
                                value={
                                  orderdatas.product?.json.companyname || ""
                                }
                              />
                              <InfoRow
                                label="كود التعقب"
                                value={orderdatas.product?.json.code || ""}
                              />
                              <InfoRow
                                label="طريقة التسليم"
                                value={
                                  orderdatas.product?.json
                                    .selectedrecipienttype || ""
                                }
                              />
                            </div>
                          </div>

                          {/* ملاحظات */}
                          {orderdatas.product?.json.anthornote && (
                            <div className="w-full mt-6 p-4 border rounded-lg bg-yellow-50 shadow-sm">
                              <h2 className="font-semibold text-yellow-700 mb-2">
                                ملاحظات إضافية
                              </h2>
                              <p className="text-gray-700">
                                {orderdatas.product?.json.anthornote}
                              </p>
                            </div>
                          )}
                        </div>
                      </>
                    />
                  </Button>
                  <Button className="h-[34px] w-[40px] p-3 bg-green-500 hover:bg-green-400 duration-700 cursor-pointer">
                    <DialogComponent
                      open={open2}
                      onOpenChange={setisopen2}
                      textButton={<Edit />}
                      classButton="bg-green-500 hover:bg-green-400 text-white hover:text-white cursor-pointer"
                      onclick={() => handleSubmit()}
                      onclickChange={(id) => getUpdate(order.order.json.id)}
                      children={
                        <>
                          <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg">
                            <h1 className="text-xl font-bold text-center">
                              تعديل المنتجات
                            </h1>

                            {/* ✅ جدول المنتجات */}
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="text-center">
                                    اسم المنتج
                                  </TableHead>
                                  <TableHead className="text-center">
                                    الكمية
                                  </TableHead>
                                  <TableHead className="text-center">
                                    السعر
                                  </TableHead>
                                  <TableHead className="text-center">
                                    الخصم
                                  </TableHead>
                                  <TableHead className="text-center">
                                    الإجمالي
                                  </TableHead>
                                  <TableHead className="text-center">
                                    حذف
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {products.map((p, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell className="text-center">
                                      <input
                                        type="text"
                                        value={p.item}
                                        onChange={(e) => {
                                          const newProducts = [...products];
                                          newProducts[idx].item =
                                            e.target.value;
                                          setProducts(newProducts);
                                        }}
                                        className="border rounded px-2 py-1 w-full"
                                      />
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <input
                                        type="number"
                                        value={p.amount}
                                        onChange={(e) => {
                                          const newProducts = [...products];
                                          newProducts[idx].amount =
                                            parseInt(e.target.value) || 1;
                                          newProducts[idx].total =
                                            newProducts[idx].amount *
                                              newProducts[idx].price -
                                            newProducts[idx].discount;
                                          setProducts(newProducts);
                                        }}
                                        className="border rounded px-2 py-1 w-20 text-center"
                                      />
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <input
                                        type="number"
                                        value={p.price}
                                        onChange={(e) => {
                                          const newProducts = [...products];
                                          newProducts[idx].price =
                                            parseFloat(e.target.value) || 0;
                                          newProducts[idx].total =
                                            newProducts[idx].amount *
                                              newProducts[idx].price -
                                            newProducts[idx].discount;
                                          setProducts(newProducts);
                                        }}
                                        className="border rounded px-2 py-1 w-20 text-center"
                                      />
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <input
                                        type="number"
                                        value={p.discount}
                                        onChange={(e) => {
                                          const newProducts = [...products];
                                          newProducts[idx].discount =
                                            parseFloat(e.target.value) || 0;
                                          newProducts[idx].total =
                                            newProducts[idx].amount *
                                              newProducts[idx].price -
                                            newProducts[idx].discount;
                                          setProducts(newProducts);
                                        }}
                                        className="border rounded px-2 py-1 w-20 text-center"
                                      />
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {p.total}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Button
                                        className="bg-red-500 hover:bg-red-400 text-white p-2 rounded"
                                        onClick={() => {
                                          const newProducts = products.filter(
                                            (_, i) => i !== idx
                                          );
                                          setProducts(newProducts);
                                        }}
                                      >
                                        حذف
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>

                            {/* ✅ زر إضافة منتج جديد */}
                            <div className="flex justify-center mt-4">
                              <Button
                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={() =>
                                  setProducts([
                                    ...products,
                                    {
                                      item: "",
                                      amount: 1,
                                      price: 0,
                                      discount: 0,
                                      total: 0,
                                    },
                                  ])
                                }
                              >
                                + إضافة منتج
                              </Button>
                            </div>

                            {/* ✅ حفظ التعديلات */}
                            <div className="flex justify-end mt-4">
                              <Button
                                className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded"
                                onClick={() => {
                                  console.log("تم تحديث المنتجات", products);
                                  // هنا بتحط fetch أو API لحفظ التعديلات
                                }}
                              >
                                حفظ التعديلات
                              </Button>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="customerName">اسم الزبون</Label>
                              <Input
                                id="customerName"
                                value={customerName}
                                onChange={(e) =>
                                  setCustomerName(e.target.value)
                                }
                                placeholder="اكتب اسم الزبون"
                              />
                            </div>

                            {/* اسم المستلم */}
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="recipientName">اسم المستلم</Label>
                              <Input
                                id="recipientName"
                                value={recipientName}
                                onChange={(e) =>
                                  setRecipientName(e.target.value)
                                }
                                placeholder="اكتب اسم المستلم"
                              />
                            </div>

                            {/* هاتف المستلم */}
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="recipientPhone">
                                هاتف المستلم
                              </Label>
                              <Input
                                id="recipientPhone"
                                type="tel"
                                value={recipientPhone}
                                onChange={(e) =>
                                  setRecipientPhone(e.target.value)
                                }
                                placeholder="اكتب رقم الهاتف"
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <Label htmlFor="recipientPhone">البلد</Label>
                              <SelectDynamic
                                items={countrylist}
                                value={country}
                                onChange={setcountry}
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <Label htmlFor="recipientPhone">
                                طريقة الدفع
                              </Label>
                              <SelectDynamic
                                items={paytype}
                                value={selectedpaytype}
                                onChange={setselectedpaytype}
                              />
                            </div>

                            {/* المدينة */}
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="city">المدينة</Label>
                              <Input
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="اكتب اسم المدينة"
                              />
                            </div>

                            {/* العنوان */}
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="address">العنوان</Label>
                              <Input
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="اكتب العنوان"
                              />
                            </div>
                            <div className="flex flex-col gap-3">
                              <Label>ملاحظة المستلم</Label>
                              <Input
                                value={recipientNote}
                                onChange={(e) =>
                                  setRecipientNote(e.target.value)
                                }
                              />
                            </div>

                            <div className="flex flex-col gap-3">
                              <Label>الخريطة</Label>
                              <Input
                                value={map}
                                onChange={(e) => setMap(e.target.value)}
                              />
                            </div>

                            <div className="flex flex-col gap-3">
                              <Label>اسم الشركة</Label>
                              <Input
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                              />
                            </div>

                            <div className="flex flex-col gap-3">
                              <Label>الكود</Label>
                              <Input
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                              />
                            </div>

                            <div className="flex flex-col gap-3">
                              <Label>نوع التوصيل</Label>
                              <SelectDynamic
                                items={recipienttypelist}
                                value={selectedRecipientType}
                                onChange={setSelectedRecipientType}
                              />
                            </div>

                            <div className="flex flex-col gap-3">
                              <Label>ملاحظة إضافية</Label>
                              <Input
                                value={anthorNote}
                                onChange={(e) => setAnthorNote(e.target.value)}
                              />
                            </div>
                          </div>
                        </>
                      }
                    />
                  </Button>
                  <Button
                    onClick={() => deleteorder(order.order.json.id)}
                    className="h-[34px] w-[40px] p-3 bg-red-500 hover:bg-red-400 duration-700 cursor-pointer mr-[-8px]"
                  >
                    <Edit />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="">
            <TableCell className="text-center" colSpan={12}>
              مجموع : {data.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
