"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

export default function Component() {
  const [open, setOpen] = useState(false);

  return (
    <div className="px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full items-center justify-between">
        {/* Logo */}
        <Link href="#" className="text-2xl font-bold text-red-500  w-md">
          Qweb.lk
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 ">
          {["Home", "About", "Cars", "Portfolio", "Contact"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-gray-700 text-white font-bold hover:text-red-800 transition-colors"
              prefetch={false}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex gap-2">
          <Button variant="outline">Sign in</Button>
          <Button>Sign Up</Button>
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-6">
            <div className="flex justify-between items-center">
              <Link href="#" className="text-xl font-bold text-red-500">
                Qweb.lk
              </Link>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            <nav className="mt-6 flex flex-col gap-4">
              {["Home", "About", "Cars", "Portfolio", "Contact"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-red-500 transition-colors"
                  prefetch={false}
                  onClick={() => setOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-2">
              <Button variant="outline">Sign in</Button>
              <Button>Sign Up</Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
}
