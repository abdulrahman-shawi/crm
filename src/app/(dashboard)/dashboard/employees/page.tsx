'use client';

import { BreadcrumbDemo } from '@/components/components/barcom';
import { DialogComponent } from '@/components/components/dialog';
import SelectDynamic from '@/components/components/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React, { useEffect, useState } from 'react';

export default function EmployeePage() {
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [phone , setPhone] = useState(Number)
    const [job , setJob] = useState("")
    const [account , setAccount] = useState("")
    const [selectpermission , setSelectPermission] = useState("")
    const [permission, setpermisstion] = useState<any[]>([{ user_id: "اسم المنتج" }]);
    const [permissiondata, setpermisstiondata] = useState<any[]>([]);
    const [employeedata, setEmployeedata] = useState<any[]>([]);
    const [password , setPassword] = useState("")
    const [isAddOpen, setIsAddOpen] = useState(false);

    const permissionList = [
        "الصلاحية",
        ...permissiondata.map((e) => e.user_id)
    ]

    
    const typeList = ["أدمن" , "موظف"]

    const [type , setType] = useState(typeList[0])

    const haundleSetTypeChange = (val:string) => {
        setType(val)
    }
    const haundleSetPermissionChange = (val:string) => {
        setSelectPermission(val)
    }

    const addDialogContent = (
        <div>
            <div className="flex flex-col gap-3">
                <Label>اسم الموظف</Label>
                <Input type='text' value={name} onChange={(e) => setName(e.target.value)} className='p-3 border border-gray-200 rounded-xl' />
            </div>
            <div className="flex flex-col gap-3 mt-4">
                <Label>البريد الالكتروني</Label>
                <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='p-3 border border-gray-200 rounded-xl' />
            </div>
            <div className="flex flex-col gap-3 mt-4">
                <Label>رقم الهاتف</Label>
                <Input type='tel' value={phone} onChange={(e) => setPhone(Number(e.target.value))} className='p-3 border border-gray-200 rounded-xl' />
            </div>
            <div className="flex flex-col gap-3 mt-4">
                <Label>اسم الوظيفة</Label>
                <Input type='text' value={job} onChange={(e) => setJob(e.target.value)} className='p-3 border border-gray-200 rounded-xl' />
            </div>
            <div className="flex flex-col gap-3 mt-4">
                <Label>نوع الوظيفة</Label>
                <SelectDynamic items={typeList} onChange={haundleSetTypeChange} value={type} />
            </div>
            <div className="flex flex-col gap-3 mt-4">
                <Label>كلمة السر</Label>
                <Input type='text' value={password} onChange={(e) => setPassword(e.target.value)} className='p-3 border border-gray-200 rounded-xl' />
            </div>
             <div className="flex flex-col gap-3 mt-4">
                <Label>الصلاحية</Label>
                <SelectDynamic placeholder='الصلاحية' items={permissionList} onChange={haundleSetPermissionChange} value={selectpermission} />
            </div>
        </div>
    )

    const handleAdd = () => {
        const formdata = {
            name,
            email,
            phone,
            job,
            type,
            password,
            selectpermission
        }

        fetch("http://localhost:5678/webhook/004001bf-2fb1-4b7e-a4de-e2adb189c27a",{
            method:"POST",
            headers:{"content-type" : "application/json"},
            body:JSON.stringify(formdata)
        })
        .then(() => {
            setIsAddOpen(false)
            fetchEmployees()
        })
    }

    const handleEdit = (id:string) => {
        fetch(`http://localhost:5678/webhook/3dad3db0-4e37-4dc2-95f5-1019355128f5?id=${id}&data=edit`)

    }
    const handleDelete = (id:string) => {
        fetch(`http://localhost:5678/webhook/3dad3db0-4e37-4dc2-95f5-1019355128f5?id=${id}&data=del`)
        setEmployeedata(prev => prev.filter(emp => emp.id !== id)) // تحديث الجدول محلياً
    }

    const fetchEmployees = () => {
  fetch("http://localhost:5678/webhook/9fa7b1be-7ae8-4f5c-8c37-b7155a060240")
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setEmployeedata(data)
    })
}


    useEffect(() => {

        fetchEmployees()

        fetch('http://localhost:5678/webhook/9b66b8cf-e918-4450-851d-781d6a1af73f')
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
            setpermisstiondata(data)
            console.log(permissiondata)
            setpermisstion((prev) => {
          const merged = [...prev, ...data];
          return merged.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.user_id === item.user_id)
          );
        });
        })
    } , [])
  return (
    <div>
              <div className="relative top-[-27px]">
                <div className="flex shadow py-4 px-7 items-center justify-between">
                  <BreadcrumbDemo linkpage="الموظفين" />
                  <DialogComponent
                    open={isAddOpen}
                    onOpenChange={setIsAddOpen}
                    onclick={handleAdd}
                    textButton="اضافة موظف"
                    children={addDialogContent}
                  />
                </div>
              </div>
      <div className="">
       <Table className="w-full border">
      <TableCaption>قائمة الموظفين</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center border-l-2 border-gray-100">الاسم</TableHead>
          <TableHead className="text-center border-l-2 border-gray-100">البريد الإلكتروني</TableHead>
          <TableHead className="text-center border-l-2 border-gray-100">الوظيفة</TableHead>
          <TableHead className="text-center border-l-2 border-gray-100">النوع</TableHead>
          <TableHead className="text-center border-l-2 border-gray-100">الصلاحية</TableHead>
          <TableHead className="text-center border-l-2 border-gray-100">رقم الهاتف</TableHead>
          <TableHead className="text-center border-l-2 border-gray-100">العمليات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employeedata.map((emp, index) => (
          <TableRow key={index}>
            <TableCell className="text-center border-l-2 border-gray-100">{emp.name}</TableCell>
            <TableCell className="text-center border-l-2 border-gray-100">{emp.email}</TableCell>
            <TableCell className="text-center border-l-2 border-gray-100">{emp.job ?? "-"}</TableCell>
            <TableCell className="text-center border-l-2 border-gray-100">{emp.type ?? "-"}</TableCell>
            <TableCell className="text-center border-l-2 border-gray-100">{emp.permisson ?? "-"}</TableCell>
            <TableCell className="text-center border-l-2 border-gray-100">{emp.phone ?? "-"}</TableCell>
            <TableCell className="text-center border-l-2 border-gray-100">
              <div className="flex items-center justify-center gap-3">
                <Button 
                  className="p-2 rounded bg-green-600 hover:bg-green-500 text-white duration-300"
                >
                  تعديل
                </Button>
                <Button 
                  onClick={() => handleDelete(emp.id)} 
                  className="p-2 rounded bg-red-600 hover:bg-red-500 text-white duration-300"
                >
                  حذف
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-center" colSpan={8}>
            مجموع الموظفين: {employeedata.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
      </div>
    </div>
  );
}