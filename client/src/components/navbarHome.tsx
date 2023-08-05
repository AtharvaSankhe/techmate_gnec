import {useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

interface NameProps {
  name: string;
}
export default function Navbar() {
  const navigate = useNavigate();
  
  return (
    <div className=" text-2xl bg-blue-50"> {/* Add top margin to the parent div */}
      <div className="mx-5 bg-blue-50 sm:mx-20">
        <div className="flex  justify-between items-center">
          <div className="mt-10 "><img className="min w-40" src={logo} alt=""></img></div>
          {/* <div className="flex-grow"></div> Add an empty div to fill remaining space */}
          <div className="mt-10 py-2 mx-5 text-white bg-black rounded-full md:block px-9 hover:bg-gray-700 cursor-pointer" onClick={() => {
                  navigate("/login");
                }}>Login</div>
        </div>
      </div>
    </div>
  );
}
