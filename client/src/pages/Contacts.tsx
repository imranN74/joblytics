import { ContactForm } from "../components/contacts/ContactForm";
import { ContactContainer } from "../components/contacts/ContactContainer";

export const Contacts = () => {
  return (
    <div className="">
      <div className="flex justify-center mt-16 sticky top-16">
        <ContactForm />
      </div>
      <div className="flex justify-center mt-2">
        <ContactContainer />
      </div>
    </div>
  );
};
