

export const fetchData = async (setData:any , id:string) => {
    try {
      const res = await fetch(
        "http://localhost:5678/webhook/74a413dc-6501-41ea-8200-a5536493430b",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: id }),
        }
      );

      if (!res.ok) throw new Error("خطأ في جلب البيانات");

      const result = await res.json();
      console.log("🚀 API Response:", result);

      setData(result);
    } catch (error) {
      console.error("❌ Fetch error:", error);
    }
  };


  
export const fetchItem = async (setData: any, setIsOpen: any) => {
  try {
    const res = await fetch(
      "http://localhost:5678/webhook/b8776e2c-e47f-4a40-bda0-81d8ce462038"
    );

    if (!res.ok) throw new Error("خطأ في جلب البيانات");

    // 👇 نقرأ الرد كنص أول
    const text = await res.text();

    // إذا الرد فاضي نرجع مصفوفة فاضية بدل ما نكسر
    if (!text) {
      console.warn("⚠ الرد فاضي من الـ API");
      setData([]);
      setIsOpen(false);
      return;
    }

    // نحوله JSON فقط لو فيه محتوى
    const result = JSON.parse(text);
    console.log("🚀 API Response:", result);

    setData(result);
    setIsOpen(false);
  } catch (error) {
    console.error("❌ Fetch error:", error);
  }
};

    export const fetchOrder = async (setData: any, setIsOpen: any) => {
 fetch("http://localhost:5678/webhook/c6669977-1e15-4cd9-812e-18643dea1cc5")
  .then(async (res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // جرّب تعمل text() عشان تتأكد إن فيه بيانات
    const text = await res.text();
    if (!text) {
      throw new Error("Empty response from server");
    }

    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("JSON Parse Error:", err, text);
      throw err;
    }
  })
  .then((data) => {
    console.log("data order:", data);
    setData(data);
    setIsOpen(false)
  })
  .catch((err) => {
    console.error("Fetch error:", err.message);
  });
};