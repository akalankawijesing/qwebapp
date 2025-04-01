import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrendingArea from "@/components/TrendingArea";


export default function Home() {
  return (<>
    <div className="relative min-h-188 bg-cover bg-center bg-no-repeat bg-[url(https://classic2.listingprowp.com/wp-content/uploads/2023/08/lp-classic2-hero-v2-opt-e1693317712383.png)] overflow-hidden">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/72 via-black/40 to-black/60" />
      <div className="relative z-10">
        <Navigation />
        <Hero />
      </div>
    </div>
    <TrendingArea />
    </>
  );
}
