// app/(public)/page.tsx
//import Link from "next/link";
import prisma from "@/lib/prisma";
import BusinessCard  from "@/components/BusinessCard";

export default async function TrendingArea() {
  // Fetch trending businesses (example: highest rated)
  const trendingBusinesses = await prisma.business.findMany({
    take: 6,
    include: {
      reviews: true,
      categories: true,
    },
    orderBy: {
      reviews: {
        _count: "desc",
      },
    },
  });

  console.log("Trending Businesses:", trendingBusinesses);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section 
      <div className="bg-blue-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">
            Discover Local Businesses
          </h1>
          
          /* Search Bar *
          <form action="/search" className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                name="q"
                placeholder="Search for restaurants, shops, services..."
                className="flex-1 rounded-lg px-6 py-4 text-gray-900"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 px-8 py-4 rounded-lg font-semibold"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      */}
      {/* Trending Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Trending in Your Area
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </div>
    </div>
  );
}