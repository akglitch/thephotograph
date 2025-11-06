import Image from "next/image";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import StatsSection from "./components/StatsSection";


export default function Home() {
  return (
    <div className="">
      <Hero />
      <StatsSection />
      <Gallery />
      <Contact />
      
    </div>
  );
}
