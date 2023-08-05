import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../assets/logo_white_bgd.svg";
import login from "../assets/login.gif";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleContinue = async() => {
    try {
      // Send a request to create the user on the server
      const userCreatedResponse = await axios.post(" http://127.0.0.1:8080/signuser", {
        email,
        password,
      }, {headers: {
        "Content-Type": "application/json"
        },
        withCredentials: true
      }
      );

      console.log(userCreatedResponse)
      if (userCreatedResponse.data.message === "User signed in successfully") {
        // User created successfully, now show the success message with a delay
        toast.success(userCreatedResponse.data.message);

        setTimeout(() => {
          navigate("/profile"); // Replace "/login" with the actual path to navigate to
        }, 1000);
      } else {
        toast.error(userCreatedResponse.data.message);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Please check your credentials");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleContinue();
    }
  };

  return (
    <div className="h-height w-width">
      <div className="mx-5 sm:mx-10">
        <div className="flex justify-between items-center mt-10">
          <div>
            <img className="min w-40" src={logo} alt="" onClick={()=>{navigate("/")}}/>
          </div>
          <div
            className="hidden sm:flex py-2 px-9 text-2xl  text-white bg-black rounded-full md:block hover:bg-gray-700 cursor-pointer"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </div>
        </div>
      </div>

      <div className=" md:flex h-screen  justify-center items-center gap-5">
        <div>
          {/* <img src={login} alt="" className="h-auto min-w-fit	" /> */}
          <img src={login} alt="" className="h-70 w-70	" />
        </div>

        <div className="mr-5 ml-5 flex-col justify-center self-center md:ml-0 md:mr-10">
          <div className="flex flex-col items-start">
            <h1 className="font-semibold text-2xl">Enter your Email Id</h1>
            <input
              className="mt-2 mb-5 px-4 rounded-full w-full h-10  md:w-96 border-2"
              placeholder="johndoe@gmail.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start">
            <h1 className="font-semibold text-2xl">Enter your Password</h1>
            <input
  className="mt-2 mb-2 px-4 rounded-full w-full h-10 md:w-96 border-2"
  placeholder="john123"
  type="password"
  value={password}
  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
  onKeyDown={handleKeyDown}
/>
          </div>

          <button
            className=" my-4 py-3 text-3xl  text-white bg-black rounded-full hover:bg-blue-600 cursor-pointer w-full px-0 md:px-40 "
            onClick={handleContinue}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
