import { InputBox } from "./InputBox";
import { TextArea } from "./TextArea";

export function ContactForm() {
  function handleChange() {}

  return (
    <div className="flex flex-col justify-around items-center w-full bg-gradient-to-bl from-cyan-50 to-cyan-100">
      <div className="px-6 py-6">
        <h2 className="text-2xl font-bold text-gray-800">Contact Me</h2>
        <p className="text-gray-600 mt-1">
          Fill out the form below and I'll get back to you as soon as possible.
        </p>
      </div>
      <div className="w-1/2">
        <InputBox
          value=""
          labelValue="Name"
          typeValue="text"
          handleOnChange={handleChange}
          idValue="name"
        />
        <InputBox
          value=""
          labelValue="Email"
          typeValue="email"
          handleOnChange={handleChange}
          idValue="email"
        />
        <TextArea value="" textAreaChange={handleChange} label="Your Message" />
        <div className="flex justify-center py-2">
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
