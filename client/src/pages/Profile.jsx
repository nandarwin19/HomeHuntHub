import { useRef, useState, useEffect } from "react";
import { FaCircleNotch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserSuccess,
} from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md";

export default function Profile() {
  const { loading, currentUser, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const dispatch = useDispatch();

  console.log(formData);

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 3 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100; // progress bar
        // console.log("Upload is " + progress + "% done");
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      // setUpdateSuccess(true);
      toast.success("Successfully updated!");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/auth/signout"); // we don't need to mention get request bcz get is default
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full min-h-[100vh] bg-slate-200 w-full flex items-center justify-center  font-poppins">
      <Toaster />
      <div className="w-11/12  mx-auto">
        <div className="w-full shadow-2xl mt-12 max-w-sm mx-auto  backdrop-blur-md rounded-lg p-8">
          <h1 className="text-3xl mb-5 text-black text-center font-bold">
            Profile
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8">
            <input
              type="file"
              hidden
              ref={fileRef}
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
            />
            <div className="mx-auto flex items-center justify-center flex-col">
              <img
                src={formData.avatar || currentUser.avatar}
                onClick={() => fileRef.current.click()}
                alt=""
                className="w-16 h-16 cursor-pointer rounded-full object-cover"
              />
              <p className="text-sm">
                {fileUploadError ? (
                  <span className="text-red-600">
                    Error Image upload(Image must be less than 3 MB)
                  </span>
                ) : filePerc > 0 ? (
                  filePerc < 100 ? (
                    <span className="text-slate-600">{`Uploading ${filePerc}%`}</span>
                  ) : (
                    filePerc === 100 && (
                      <span className="text-green-600">
                        Successfully uploaded
                      </span>
                    )
                  )
                ) : null}
              </p>
            </div>

            <input
              type="text"
              placeholder="Enter your username"
              className="input-field"
              name="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
            />

            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input-field"
              defaultValue={currentUser.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input-field"
              onChange={handleChange}
            />

            <button
              disabled={loading}
              className="w-full cursor-pointer flex items-center justify-center  py-2 relative text-white bg-black1 font-medium rounded-lg"
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
            <Link
              to={"/create-listing"}
              className="w-full cursor-pointer flex items-center justify-center mb-2 py-2 relative text-white bg-green-600 font-medium rounded-lg"
            >
              Create Listing
            </Link>
          </form>
          <div className="flex items-center cursor-pointer justify-between text-sm text-red-600">
            <span onClick={handleDeleteUser}>Delete account</span>
            <span onClick={handleSignout}>Sign out</span>
          </div>
          <p className="text-red-600 text-sm">{error ? error : null}</p>
          <p className="text-green-600">
            {updateSuccess ? "User is successfully updated!" : ""}
          </p>
          <button
            onClick={handleShowListings}
            className="text-green-600 w-full"
          >
            Show listings
          </button>
          <p className="text-red-700 text-sm">
            {showListingsError ? "Error showing listings" : null}
          </p>
        </div>
        <div className="py-8">
          {userListings && userListings.length > 0 && (
            <div className="flex flex-col text-black1 gap-4">
              <h1 className="text-center mt-7 text-2xl font-semibold">
                Your Listings
              </h1>
              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  className="border border-gray-300 rounded-lg p-3 flex justify-between items-center gap-4"
                >
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={listing.imageUrls[0]}
                      alt="listing cover"
                      className="h-16 w-16 object-contain"
                    />
                  </Link>
                  <Link
                    className="text-black/80 font-semibold  hover:underline truncate flex-1"
                    to={`/listing/${listing._id}`}
                  >
                    <p>{listing.name}</p>
                  </Link>

                  <div className="flex gap-4">
                    <Link to={`/update-listing/${listing._id}`}>
                      <button
                        className="p-2 border border-gray-300 rounded-sm"
                        aria-label="Edit"
                      >
                        <CiEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleListingDelete(listing._id)}
                      className="p-2 border border-gray-300 rounded-sm"
                      aria-label="Delete"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
