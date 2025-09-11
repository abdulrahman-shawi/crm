'use client';

import { useState, useEffect } from 'react';

// تعريف الأنواع
interface Module {
  key: string;
  label: string;
}

interface Action {
  key: string;
  label: string;
}

type PermissionsType = Record<string, Record<string, boolean>>;

interface PermissionsTutorialEditProps {
  initialPermissions: PermissionsType | null;
  setEditPermissions: (permissions: PermissionsType) => void;
}

// دالة إنشاء الحالة الابتدائية
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

export default function PermissionsTutorialEdit({ initialPermissions, setEditPermissions }: PermissionsTutorialEditProps) {
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

  const [permissions, setPermissions] = useState<PermissionsType>(
    initialPermissions || getInitialPermissions(modules, actions)
  );

  // ✅ تحديث الـ state عند وصول بيانات جديدة من الأب
  useEffect(() => {
    if (initialPermissions) {
      setPermissions(initialPermissions);
    }
  }, [initialPermissions]);

  // ✅ تغيير قيمة checkbox
  const handleSingleCheckboxChange = (moduleKey: string, actionKey: string) => {
    const updated: PermissionsType = {
      ...permissions,
      [moduleKey]: {
        ...permissions[moduleKey],
        [actionKey]: !permissions[moduleKey][actionKey],
      },
    };
    setPermissions(updated);
    setEditPermissions(updated); // ✅ نحدث الأب أيضاً
  };

  return (
    <div className="p-4 font-sans bg-gray-50">
      <h1 className="text-xl font-bold mb-4 text-gray-800">تعديل الصلاحيات</h1>

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
                    className="h-4 w-4"
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
