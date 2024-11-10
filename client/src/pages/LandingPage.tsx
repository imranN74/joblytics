import { Land } from "../components/landing/Land";
import { AppLandContainer } from "../components/landing/AppLandContainer";
import { AnalyticsLandContainer } from "../components/landing/AnalyticsLandContainer";
import { ContactLandContainer } from "../components/landing/ContactLandContainer";

export const LandingPage = () => {
  return (
    <div>
      <Land />
      <AppLandContainer />
      <AnalyticsLandContainer />
      <ContactLandContainer />
    </div>
  );
};
