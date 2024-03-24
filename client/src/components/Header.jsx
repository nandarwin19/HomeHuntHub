import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isSwitchOn, setSwitch] = useState(false);

  const toggleMenu = () => {
    setSwitch(!isSwitchOn);
  };
  return (
    <header className="relative bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">HOME</span>
            <span className="text-slate-700">HUNT</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="hidden md:flex items-center justify-center gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              HOME
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              ABOUT
            </li>
          </Link>
          <Link to="/sign-in">
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
          <div className="absolute md:hidden flex w-1/2 text-center justify-center top-[90%] right-0 bg-slate-300 py-10 px-8 rounded-md">
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
              <Link to="/sign-in">
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
    </header>
  );
}
