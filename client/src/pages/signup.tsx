import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../assets/logo.svg";
import map from "../assets/animated_map.gif";

console.log("process.env.apiUrl")
export default function SignUp() {
  type LocationData = {
    town: string;
    suburb: string;
    state: string;
    country: string;
  };
  const [step, setStep] = useState<number>(1);
  const [userName, setUserName] = useState<string>("");
  const [userProfession, setUserProfession] = useState<string>("");
  const [usergender, setUserGender] = useState<string>("");
  const [userlocation, setUserLocation] = useState<LocationData>({});
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

  const navigate = useNavigate();

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = event.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
    }
  };

  const handleContinue = async () => {
    if (step === 1) {
      if (userName.length < 4) {
        toast.error("A valid Username must have at least 4 characters");
      } else {
        try {
          const response = await axios.post(
            "http://localhost:8080/checkuserName",
            { userName }
          );
          if (response.data === "Username available") {
            setStep(step + 1);
          } else {
            toast.error(response.data);
          }
        } catch (error) {
          console.error("Error while making the request:", error);
          toast.error("An error occurred while checking the username.");
        }
      }
    }
    if (step === 2) {
      if (usergender.length && userProfession.length) {
        setStep(step + 1);
      } else {
        toast.error("Please Select both the fields");
      }
    }
    if (step === 3) {
      if (selectedPhoto != null) {
        console.log(selectedPhoto);
        setStep(step + 1);
      } else {
        toast.error("Please upload a picture");
      }
    }
    if (step === 4) {
      // Request location access
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setStep(step + 1);
          // Replace 'YOUR_API_KEY' with your actual API key from LocationIQ
          // https://my.locationiq.com/dashboard/?firstLogin=1
          // const apiKey = process.env.apiKey;
          const apiKey = "pk.41784fe0e1111e9b2053fc5683e5a894";
          const apiUrl = `https://eu1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`
          // Fetch the location details using the LocationIQ API
          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              // The location details are in the 'data' object
              setUserLocation({
                town: data.address.town,
                suburb: data.address.suburb,
                state: data.address.state,
                country: data.address.country,
              });
            })
            .catch((error) => {
              console.error("Error fetching location details:", error);
            });
        },
        (error) => {
          toast.error("Location access denied or an error occurred");
        }
      );
    }

    if (step === 5) {
      if (email.length > 4 && password.length > 4) {
        try {
          console.log("img jaa raha hai", selectedPhoto);
          // Send a request to create the user on the server
          const formData = new FormData();
          formData.append('userName', userName);
          formData.append('email', email);
          formData.append('password', password);
          formData.append('userProfession', userProfession);
          formData.append('usergender', usergender);
          formData.append('userlocation', JSON.stringify(userlocation));
          
          if (selectedPhoto) {
            formData.append("file", selectedPhoto);
          }
          // Iterate through the FormData entries and log each key-value pair
          for (const pair of formData.entries()) {
            console.log("haha", pair[0], pair[1]);
          }

          // Now you can log the FormData object itself
          console.log("form data:", formData);
          const userCreatedResponse = await axios.post(
            "http://localhost:8080/createuser",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data", // Set the correct content type for file upload
              },
            }
          );

          console.log(userCreatedResponse);

          if (userCreatedResponse.status === 200) {
            // User created successfully, now show the success message with a delay
            toast.success(
              "Verification Link Sent on the registered Email Address"
            );
            setTimeout(() => {
              navigate("/login"); // Replace "/login" with the actual path to navigate to
            }, 2000);
          } else {
            toast.error("Error creating user.");
          }
        } catch (error) {
          console.error("Error creating user:", error);
          toast.error("Error creating user.");
        }
      } else {
        toast.error(
          "Please note that email and password should have at least 5 characters"
        );
      }
    }
  };

  return (
    <div className="">
      {/* <div className="flex justify-center items-center h-200 bg-blue-50 text-center sm:h-screen "> */}
      <div className="flex justify-center items-center h-screen bg-blue-50 text-center ">
        <div className="mx-5  mt-40 mb-20 sm:mt-0 ">
          <div>
            <img className="mx-auto" src={logo} alt="" />
          </div>
          <div className="my-10">
            <div className="flex justify-center items-center">
              <div
                className={`flex justify-center items-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 hover:cursor-pointer ${
                  step >= 1 ? "bg-blue-600" : "bg-gray-100"
                }`}
                onClick={() => setStep(1)}
              >
                {step >= 1 ? (
                  <svg
                    className="w-6 h-6 text-white mx-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-300 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </div>
              <div className="w-5 h-1 bg-blue-200 sm:w-20"></div>
              <div
                className={`flex justify-center items-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 ${
                  step >= 2 ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                {step >= 2 ? (
                  <svg
                    className="w-6 h-6 text-white mx-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-300 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </div>
              <div className="w-5 h-1 bg-blue-200 sm:w-20"></div>
              <div
                className={`flex justify-center items-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 ${
                  step >= 3 ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                {step >= 3 ? (
                  <svg
                    className="w-6 h-6 text-white mx-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                    ></path>
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2-1a3 3 0 00-3 3v10a3 3 0 003 3h8a3 3 0 003-3V7a3 3 0 00-3-3h-2a3 3 0 00-3 3H6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-300 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zm-5 3a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2-1a3 3 0 00-3 3v10a3 3 0 003 3h8a3 3 0 003-3V7a3 3 0 00-3-3H6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </div>
              <div className="w-5 h-1 bg-blue-200 sm:w-20"></div>
              <div
                className={`flex justify-center items-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 ${
                  step >= 4 ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                {step >= 4 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white mx-auto"
                    fill="currentColor"
                    viewBox="0 0 384 512"
                  >
                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white mx-auto"
                    fill="#a6afbf"
                    viewBox="0 0 384 512"
                  >
                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                  </svg>
                )}
              </div>
              <div className="w-5 h-1 bg-blue-200 sm:w-20"></div>
              <div
                className={`flex justify-center items-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 ${
                  step >= 5 ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                {step >= 5 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white mx-auto"
                    fill="currentColor"
                    viewBox="0 0 640 512"
                  >
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H392.6c-5.4-9.4-8.6-20.3-8.6-32V352c0-2.1 .1-4.2 .3-6.3c-31-26-71-41.7-114.6-41.7H178.3zM528 240c17.7 0 32 14.3 32 32v48H496V272c0-17.7 14.3-32 32-32zm-80 32v48c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H608c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32V272c0-44.2-35.8-80-80-80s-80 35.8-80 80z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white mx-auto"
                    fill="#a6afbf"
                    viewBox="0 0 640 512"
                  >
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H392.6c-5.4-9.4-8.6-20.3-8.6-32V352c0-2.1 .1-4.2 .3-6.3c-31-26-71-41.7-114.6-41.7H178.3zM528 240c17.7 0 32 14.3 32 32v48H496V272c0-17.7 14.3-32 32-32zm-80 32v48c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H608c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32V272c0-44.2-35.8-80-80-80s-80 35.8-80 80z" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {step === 1 && (
            <div>
              <h1 className="font-bold text-xl">
                Hey There! So, what do you like to be called?
              </h1>
              <input
                className="mt-7 mb-2 px-4 rounded-full sm:h-10 w-auto sm:w-96"
                placeholder="Your name"
                onChange={(e) => setUserName(e.target.value)}
              />
              <p className="text-xs text-gray-700">
                This is how you would appear on TechMate
              </p>
            </div>
          )}
          {step === 2 && (
            <div className="flex-wrap sm:flex gap-10">
              <div className="mr-0 sm:mr-10">
                <h1 className="font-bold text-xl">How do you Identify?</h1>
                <p className="text-xs text-gray-700">
                  Your Information is kept private
                </p>
                <div
                  className={`mt-5 px-20 py-3 text-white rounded-full sm:mt-10 hover:cursor-pointer ${
                    usergender === "Male" ? "bg-blue-600" : "bg-yellow-600"
                  }`}
                  onClick={() => {
                    setUserGender("Male");
                  }}
                >
                  Male
                </div>
                <div
                  className={`mt-5 px-20 py-3 text-white rounded-full hover:cursor-pointer ${
                    usergender === "Female" ? "bg-blue-600" : "bg-yellow-600"
                  }`}
                  onClick={() => {
                    setUserGender("Female");
                  }}
                >
                  Female
                </div>
              </div>
              <div className="mt-5 sm:mt-0">
                <h1 className="font-bold text-xl ">
                  Choose you'r Proffesion to get Started
                </h1>
                <p className="text-xs text-gray-700">
                  you can't change it later
                </p>
                <div>
                  <div
                    className={`mt-5 px-20 py-3 text-white rounded-full sm:mt-10 hover:cursor-pointer ${
                      userProfession === "Student"
                        ? "bg-blue-600"
                        : "bg-yellow-600"
                    }`}
                    onClick={() => {
                      setUserProfession("Student");
                    }}
                  >
                    Student
                  </div>
                  <div
                    className={`mt-5 px-20 py-3 text-white rounded-full hover:cursor-pointer ${
                      userProfession === "Organization"
                        ? "bg-blue-600"
                        : "bg-yellow-600"
                    }`}
                    onClick={() => {
                      setUserProfession("Organization");
                    }}
                  >
                    Organization
                  </div>
                  {/* <div className="mt-5 px-20 py-3 bg-red-600 text-white rounded-full sm:mt-10">Student</div> */}
                  {/* <div  className="mt-5 px-20 py-3 bg-red-600 text-white rounded-full">Organization</div> */}
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h1 className="font-bold text-xl">
                Now it's time to upload your Photo's and Tell us more about
                yourself{" "}
              </h1>
              <p className="text-xs text-gray-700">
                Adding photos is a great way to show off more about yourself!You
                can drag your photo's right from your desktop.
              </p>
              <label
                htmlFor="upload-input"
                className="mt-5 px-40 py-20 sm:px-60 bg-blue-200 rounded-3xl text-center inline-block hover:cursor-pointer"
              >
                <input
                  type="file"
                  accept="image/*"
                  id="upload-input"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 sm:w-20 sm:h-20 inline-block mr-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 4L2 14h3v6h14v-6h3L12 4zm4.5 12h-9v-2h9v2zm-3-7V3.5l5.5 5.5h-4.25v6h-2.5v-6H6.75L12 3.5z" />
                </svg>

                <p className="hidden sm:flex">Drag and Drop your photo here</p>
              </label>
            </div>
          )}
          {step === 4 && (
            <div>
              <img
                src={map}
                className="mx-auto h-40 w-40 rounded-full mt-5 mb-5"
                alt=""
              />
              <h1 className="font-bold text-xl ">
                We need your location to show who's nearby
              </h1>
              <p className="text-xs text-gray-700">
                You need to grant Techmate access to your location so we can
                show you awesome bees in your area
              </p>
            </div>
          )}
          {step === 5 && (
            <div className="flex flex-col justify-center">
              <div className="flex flex-col items-center">
                <h1 className="font-semibold text-xl">Enter your Email Id</h1>
                <input
                  className="mt-2 mb-5 px-4 rounded-full sm:h-10 w-full sm:w-96"
                  placeholder="johndoe@gmail.com"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="font-semibold text-xl">Enter your Password</h1>
                <input
                  className="mt-2 mb-2 px-4 rounded-full w-full sm:h-10 sm:w-96"
                  placeholder="john123"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="mt-5 mb-5 sm:mt-5 sm:mb-0">
            {step < 5 && (
              <button
                className="px-20 py-2 text-white bg-black rounded-full hover:bg-blue-600 cursor-pointer sm:px-40 "
                onClick={handleContinue}
              >
                Continue
              </button>
            )}
            {step === 5 && (
              <button
                className="px-20 py-2 text-white bg-black rounded-full hover:bg-blue-600 cursor-pointer  sm:px-40 "
                onClick={handleContinue}
              >
                SIGNUP
              </button>
            )}
          </div>
          <h2
            className="text-sm text-center my-2 text-blue-900 underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Click here if you have already made an Account
          </h2>
        </div>
      </div>
    </div>
  );
}
