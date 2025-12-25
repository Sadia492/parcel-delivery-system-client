import Banner from "@/components/Banner";

import HowItWorks from "../components/modules/Home/HowItWorks";
import Services from "@/components/modules/Home/Services";
import HeroStats from "@/components/modules/Home/HeroStats";
import TrackParcel from "@/components/modules/Home/TrackParcel";
import FAQ from "@/components/modules/Home/FAQ";
import Newsletter from "@/components/modules/Home/Newsletter";
import WhyChooseUs from "@/components/modules/Home/WhyChooseUs";
import CallToAction from "@/components/modules/Home/CallToAction";

export default function Home() {
  return (
    <div>
      {/* 1. Hero Banner */}
      <Banner />

      {/* 2. How It Works Section */}
      <HowItWorks></HowItWorks>

      {/* 3. Services We Offer */}
      <Services></Services>
      {/* 4. Hero Statistics Section */}
      <HeroStats></HeroStats>

      {/* 5. Track Parcel Widget */}
      <TrackParcel></TrackParcel>

      {/* 6. FAQ Section */}
      <FAQ></FAQ>

      {/* 9. Newsletter Subscription */}
      <Newsletter></Newsletter>

      {/* 10. Why Choose Us Section (Already exists) */}
      <WhyChooseUs></WhyChooseUs>

      {/* Call to Action */}
      <CallToAction></CallToAction>
    </div>
  );
}
