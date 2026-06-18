import Hero          from "@/components/hero/Hero";
import IntroStatement from "@/components/intro-statement/IntroStatement";
import Work           from "@/components/work/Work";
import Process        from "@/components/process/Process";
import Services       from "@/components/services/Services";
import Contact        from "@/components/contact/Contact";
import Footer         from "@/components/shared/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <IntroStatement />
      <Work />
      <Process />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
