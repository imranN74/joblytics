import { ContactForm } from "../components/contacts/ContactForm";
import { ContactContainer } from "../components/contacts/ContactContainer";
import { Loader } from "../components/loader/Loader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { contactAtom } from "../store/atoms/contactAtoms";
import { isContactUpdated } from "../store/atoms/contactAtoms";
import { toast } from "react-toastify";
import { CompanyHeader } from "../components/contacts/CompanyHeader";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const Contacts = () => {
  type Contacts = {
    id: string;
    name: string;
    contact: string;
  };

  //to check if something updated and refecth
  const [isContactUpdatedVal, setContactUpdatedVal] =
    useRecoilState(isContactUpdated);

  const { id } = useParams();
  const token = localStorage.getItem("jwt");
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useRecoilState<Contacts[]>(contactAtom);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_BASE_URL}/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setContactData(response.data.response);
        setLoading(false);
        setContactUpdatedVal(false);
      })
      .catch((error) => {
        toast.error(error.data.response.message);
        setLoading(false);
      });
  }, [isContactUpdatedVal]);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full md:col-start-3 md:col-end-11">
        <div className="flex justify-center mt-28 md:mt-16 sticky sm:top-16 top-28">
          <ContactForm />
        </div>
        <div className="flex justify-center sticky top-52 sm:top-40 bg-red-100">
          <CompanyHeader id={id ?? ""} />
        </div>

        {loading ? (
          <div className="w-full flex justify-center mt-16">
            <Loader />
          </div>
        ) : contactData.length === 0 ? (
          <div className="w-full flex flex-col justify-center mt-16 text-3xl font-thin text-red-300">
            <div className="text-center">No Contacts Available</div>
            <div className="text-center">Add a New Contact!</div>
          </div>
        ) : (
          contactData.map((data, index) => {
            return (
              <div className="flex justify-center mt-1 bg-cyan-50" key={index}>
                <ContactContainer
                  key={index}
                  name={data.name}
                  contact={data.contact}
                  contactId={data.id}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
