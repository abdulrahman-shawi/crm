'use client';

import { BreadcrumbDemo } from '@/components/components/barcom';
import React, { useEffect, useState } from 'react';

export default function MessagePage() {
  const [data, setData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");

  useEffect(() => {
    fetch(`http://localhost:5678/webhook/e5795f9c-853c-4063-ade0-e535be7be054`)
      .then(res => res.json())
      .then(data => {
        setData(data);
      });
  }, []);

  // فلترة البيانات حسب التاريخ والاسم
  const filteredData = data.filter((e) => {
    const meetDate = e.calnder?.json?.meet_date
      ? new Date(e.calnder.json.meet_date).toLocaleDateString("en-CA")
      : "";

    const matchDate = selectedDate ? meetDate === selectedDate : true;
    const matchName = searchName
      ? e.customer_name?.toLowerCase().includes(searchName.toLowerCase())
      : true;

    return matchDate && matchName;
  });

  return (
    <div className="relative top-[-27px]">
      <div className="shadow py-4 px-7">
        <BreadcrumbDemo linkpage="المنتجات" />
      </div>
       
      {/* أدوات البحث */}
      <div className="flex flex-col gap-4 mx-5">
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* اختيار اليوم */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">اختر التاريخ</label>
          <input
            type="date"
            className="border rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-green-300 w-full"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* البحث بالاسم */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">ابحث بالاسم</label>
          <input
            type="text"
            placeholder="اكتب اسم العميل..."
            className="border rounded-lg px-3 py-2 shadow-sm focus:ring focus:ring-blue-300 w-full"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
      </div>

      {/* عرض العملاء */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredData.map((e, i) => {
          const code = e.cusomer_code.replace('+', '');
          const phone = e.cusomer_phone;
          const whatsappLink = `https://wa.me/${code}${phone}`;

          const meetDate = e.calnder?.json?.meet_date
            ? new Date(e.calnder.json.meet_date).toLocaleString("ar-EG", {
                dateStyle: "long",
                timeStyle: "short",
              })
            : "بدون موعد";

          return (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
            >
              <h1 className="text-lg font-bold text-gray-800">{e.customer_name}</h1>
              <p className="text-sm text-gray-500 mt-1">
                {e.cusomer_code} {e.cusomer_phone}
              </p>
              <p className="text-sm text-gray-600 mt-2">{meetDate}</p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2 transition"
              >
                <span>واتساب</span>
              </a>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}
