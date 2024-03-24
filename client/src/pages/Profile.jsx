import { useRef } from "react";
import { FaCircleNotch } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Profile() {
  const { loading, currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  return (
    <div className="h-[90vh] w-full flex items-center justify-center bg-slate-100  font-poppins">
      <div className="w-11/12 mx-auto pt-10">
        <div className="w-full max-w-sm mx-auto  backdrop-blur-md rounded-lg p-8">
          <h1 className="text-3xl mb-5 text-center font-bold">Profile</h1>
          <form className="flex flex-col gap-5 mt-8">
            <input type="file" hidden ref={fileRef} />
            <div className="mx-auto">
              <img
                src={currentUser.avatar}
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>

            <input
              type="text"
              placeholder="Enter your username"
              className="input-field"
              name="username"
            />

            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input-field"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input-field"
            />

            <button
              disabled={loading}
              className="w-full cursor-pointer flex items-center justify-center gap-2 mt-5 py-2 relative text-white bg-black/90 font-medium rounded-lg"
            >
              Update
              {loading && (
                <div className="w-4 h-4">
                  <div className="animate-spin">
                    <FaCircleNotch />
                  </div>
                </div>
              )}
            </button>
            <div className="flex items-center justify-between text-sm text-red-600">
              <span>Create account</span>
              <span>Sign out</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
