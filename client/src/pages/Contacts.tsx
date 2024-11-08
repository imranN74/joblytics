import { ContactForm } from "../components/contacts/ContactForm";
import { ContactContainer } from "../components/contacts/ContactContainer";

export const Contacts = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center mt-28 md:mt-16 sticky top-16">
        <ContactForm />
      </div>
      <div className="flex justify-center mt-1">
        <ContactContainer />
      </div>
    </div>
  );
};
