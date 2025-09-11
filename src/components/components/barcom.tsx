'use client';

import React from 'react';
import Link from "next/link";

import {
 Breadcrumb,
 BreadcrumbItem,
 BreadcrumbLink,
 BreadcrumbList,
 BreadcrumbPage,
 BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Interface for component props with correct primitive types (string, not String)
interface Props {
  linktitle?: string;
  linkhref?: string;
  linkpage?: string;
}

export function BreadcrumbDemo({ linktitle, linkhref, linkpage }: Props) {
 return (
  <Breadcrumb>
   <BreadcrumbList>
    {/* 1. The base link, always visible */}
    <BreadcrumbItem>
     <BreadcrumbLink asChild>
      <Link href="/dashboard">لوحة التحكم</Link>
     </BreadcrumbLink>
</BreadcrumbItem>

 {/* 2. Conditionally render the intermediate link ONLY if linktitle and linkhref are provided */}
         {linktitle && linkhref && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={linkhref}>{linktitle}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}

        {/* 3. Conditionally render the final page name */}
        {linkpage && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{linkpage}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
   </BreadcrumbList>
  </Breadcrumb>
 );
}