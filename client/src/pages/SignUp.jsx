// import { useState } from "react";
// import { FaCircleNotch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "../redux/slices/userSlice";
// import OAuth from "../components/OAuth";

// export default function SignUp() {
//   const { loading, error } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({});
//   const [toggleChange, setToggleChange] = useState(false);
//   const navigate = useNavigate();

//   const toggleForm = () => {
//     setToggleChange(!toggleChange);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // dispatch(signInStart(formData));

//     try {
//       dispatch(signInStart(true));
//       const url = toggleChange ? "/api/auth/signin" : "/api/auth/signup";
//       const res = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         // setError(data.message);
//         // setLoading(false);

//         // let's redux tookit
//         dispatch(signInFailure(data.message));

//         return;
//       }
//       // setLoading(false);
//       // setError(null);
//       dispatch(signInSuccess(data));
//       setToggleChange(true);
//       console.log(data);
//       // navigate("/");
//       if (toggleChange) {
//         navigate("/");
//       }
//     } catch (error) {
//       // setLoading(false);
//       dispatch(signInFailure(error.message));
//     }
//   };

//   return (
//     <div className="h-[90vh] w-full flex items-center justify-center bg-slate-100  font-poppins">
//       <div className="w-11/12 mx-auto pt-10">
//         <div className="w-full max-w-sm mx-auto bg-slate-200 backdrop-blur-md rounded-lg p-8 border-2 border-gray-300/60 shadow-lg shadow-gray-300/50">
//           <h1 className="text-2xl mb-5 text-center font-bold">
//             {toggleChange ? "Sign In" : "Sign Up"}
//           </h1>
//           <div className="flex flex-col gap-5 mt-8">
//             {!toggleChange && (
//               <input
//                 type="text"
//                 placeholder="Enter your username"
//                 className="input-field"
//                 name="username"
//                 onChange={handleChange}
//               />
//             )}
//             <input
//               name="email"
//               type="email"
//               placeholder="Enter your email"
//               className="input-field"
//               onChange={handleChange}
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               className="input-field"
//               onChange={handleChange}
//             />
//           </div>
//           <button
//             disabled={loading}
//             onClick={handleSubmit}
//             className="w-full cursor-pointer flex items-center justify-center gap-2 mt-5 py-2 relative text-white bg-black/90 font-medium rounded-lg"
//           >
//             {toggleChange ? "Sign in" : "Sign up"}
//             {loading && (
//               <div className="w-4 h-4">
//                 <div className="animate-spin">
//                   <FaCircleNotch />
//                 </div>
//               </div>
//             )}
//           </button>
//           {error && (
//             <p className="text-red-500 text-sm mt-5 text-center">{error}</p>
//           )}
//           <OAuth />
//           <p className="text-gray-600 text-sm mt-5">
//             {toggleChange
//               ? "Don't have an account? "
//               : "Already have an account? "}
//             <span
//               className="cursor-pointer text-gray-500 font-semibold"
//               onClick={toggleForm}
//             >
//               {toggleChange ? "Register" : "Sign In"}
//             </span>
//           </p>
//           <div className="flex items-center mt-7 gap-2 text-gray-600 text-xs">
//             <input
//               type="checkbox"
//               name=""
//               id=""
//               className="cursor-pointer w-4 h-4"
//             />
//             <p>By continuing, I agree to the terms of use & privacy policy.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { FaCircleNotch } from "react-icons/fa";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="h-[90vh] w-full flex items-center justify-center bg-slate-200  font-poppins">
      <div className="w-11/12 mx-auto pt-10">
        <div className="w-full max-w-sm mx-auto bg-slate-200 backdrop-blur-md rounded-lg p-8 border-2 border-gray-300/60 shadow-2xl shadow-gray-500/60">
          <h1 className="text-2xl mb-5 text-center font-bold">Sign Up</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="username"
              className="border p-3 rounded-lg"
              id="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="email"
              className="border p-3 rounded-lg"
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              className="border p-3 rounded-lg"
              id="password"
              onChange={handleChange}
            />
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="w-full cursor-pointer flex items-center justify-center gap-2 mt-3 py-2 relative text-white bg-black/90 font-medium rounded-lg"
            >
              Sign up
              {loading && (
                <div className="w-4 h-4">
                  <div className="animate-spin">
                    <FaCircleNotch />
                  </div>
                </div>
              )}
            </button>
            <OAuth />
          </form>
          <div className="flex text-sm gap-2 mt-5">
            <p>Have an account?</p>
            <Link to={"/sign-in"}>
              <span className="text-blue-700">Sign in</span>
            </Link>
          </div>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
    </div>
  );
}
