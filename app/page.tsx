import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Patent from "@/components/Patent";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Patent />
      <Achievements />
      <Certifications />
      <Contact />
    </>
  );
}
