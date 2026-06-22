import { LandingNav } from "@/components/landing/landing-nav";
import { Hero } from "@/components/landing/hero";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { TrustStrip, Footer } from "@/components/landing/trust-and-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <Hero />
      <div id="features">
        <FeatureGrid />
      </div>
      <div id="trust">
        <TrustStrip />
      </div>
      <Footer />
    </div>
  );
}
