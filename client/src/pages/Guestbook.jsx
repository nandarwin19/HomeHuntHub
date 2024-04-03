import { useEffect, useState } from "react";
import { FaCircleNotch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function About() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    name: currentUser ? currentUser.username : "",
    message: "",
    avatar: currentUser ? currentUser.avatar : "",
  });
  console.log(messages);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch("/api/guestbook");
        const data = await res.json();
        console.log(data);
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.log("Data is not an array");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [messages]);

  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, message: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.message.length < 5) {
      return toast.error("Message must be at least 5 characters long.");
    }
    try {
      setLoading(true);
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      formData.message = "";
      toast.success("Comment added!");
      if (data.success === false) {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-200 w-full h-full min-h-[100vh]">
      <Toaster />
      <div className="max-container py-4">
        <div className="border-b border-gray-400">
          <h1 className="text-4xl font-bold text-start">Guestbook</h1>
          <p className=" my-2 mb-6 text-start text-gray-600 text-md">
            Welcome to the guestbook page. Test!
          </p>
        </div>
        <div className="max-w-lg mx-auto">
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
                    maxLength={200}
                    value={formData.message}
                    onChange={handleChange}
                    className="p-2.5 w-full text-sm text-gray-900 rounded-lg border-[3px] border-gray-100 focus:border-gray-100  bg-black1/90 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-100"
                    placeholder="Write your thoughts here..."
                  ></textarea>

                  <button
                    disabled={loading}
                    className="bg-black1 text-white w-24 rounded-md py-2 px-2"
                  >
                    Submit
                    {loading && (
                      <div className="w-4 h-4">
                        <div className="animate-spin">
                          <FaCircleNotch />
                        </div>
                      </div>
                    )}
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
          <div className="space-y-4 max-w-lg">
            {messages?.map((message) => (
              <div
                key={message._id}
                className="flex flex-col border-2 p-3 rounded-md bg-gray-300 border-gray-400 gap-2 items-start"
              >
                <div className="flex items-start gap-2">
                  <img
                    src={message.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-center"
                  />
                  <div className="flex flex-col">
                    <p className="text-black1 font-semibold">{message.name}</p>

                    <p className="text-gray-600 text-[12px]">
                      {message.createdAt.slice(0, 10)}
                    </p>
                  </div>
                </div>
                <div className="w-full flex flex-col items-start space-y-2">
                  <p className="text-gray-800 font-semibold ml-12">
                    {message.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
