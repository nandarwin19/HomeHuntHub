import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function About() {
  const { currentUser } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log(currentUser);
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-200 w-full h-full min-h-[100vh]">
      <div className="max-container py-4">
        <div className="border-b border-gray-400">
          <h1 className="text-4xl font-bold text-start">Guestbook</h1>
          <p className=" my-2 mb-6 text-start text-gray-600 text-md">
            Welcome to the review page. You can tell anything here!
          </p>
        </div>
        <div className="max-w-lg mx-auto my-8">
          {currentUser ? (
            <form onSubmit={handleSubmit} className="flex gap-2 items-start">
              <img
                src={currentUser.avatar}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div className="w-full flex flex-col items-end space-y-2">
                <textarea
                  id="message"
                  rows="4"
                  value={message}
                  onChange={handleChange}
                  className="p-2.5 w-full text-sm text-gray-900 rounded-lg border-[3px] border-gray-100 focus:border-gray-100  bg-black1/90 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-100"
                  placeholder="Write your thoughts here..."
                ></textarea>
                <button className="bg-black1 text-white w-24 rounded-md py-2 px-2">
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center gap-1 font-semibold">
              <Link
                to={`/sign-up-in`}
                className="bg-black1 text-white rounded-md py-2 px-4"
              >
                Login
              </Link>
              <p>to continue leaving a message</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
