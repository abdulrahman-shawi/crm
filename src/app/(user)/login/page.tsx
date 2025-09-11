"use client";

import { Input } from "@/components/ui/input";
import { Mail , Lock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Dashboard() {


    const route = useRouter()
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const auth = {
    key:"loged",
    email:email,
    createdAt: Date.now()
  }

  const onsubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // يمنع إعادة تحميل الصفحة
  try {
    const res = await fetch("http://localhost:5678/webhook/10201a29-68fb-4a64-b9ae-39bfc2772831", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      alert("خطأ في البريد الإلكتروني أو كلمة السر")
    } else {
        localStorage.setItem("auth_token" , JSON.stringify(auth))
        route.push("/dashboard")
      console.log("تم الإرسال بنجاح ✅");
    }
  } catch (err) {
    console.error("خطأ في الإرسال:", err);
  }
};

const router = useRouter();

  useEffect(() => {
    const key = "auth_token"; // اسم المتغير
    const data = localStorage.getItem(key);

    if (data) {
      try {
        const parsed = JSON.parse(data);
        console.log(parsed)
        const createdAt = parsed.createdAt;

        // تحقق من عمر التوكن (30 يوم = 2592000000 ms)
        if (Date.now() - createdAt > 30 * 24 * 60 * 60 * 1000) {
          localStorage.removeItem(key);
          router.push("/login");
        } else {
          router.push("/dashboard");
        }
      } catch (e) {
        localStorage.removeItem(key);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="grid grid-cols-1 w-screen h-screen gap-4 p-2 items-center">
      <div className="flex items-center justify-center">
        <Image
          src="/skyno-a779f7fb.jpg"
          alt="crm"
          width={250}
          height={250}
          style={{ borderRadius:"20px" }}
        />
      </div>
      <div className="flex items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-bold text-primary/50">تسجيل الدخول</h2>
        <form onSubmit={onsubmit} className="w-[25%] mx-auto flex flex-col gap-4">
          <div className="relative text-right">
            <Mail className="absolute text-right right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pr-10 pl-3 py-4 text-right border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* حقل كلمة السر */}
      <div className="relative text-right">
        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="password"
          placeholder="كلمة السر"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pr-10 pl-3 py-4 text-right border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <input type="submit" value="ارسال" className="w-full bg-blue-600 hover:bg-blue-500 rounded-xl duration-700 text-white cursor-pointer p-3 " />
        </form>
      </div>
    </div>
  );
}
