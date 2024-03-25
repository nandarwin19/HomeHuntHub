import { useRef, useState, useEffect } from "react";
import { FaCircleNotch } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const { loading, currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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

  return (
    <div className="h-[90vh] w-full flex items-center justify-center bg-slate-100  font-poppins">
      <div className="w-11/12 mx-auto pt-10">
        <div className="w-full max-w-sm mx-auto  backdrop-blur-md rounded-lg p-8">
          <h1 className="text-3xl mb-5 text-center font-bold">Profile</h1>
          <form className="flex flex-col gap-5 mt-8">
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
                  <span className="text-red-700">
                    Error Image upload(Image must be less than 3 MB)
                  </span>
                ) : filePerc > 0 ? (
                  filePerc < 100 ? (
                    <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
                  ) : (
                    filePerc === 100 && (
                      <span className="text-green-700">
                        Successfully ploaded
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
