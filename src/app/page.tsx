"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
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

  return <div>Loading...</div>;
}
