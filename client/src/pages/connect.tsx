import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../components/sidebar";
import PhoneMenu from "../components/phonemenu";
import axios from "axios";
import logo from "../assets/logo_white_bgd.svg";

export default function TechmateConnect() {
  const [num, setNum] = useState(0); // Use state for 'num'
  const [userData, setUserData] = useState([]);
  const [userImage, setUserImage] = useState<string>("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const userCreatedResponse = await axios.post(
        "http://127.0.0.1:8080/getprofile",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(userCreatedResponse);
      if (userCreatedResponse) {
        setUserImage(userCreatedResponse.data.imageurl);
        setUserData(userCreatedResponse.data.user_data);
        console.log(userCreatedResponse);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div className="flex">
      <div className="hidden md:block">
        <Sidebar name="Connects" />
      </div>
      <div className="bottom-0 bg-red border-t-2 border-DBDBDB fixed md:hidden">
        <PhoneMenu name="Connect" />
      </div>
      {userData && (
          <div className="mt-2 sm:mt-0   ml-76 md:ml-96">
            <img src={logo} alt="" className="mt-1 mb-0 md:hidden" />
          <div className="flex mt-5 md:mt-20">
            <div className="w-screen  md:w-full md:mx-0">
              <div>
                <h1 className="text-lg sm:text-2xl mx-2 md:mx-0 text-slate-800">Connection Requests:</h1>
                <hr />
              </div>
              {userData.followers && (
                <div className="w-full px-2 sm:px-5 mt-2 md:mt-10">
                  {userData.followers.map((follower) => (
                    <div key={follower.id}>
                      <div className="flex w-full py-5 rounded-xl md:mx-0 md:w-[75vh] bg-slate-800 text-white px-5">
                        <img
                          src={`https://firebasestorage.googleapis.com/v0/b/techmate-ts.appspot.com/o/${follower.id}?alt=media`}
                          alt=""
                          className="w-12 h-12 sm:w-20 sm:h-20 rounded-full"
                        />
                        <div className="flex w-full justify-start items-center text-slate-100 text-sm sm:text-lg ml-2 mr-10">
                          <p>{follower.username}</p>
                        </div>
                        <div className="flex w-full justify-end items-center">
                          <div className="ml-1 sm:ml-5 mr-1 sm:mr-2 bg-blue-600 rounded-lg py-2 px-[6%] sm:px-[10%] cursor-pointer">
                            Accept
                          </div>
                          <div className="mr-1sm:mr-2 bg-black py-2 px-[6%] sm:px-[10%] cursor-pointer">
                            Reject
                          </div>
                        </div>
                      </div>
                      <hr className="my-2 h-0.5 bg-gradient-to-r from-blue-400 via-indigo-600 to-pink-600" />
                    </div>
                  ))}
                </div>
              )}
              <hr className="flex mx-5 " />
              <div className="flex justify-center items-center h-40  w-screen md:w-auto">
                <div
                  onClick={() => {
                    navigate("/explore");
                  }}
                  className="bg-gradient-to-r from-blue-500 via-blue-800 to-blue-700 text-white px-5 py-3 rounded-lg mx-2 text-sm sm:text-lg cursor-pointer"
                >
                  Click here to Connect with Like-minded Individuals
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-20 mr-2">
        <div>
              <div className="hidden lg:block h-auto  bg-violet-200 relative rounded-xl mx-10">
              <div className="flex justify-center  w-full mt-10 ">
                  <div className="h-16 w-16 relative mt-10">
                  <img
                  src={userImage}
                      alt=""
                      className="rounded-full h-16 w-16"
                      />
                      <span
                      className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-white"
                      title="Online"
                      />
                      </div>
                      </div>
                      <div className="text-center mx-8">
                      {userData.profileAdded && (
                          <div>
                          <p className="my-5 text-xl font-semibold">
                          {userData.name}
                          </p>
                          </div>
                          )}
                          {!userData.profileAdded && (
                    <div>
                    <p className="mt-5  text-xl font-semibold">
                    James Rodriguez
                    </p>
                    <p className="text-slate-700 text-sm">
                    @{userData.username}
                      </p>
                      <p className="mt-5 text-md text-start">
                      A 32 year old SDE at Microsft who codes to make ends
                      meet.
                      </p>
                      <div className="mt-5 flex gap-2">
                      <div className="flex items-center justify-center w-full h-12 bg-blue-50 rounded-lg">
                      #art
                      </div>
                        <div className="flex items-center justify-center w-full h-12 bg-blue-50 rounded-lg">
                          #photography
                        </div>
                        <div className="flex items-center justify-center w-full h-12 bg-blue-50 rounded-lg">
                        #music
                        </div>
                        </div>
                      <div className="mt-2 flex gap-2 mr-24">
                        <div className="flex items-center justify-center w-full h-12 bg-blue-50 rounded-lg">
                        #singing
                        </div>
                        <div className="flex items-center justify-center w-full h-12 bg-blue-50 rounded-lg">
                          #dancing
                          </div>
                          </div>
                          <div
                        onClick={() => navigate("/profile")}
                        className="flex justify-center items-center w-full h-12 text-md mt-7   bg-black hover:bg-slate-800 rounded-lg text-white cursor-pointer"
                        >
                        View Profile
                        </div>
                        <br/>
                        </div>
                        )}
                        </div>
                        </div>
                    </div>
      </div>
    </div>
  );
}
