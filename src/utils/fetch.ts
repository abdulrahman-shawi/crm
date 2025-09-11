// utils/fetch.ts

/**
 * دالة عامة (Generic) لجلب البيانات باستخدام GET.
 * تستخدم Generics <T> لجعلها قابلة للعمل مع أي نوع من البيانات.
 *
 * @template T - نوع البيانات المتوقع إرجاعه من الـ API.
 * @param {string} url - الرابط (Endpoint) الذي سيتم جلب البيانات منه.
 * @returns {Promise<T>} - وعد (Promise) يحتوي على البيانات بالنوع المحدد T.
 * @throws {Error} - يرمي خطأ في حال فشل الطلب أو إذا لم تكن الاستجابة ناجحة (not ok).
 */
export async function fetchGetData<T>(url: string): Promise<T> {
  try {
    // 1. إرسال طلب GET إلى الرابط المحدد.
    // await: تنتظر حتى تكتمل عملية الـ fetch وترجع الـ Response.
    const response = await fetch(url, {
      // Next.js يضيف ميزات قوية للتحكم في الـ Caching
      // 'no-store': يضمن جلب بيانات جديدة في كل مرة (مناسب للبيانات المتغيرة).
      // next: { revalidate: 3600 }: لتحديث البيانات كل ساعة (Incremental Static Regeneration).
      cache: 'no-store', 
    });

    // 2. التحقق مما إذا كان الطلب ناجحًا.
    // response.ok تكون true إذا كان status code بين 200-299.
    if (!response.ok) {
      // إذا فشل الطلب، نرمي خطأ يحتوي على رسالة توضيحية.
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 3. تحويل الاستجابة من صيغة JSON إلى كائن JavaScript.
    // await response.json(): تنتظر حتى يتم تحليل الـ JSON.
    const data: T = await response.json();

    // 4. إرجاع البيانات بعد نجاح العملية.
    return data;

  } catch (error) {
    // 5. في حال حدوث أي خطأ في الشبكة أو في الخطوات السابقة.
    console.error("Fetching data failed:", error);
    // نرمي الخطأ مجددًا لكي يتمكن الـ Component الذي استدعى الدالة من معالجته.
    throw error;
  }
}

/**
 * دالة عامة (Generic) لإرسال البيانات باستخدام POST.
 *
 * @template T - نوع البيانات المتوقع إرجاعه من الـ API بعد نجاح العملية.
 * @template B - نوع البيانات (Body) التي يتم إرسالها في الطلب.
 * @param {string} url - الرابط (Endpoint) الذي سيتم إرسال البيانات إليه.
 * @param {B} body - البيانات التي سيتم إرسالها في جسم الطلب (Request Body).
 * @returns {Promise<T>} - وعد (Promise) يحتوي على استجابة الـ API بالنوع T.
 * @throws {Error} - يرمي خطأ في حال فشل الطلب.
 */
export async function fetchPostData<T, B>(url: string, body: B): Promise<T> {
  try {
    // 1. إرسال طلب POST إلى الرابط المحدد.
    const response = await fetch(url, {
      method: 'POST', // تحديد نوع الطلب
      headers: {
        // نُخبر السيرفر أننا نرسل بيانات بصيغة JSON.
        'Content-Type': 'application/json',
      },
      // 2. تحويل كائن JavaScript إلى نص JSON لإرساله في جسم الطلب.
      body: JSON.stringify(body),
    });

    // 3. التحقق من نجاح الطلب.
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 4. تحليل الاستجابة من صيغة JSON.
    const data: T = await response.json();

    // 5. إرجاع البيانات من السيرفر (مثل المنتج الجديد الذي تم إنشاؤه مع الـ ID).
    return data;

  } catch (error) {
    console.error("Posting data failed:", error);
    // نرمي الخطأ لمعالجته في الـ Component.
    throw error;
  }
}