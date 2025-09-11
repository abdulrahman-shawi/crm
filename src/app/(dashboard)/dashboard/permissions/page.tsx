"use client";

import { BreadcrumbDemo } from "@/components/components/barcom";
import { DialogComponent } from "@/components/components/dialog";
import PermissionsTutorial from "@/components/components/tables/com";
import PermissionsTutorialEdit from "@/components/components/tables/comedit";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 1. تعريف نوع بيانات الصلاحيات
interface PermissionItem {
  id: string;
  user_id: string;
  permission: Record<string, Record<string, boolean>>;
}

export default function PermissionsPage() {
  // 2. الحالات
  const [permissionsData, setPermissionsData] = useState<PermissionItem[]>([]);
  const [name, setName] = useState<string>("");
  const [editPermissions, setEditPermissions] = useState<Record<string, Record<string, boolean>> | null>(null);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  // 3. جلب البيانات
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5678/webhook/9b66b8cf-e918-4450-851d-781d6a1af73f");
        const data: PermissionItem[] = await res.json();
        setPermissionsData(data);
      } catch (err) {
        console.error("Failed to fetch permissions:", err);
      }
    };
    fetchData();
  }, []);

  // 4. إضافة صلاحية
  const handleAdd = async () => {
    const savedPermissions = sessionStorage.getItem("permissions");
    const permissions = savedPermissions ? JSON.parse(savedPermissions) : {};
    const formdata = { permissions, name };

    try {
      const res = await fetch("http://localhost:5678/webhook/5134016c-87e8-4b2d-becb-62e0f2ebafc1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      alert("✅ تم إرسال الصلاحيات بنجاح!");
      console.log("الرد من n8n:", data);
      setIsAddOpen(false);
    } catch (err) {
      alert("❌ فشل الاتصال بـ n8n");
      console.error(err);
    }
  };

  // 5. تعديل صلاحية
  const handleEdit = async () => {
    if (!editPermissions) return;
    const formdata = { permissions: editPermissions, name };

    try {
      const res = await fetch("http://localhost:5678/webhook/5134016c-87e8-4b2d-becb-62e0f2ebafc1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      alert("✅ تم تعديل الصلاحية بنجاح!");
      console.log("الرد من n8n:", data);
      setIsEditOpen(false);
    } catch (err) {
      alert("❌ فشل الاتصال بـ n8n");
      console.error(err);
    }
  };

  // 6. فتح Dialog التعديل
  const openEditDialog = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5678/webhook/538fccf7-4672-46ef-b3f2-13aa83bf0a90?id=${id}`);
      const data: PermissionItem[] = await res.json();
      if (data && data[0]?.permission) {
        setEditPermissions(data[0].permission);
        setName(data[0].user_id);
        setIsEditOpen(true);
      }
    } catch (err) {
      console.error("فشل جلب بيانات التعديل:", err);
    }
  };

  // 7. محتوى Dialog الإضافة
  const addDialogContent = (
    <div>
      <div className="flex flex-col gap-4 mb-4">
        <label htmlFor="name">اسم الصلاحية</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2"
        />
      </div>
      <PermissionsTutorial />
    </div>
  );

  // 8. محتوى Dialog التعديل
  const editDialogContent = (
    <div>
      <div className="flex flex-col gap-4 mb-4">
        <label htmlFor="name">اسم الصلاحية</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2"
        />
      </div>
      <PermissionsTutorialEdit
        initialPermissions={editPermissions ?? {}}
        setEditPermissions={setEditPermissions}
      />
    </div>
  );

  // 9. عرض الجدول
  return (
    <div>
      <div className="relative top-[-27px]">
        <div className="flex shadow py-4 px-7 items-center justify-between">
          <BreadcrumbDemo linkpage="الصلاحيات" />
          <DialogComponent
            open={isAddOpen}
            onOpenChange={setIsAddOpen}
            onclick={handleAdd}
            textButton="اضافة صلاحية"
            children={addDialogContent}
          />
        </div>
      </div>

      <div>
        <Table>
          <TableCaption>قائمة بصلاحيات المستخدمين.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">اسم الصلاحية</TableHead>
              <TableHead className="text-right">عدد الصلاحيات</TableHead>
              <TableHead className="text-right">العمليات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissionsData.map((item, index) => {
              const trueCount = Object.values(item.permission)
                .flatMap((module) => Object.values(module))
                .filter((val) => val === true).length;

              return (
                <TableRow key={item.user_id || index}>
                  <TableCell className="font-medium">{item.user_id}</TableCell>
                  <TableCell>{trueCount}</TableCell>
                  <TableCell>
                    <DialogComponent
                      open={isEditOpen}
                      onOpenChange={setIsEditOpen}
                      onclick={handleEdit}
                      textButton="تعديل صلاحية"
                      children={editDialogContent}
                      onclickChange={() => openEditDialog(item.id)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
