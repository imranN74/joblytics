import { ContactForm } from "../components/contacts/ContactForm";
import { ContactContainer } from "../components/contacts/ContactContainer";

export const Contacts = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full md:col-start-3 md:col-end-11">
        <div className="flex justify-center mt-28 md:mt-16 sticky top-16">
          <ContactForm />
        </div>
        <div className="flex justify-center mt-1">
          <ContactContainer />
        </div>
      </div>
    </div>
  );
};
