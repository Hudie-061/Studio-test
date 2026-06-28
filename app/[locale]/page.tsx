import Hero          from "@/components/hero/Hero";
import IntroStatement from "@/components/intro-statement/IntroStatement";
import Work           from "@/components/work/Work";
import Process        from "@/components/process/Process";
import Services       from "@/components/services/Services";
import Contact        from "@/components/contact/Contact";
// import Subscription from "@/components/subscription/Subscription";
// TODO: Re-enable Subscription section when 2-3 paying clients onboarded.
// See: components/subscription/Subscription.tsx — pricing tiers pending decision.
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
      {/* <Subscription /> */}
      {/* TODO: Re-enable when 2-3 paying clients onboarded. Pricing tiers pending decision in components/subscription/Subscription.tsx */}
      <Footer />
    </main>
  );
}
