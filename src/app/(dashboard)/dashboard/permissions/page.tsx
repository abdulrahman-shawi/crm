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

export default function PermissionsPage() {

  interface PermissionItem {
  id: string;
  user_id: string;
  permission: Record<string, Record<string, boolean>>; // أو أي شكل مطابق للـ API
}


  const [permissionsData, setPermissionsData] = useState<PermissionItem[]>([]);
  const [name, setName] = useState("");
  const [editPermissions, setEditPermissions] = useState(null);

  // فصل حالة كل Dialog
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // جلب البيانات
  useEffect(() => {
    fetch("http://localhost:5678/webhook/9b66b8cf-e918-4450-851d-781d6a1af73f")
      .then((res) => res.json())
      .then((data) => setPermissionsData(data))
      .catch((err) => console.error(err));
  }, []);

  // إرسال إضافة صلاحية
  const handleAdd = () => {
    const savedPermissions = sessionStorage.getItem("permissions");
    const permissions = savedPermissions ? JSON.parse(savedPermissions) : {};
    const formdata = { permissions, name };

    fetch(
      "http://localhost:5678/webhook/5134016c-87e8-4b2d-becb-62e0f2ebafc1",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        alert("✅ تم إرسال الصلاحيات بنجاح!");
        console.log("الرد من n8n:", data);
        setIsAddOpen(false);
      })
      .catch((err) => {
        alert("❌ فشل الاتصال بـ n8n");
        console.error(err);
      });
  };

  // إرسال تعديل صلاحية
  const handleEdit = () => {
    const formdata = { permissions: editPermissions, name };
    fetch("http://localhost:5678/webhook/5134016c-87e8-4b2d-becb-62e0f2ebafc1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("✅ تم تعديل الصلاحية بنجاح!");
        console.log("الرد من n8n:", data);
        setIsEditOpen(false);
      })
      .catch((err) => {
        alert("❌ فشل الاتصال بـ n8n");
        console.error(err);
      });
  };

  // فتح Dialog التعديل وجلب البيانات
  const openEditDialog = (id: string) => {
    fetch(`http://localhost:5678/webhook/538fccf7-4672-46ef-b3f2-13aa83bf0a90?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data[0]?.permission) {
          setEditPermissions(data[0].permission);
          setName(data[0].user_id);
          setIsEditOpen(true);
        }
      })
      .catch((err) => console.error("فشل جلب بيانات التعديل:", err));
  };

  // محتوى Dialog الإضافة
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

  // محتوى Dialog التعديل
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
        initialPermissions={editPermissions}
        setEditPermissions={setEditPermissions}
      />
    </div>
  );

  return (
    <div>
      {/* Header */}
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

      {/* جدول الصلاحيات */}
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
