import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LinguaCampus from "@/components/LinguaCampus";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <LinguaCampus />
      <Projects />
      <Services />
      <WhyUs />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
