import emailjs from "@emailjs/browser";
import { useRef } from "react";
import toast from "react-hot-toast";

export default function ContactHome() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_k0p3e2l",
        "template_1s0krxy",
        form.current,
        "RJ2X-UwCaPI5xkeS2"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Email has sent!");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div>
      <h1 className="text-2xl md:text-3xl uppercase mb-10 text-center Aquatico">
        Contact
      </h1>
      <p className="text-lg md:text-xl uppercase my-6">Send us a message</p>
      <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6">
        <label>Name*</label>
        <input
          type="text"
          name="user_name"
          className="border-b border-white/70 outline-none bg-transparent"
        />
        <label>Email*</label>
        <input
          type="email"
          name="user_email"
          className="border-b border-white/70 bg-transparent outline-none bg-transparent"
        />
        <label>Message</label>
        <textarea
          className="bg-transparent border border-white/70 p-2 placeholder:text-sm"
          placeholder="Type message here..."
          rows={5}
          name="message"
        />
        <input
          className="flex cursor-pointer rounded-md items-start p-1 md:p-2 text-center justify-center font-bold text-white bg-[#eb0945] w-20 md:w-24"
          type="submit"
          value="Send"
        />
      </form>
    </div>
  );
}
