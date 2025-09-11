"use client";

import PermissionsTable from "@/components/components/tables/com";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  
  return (
    <div className="relative top-0 px-7">
      <div className="flex items-center ">
        {/* <Image src="/public/ChatGPT Image Aug 19, 2025, 10_15_32 PM.png" alt='crm' /> */}
         <PermissionsTable />
      </div>
    </div>
  );
}
