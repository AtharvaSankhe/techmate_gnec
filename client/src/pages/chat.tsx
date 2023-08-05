import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../components/sidebar";
import PhoneMenu from "../components/phonemenu";
import axios from "axios";
import logo from "../assets/logo_white_bgd.svg";

export default function TechmateChat() {
  return (
    <div className="flex">
      <div className="hidden md:block">
        <Sidebar name="Explore" />
      </div>
      {/* <img src={logo} alt="" className="mt-1 mb-4 md:hidden" /> */}
      <div className="bottom-0 bg-red border-t-2 border-DBDBDB fixed md:hidden">
        <PhoneMenu name="Explore" />
      </div>
      <div className="h-full w-full mt-5 md:mt-20 md:ml-72">
      <img src={logo} alt="" className="mt-1 ml-1 mb-4 md:hidden" />
      <span className="flex justify-center items-center text-lg sm:text-3xl font-bold mt-60 relative bg-gradient-to-r from-blue-400 via-indigo-600 to-pink-600 text-transparent bg-clip-text">
    Buy Premium to unlock this feature
  </span>
  <span className="flex justify-center text-sm text-slate-500">Currently working on making the chat page</span>
      </div>
    </div>
  );
}
