import SearchItem from "@/components/SearchItem"
export default function Hero() {
  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-white">
          Explore Your City
          {/* <br />
          <span className="text-gray-400">for your teams</span>
   */}
        </h1>
        <p className="max-w-full mx-auto text-lg sm:text-xl text-gray-400 mb-10">
        Let&apos;s uncover the best places to eat, drink, and shop nearest to you.
        </p>
            <div className="max-w-full mx-auto text-lg sm:text-xl text-gray-400 mb-10">
            <SearchItem />
            </div>
      </div>
    </div>
  );
}
