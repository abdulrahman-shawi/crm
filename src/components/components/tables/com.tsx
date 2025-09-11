'use client';

import { useUser } from '@/utils/sys';
import { useState, useEffect } from 'react';

// 1️⃣ تعريف أنواع الـ Module وAction
interface Module {
  key: string;
  label: string;
}

interface Action {
  key: string;
  label: string;
}

// 2️⃣ نوع Permissions
type PermissionsType = Record<string, Record<string, boolean>>;

// 3️⃣ دالة إنشاء الحالة الابتدائية
const getInitialPermissions = (modules: Module[], actions: Action[]): PermissionsType => {
  const initialState: PermissionsType = {};
  modules.forEach(module => {
    initialState[module.key] = {};
    actions.forEach(action => {
      initialState[module.key][action.key] = false;
    });
  });
  return initialState;
};

export default function PermissionsTutorial() {
  const modules: Module[] = [
    { key: 'products', label: 'المنتجات' },
    { key: 'invoices', label: 'الفواتير' },
    { key: 'clients', label: 'العملاء' },
    { key: 'calnder', label: 'تقويم العملاء' },
    { key: 'order', label: 'الطلبات' },
    { key: 'empolyee', label: 'الموظفين' },
    { key: 'expences', label: 'المصروفات' },
    { key: 'setting', label: 'إحصائيات النظام' },
    { key: 'categories', label: 'تصنيف المنتجات' },
  ];

  const actions: Action[] = [
    { key: 'view', label: 'مشاهدة' },
    { key: 'add', label: 'إضافة' },
    { key: 'edit', label: 'تعديل' },
    { key: 'delete', label: 'حذف' },
  ];

  const { ID } = useUser();

  // ✅ state الأساسي
  const [permissions, setPermissions] = useState<PermissionsType>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('permissions');
      return saved ? JSON.parse(saved) : getInitialPermissions(modules, actions);
    }
    return getInitialPermissions(modules, actions);
  });

  // ✅ مزامنة state مع sessionStorage
  useEffect(() => {
    sessionStorage.setItem('permissions', JSON.stringify(permissions));
  }, [permissions]);

  // ✅ إرسال الصلاحيات
  const handsub = async () => {
    const formdata = { permissions, ID };
    try {
      const res = await fetch(
        'http://localhost:5678/webhook-test/5134016c-87e8-4b2d-becb-62e0f2ebafc1',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formdata),
        }
      );
      const data = await res.json();
      alert('✅ تم إرسال الصلاحيات بنجاح!');
      console.log('الرد من n8n:', data);
    } catch (err) {
      alert('❌ فشل الاتصال بـ n8n');
      console.error(err);
    }
  };

  // ✅ إعادة تعيين
  const resetPermissions = () => {
    const initial = getInitialPermissions(modules, actions);
    setPermissions(initial);
    sessionStorage.setItem('permissions', JSON.stringify(initial));
  };

  // ✅ تغيير قيمة checkbox
  const handleSingleCheckboxChange = (moduleKey: string, actionKey: string) => {
    setPermissions(prev => ({
      ...prev,
      [moduleKey]: {
        ...prev[moduleKey],
        [actionKey]: !prev[moduleKey][actionKey],
      },
    }));
  };

  return (
    <div className="p-8 font-sans bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">جدول الصلاحيات</h1>

      <table className="min-w-full bg-white rounded-lg shadow text-right">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 font-semibold">الصلاحية</th>
            {actions.map(action_item => (
              <th key={action_item.key} className="p-4 font-semibold text-center">
                {action_item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {modules.map(module_item => (
            <tr key={module_item.key} className="hover:bg-gray-50 border-b">
              <td className="p-4 font-medium">{module_item.label}</td>
              {actions.map(action_item => (
                <td key={action_item.key} className="p-4 text-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={permissions[module_item.key]?.[action_item.key] || false}
                    onChange={() => handleSingleCheckboxChange(module_item.key, action_item.key)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
