import Panel from "@/components/desktop/Panel";
import Dock from "@/components/desktop/Dock";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import AiBlock from "@/components/sections/AiBlock";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Panel />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <AiBlock />
        <Contact />
      </main>
      <Footer />
      <Dock />
    </>
  );
}
