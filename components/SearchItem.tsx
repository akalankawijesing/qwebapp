"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search as SearchIcon,
  Car,
  Hotel,
  Utensils,
  ShoppingBag,
  SprayCan,
} from "lucide-react";

export default function SearchItem() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6 space-y-4">
        {/* Search Box */}
        <div className="flex flex-wrap items-center bg-white shadow-md rounded-lg p-2 w-full max-w-3xl">
          <Input
            type="text"
            placeholder="Ex: food, service, barber, hotel"
            className="flex-1 px-4 py-2 border-none focus:ring-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Your City..."
            className="flex-1 px-4 py-2 border-none focus:ring-0"
          />
          <Button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white">
            <SearchIcon className="w-5 h-5" />
          </Button>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { name: "Automotive", icon: <Car className="w-6 h-6" /> },
            { name: "Beauty & Spa", icon: <SprayCan className="w-6 h-6" /> },
            { name: "Hotels", icon: <Hotel className="w-6 h-6" /> },
            { name: "Restaurant", icon: <Utensils className="w-6 h-6" /> },
            { name: "Shopping", icon: <ShoppingBag className="w-6 h-6" /> },
          ].map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="flex items-center gap-2 bg-gray-900/80 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-all"
            >
              {item.icon}
              {item.name}
            </Button>
          ))}
        </div>

        {/* Image Credit */}
        <p className="text-white text-sm mt-12">
          Image Courtesy Of{" "}
          <a href="#" className="font-bold underline">
            Seattle Opera
          </a>
        </p>
      </div>
    </>
  );
}
