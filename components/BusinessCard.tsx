// components/business-card.tsx
import Link from "next/link";
import Image from "next/image";

interface BusinessCardProps {
  business: {
    id: string;
    name: string;
    description: string | null;
    categories: Array<{ name: string }>;
    reviews: Array<{ rating: number }>;
  };
}

export default function BusinessCard({ business }: BusinessCardProps) {
  const avgRating = business.reviews.length > 0 
    ? (business.reviews.reduce((sum, review) => sum + review.rating, 0) / business.reviews.length).toFixed(1)
    : "New";

  return (
    <Link
      href={`/business/${business.id}`}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="p-6">
        {/* Business Image */}
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
          <Image
            src="/placeholder.jpg" // Replace with actual image URL
            alt={business.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Business Info */}
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold">{business.name}</h3>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {avgRating} ★
            </span>
          </div>

          <p className="text-gray-600 line-clamp-2">{business.description}</p>

          <div className="flex flex-wrap gap-2">
            {business.categories.map((category) => (
              <span
                key={category.name}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}