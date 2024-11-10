import { AppLandContainer } from "../components/landing/AppLandContainer";
import { AnalyticsLandContainer } from "../components/landing/AnalyticsLandContainer";
import { ContactLandContainer } from "../components/landing/ContactLandContainer";

export const About = () => {
  return (
    <div className="mt-28 sm:mt-16 bg-gradient-to-bl from-cyan-50 to-cyan-100">
      <AppLandContainer />
      <AnalyticsLandContainer />
      <ContactLandContainer />
    </div>
  );
};
