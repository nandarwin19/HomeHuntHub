import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isSwitchOn, setSwitch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setSwitch(!isSwitchOn);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
  }, [location.search]);

  return (
    <header className="bg-primary shadow-xl text-white w-full  sticky inset-0 z-50">
      <div className="max-container">
        <div className="flex justify-between items-center p-3">
          <Link to="/">

            <div className="flex gap-2 font-extrabold ">
              <div className="flex gap-1">
                <p className="text-xl">N</p>

                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                  className=" w-2 h-2 mt-[14px] rounded-full bg-[#eb0945]"
                ></motion.div>
              </div>
            </div>
          </Link>
          <form
            onSubmit={handleSubmit}
            className="border border-gray-600 hover:scale-100 hover:shadow-sm transition duration-300 ease-out p-3 rounded-md flex items-center"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className="text-slate-600" />
            </button>
          </form>
          <ul className="hidden md:flex items-center justify-center gap-8">
            <Link to="/">
              <li className="hidden sm:inline  hover:text-white font-semibold">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline  hover:text-white font-semibold">
                About
              </li>
            </Link>
            <Link to="/sign-up-in">
              {currentUser ? (
                <Link to="/profile">
                  <img
                    src={currentUser.avatar}
                    alt="profile"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                </Link>
              ) : (
                <li className=" text-slate-700 hover:underline"> SIGNIN</li>
              )}
            </Link>
          </ul>

          <div onClick={toggleMenu} className="md:hidden cursor-pointer">
            {isSwitchOn ? (
              <IoClose className="text-slate-700 w-16 h-6" />
            ) : (
              <IoMenu className="text-slate-700 w-16 h-6" />
            )}
          </div>

          {isSwitchOn && (
            <div className="absolute md:hidden z-50 flex w-1/2 text-center justify-center top-[90%] right-0 bg-slate-300 py-10 px-8 rounded-md">
              <ul className=" flex flex-col gap-4">
                <Link to="/">
                  <li className="sm:inline text-slate-700 hover:underline">
                    HOME
                  </li>
                </Link>
                <Link to="/about">
                  <li className="sm:inline text-slate-700 hover:underline">
                    ABOUT
                  </li>
                </Link>
                <Link to="/sign-up-in">
                  {currentUser ? (
                    <li className=" text-slate-700 hover:underline"> Logout</li>
                  ) : (
                    <li className=" text-slate-700 hover:underline"> SIGNIN</li>
                  )}
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
