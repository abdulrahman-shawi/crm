import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconNode } from "lucide-react";
import React from "react";

export function DialogComponent({
  id,
  textButton,
  textTitle,
  textDescription,
  children,
  onclick,
  open,
  onOpenChange,
  onclickChange,
  classButton
}: {
  id?:string;
  textButton?: React.ReactNode;
  textTitle?: string;
  textDescription?: string;
  children?: React.ReactNode;
  onclick: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onclickChange?: (id:string) => void;
  classButton?:string;
}) {
  return (
     <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={() => onclickChange?.(id ?? "")} variant="outline" className={classButton}>{textButton}</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[1000px] max-h-[80vh] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()} 
        onEscapeKeyDown={(e) => e.preventDefault()} 
      >
        <DialogHeader>
          <DialogTitle>{textTitle}</DialogTitle>
          <DialogDescription>{textDescription}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">{children}</div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">إلغاء</Button>
          </DialogClose>
          <Button onClick={onclick} type="submit">حفظ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
