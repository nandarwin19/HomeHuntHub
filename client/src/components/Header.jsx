import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isSwitchOn, setSwitch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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

  let headerTextColor = "text-white";
  let borderColor = "border-gray-600";
  let headerColor = "bg-primary";
  if (
    location.pathname === "/profile" ||
    location.pathname === "/sign-up-in" ||
    location.pathname === "/guestbook" ||
    location.pathname === "/create-listing" ||
    location.pathname.startsWith("/update-listing/") ||
    location.pathname === "/search"
  ) {
    headerColor = "bg-slate-200";
    headerTextColor = "text-black";
    borderColor = "border-gray-400";
  }

  return (
    <header
      className={`${headerColor} shadow-md text-white w-full  sticky inset-0 z-50`}
    >
      <div className="max-container">
        <div className="flex justify-between items-center p-3">
          <Link to="/">
            <div className="flex gap-2 font-extrabold ">
              <div className="flex gap-1">
                <p className={`text-xl ${headerTextColor}`}>N</p>

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
            className={`border ${borderColor} lg:ml-40 hover:scale-100 hover:shadow-sm transition duration-300 ease-out p-3 rounded-md flex items-center`}
          >
            <input
              type="text"
              placeholder="Search..."
              className={`${headerTextColor} bg-transparent focus:outline-none w-24 sm:w-72`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className="text-gray-400" />
            </button>
          </form>

          <ul className="hidden md:flex items-center justify-center gap-8">
            <Link to="/">
              <li
                className={`hidden sm:inline  hover:text-gray-400 font-semibold ${headerTextColor}`}
              >
                Home
              </li>
            </Link>
            <Link to="/guestbook">
              <li
                className={`hidden sm:inline  hover:text-gray-400 font-semibold ${headerTextColor}`}
              >
                Guestbook
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
                <li
                  className={`hidden sm:inline  hover:text-gray-600 font-semibold ${headerTextColor}`}
                >
                  Sign in
                </li>
              )}
            </Link>
          </ul>

          <div onClick={toggleMenu} className="md:hidden cursor-pointer">
            {isSwitchOn ? (
              <IoClose className={`${headerTextColor} w-16 h-6`} />
            ) : (
              <IoMenu
                className={` ${headerTextColor} text-slate-700 w-16 h-6`}
              />
            )}
          </div>

          {isSwitchOn && (
            <div
              className={`absolute lg:hidden z-50 flex w-1/2 h-[100vh] text-center justify-center top-[100%] right-0  py-20 px-8 ${headerColor}`}
            >
              <ul className=" flex pt-[70%] flex-col gap-4">
                <Link to="/" onClick={toggleMenu}>
                  <li
                    className={`sm:inline hover:underline ${headerTextColor}`}
                  >
                    Home
                  </li>
                </Link>
                <Link
                  to="/search"
                  onClick={toggleMenu}
                  className={`sm:inline hover:underline ${headerTextColor}`}
                >
                  Houses
                </Link>

                <Link to="/guestbook" onClick={toggleMenu}>
                  <li
                    className={`sm:inline hover:underline ${headerTextColor}`}
                  >
                    Guestbook
                  </li>
                </Link>

                <Link to="/sign-up-in" onClick={toggleMenu}>
                  {currentUser ? (
                    <Link
                      className={`sm:inline hover:underline ${headerTextColor}`}
                      to="/profile"
                    >
                      Profile
                    </Link>
                  ) : (
                    <li
                      className={`sm:inline hover:underline ${headerTextColor}`}
                    >
                      Sign in
                    </li>
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
