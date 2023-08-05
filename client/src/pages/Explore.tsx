import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../components/sidebar";
import PhoneMenu from "../components/phonemenu";
import axios from "axios";
import logo from "../assets/logo_white_bgd.svg";

export default function TechmateExplore() {
  const [batchProfile, setBatchProfile] = useState([]);
  const [num, setNum] = useState(0); // Use state for 'num'
  const [userData, setUserData] = useState([]);
  const [userImage, setUserImage] = useState<string>("");

  const navigate=useNavigate()

  async function getfirstProfiles() {
    const userCreatedResponse = await axios.post(
      "http://127.0.0.1:8080/getfirstprofile",
      {},
      {
        withCredentials: true,
      }
    );
    console.log(userCreatedResponse.data);
    setBatchProfile(userCreatedResponse.data);
  }

  
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
    getfirstProfiles(); //this will call the first batch of profiles
    fetchData();
  }, []);

  const handleNextProfile = () => {
    if (num < batchProfile.length - 1) {
      setNum(num + 1);
    } else {
      toast.error("You're all caught up");
    }
  };
  const handleConnection = async() => {
    if (num <= batchProfile.length - 1) {
      console.log(num)
      try {
        const userCreatedResponse = await axios.post(
          "http://127.0.0.1:8080/addconnection",
          { 
             "follower_id":batchProfile[num].id,
             "follower_username":userData.username
            },
          {
            withCredentials: true,
          }
        );
        console.log(userCreatedResponse);
        if (userCreatedResponse) {
          console.log(userCreatedResponse);
          toast.success("Connection Request Sent")
          if(num!=batchProfile.length-1){
            setNum(num + 1);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      // batchProfile[num].id
      // batchProfile[num].username
    } else {
      toast.error("You're all caught up");
    }
  };

  return (
    <div className="flex">
      <div className="hidden md:block">
        <Sidebar name="Explore" />
      </div>
      {/* <img src={logo} alt="" className="mt-1 mb-4 md:hidden" /> */}
      <div className="bottom-0 bg-red border-t-2 border-DBDBDB fixed md:hidden">
        <PhoneMenu name="Explore" />
      </div>
      {batchProfile.length > 0 && (
        <div className="mt-2 sm:mt-0  w-screen md:ml-72">
          <img src={logo} alt="" className="mt-1 ml-1 mb-4 md:hidden" />
          <div className="flex mt-5 justify-center items-center ml-5 mr-5 md:ml-20 ">
            {/* <div className="flex gap-0 md:gap-10  bg-blue-50 rounded-xl mx-2 md:mx-20 border-2  ">
            </div> */}
            <div className="flex-col w-full">
              <div className="relative w-full md:w-[65vh]">
                <div>
                  <img
                    src={`https://firebasestorage.googleapis.com/v0/b/techmate-ts.appspot.com/o/${batchProfile[num].id}?alt=media`}
                    alt=""
                    className="w-full h-[55vh]  md:w-[65vh] sm:h-[65vh] rounded-3xl"
                  />
                </div>
                <div
                  className="flex justify-center items-center text-md sm:text-lg   h-9 text-center bg-blue-700 text-white absolute bottom-0    mb-5 w-[45%] ml-2 rounded-xl cursor-pointer hover:bg-blue-600 "
                  onClick={handleConnection}
                >
                  Send Connection
                </div>
                <div
                  className="flex justify-center items-center h-9 text-center text-md sm:text-lg  bg-black text-white absolute bottom-0 right-0 mb-5 w-[45%] mr-2 rounded-xl cursor-pointer hover:bg-slate-800 "
                  onClick={handleNextProfile}
                >
                  Next Profile
                </div>
              </div>
              {/* name */}
              {!batchProfile[num].profileAdded && ( //generated a random age
                <div className="mt-5 font-bold text-2xl">
                  {batchProfile[num].username}, 26
                </div>
              )}
              {batchProfile[num].profileAdded && (
                <div className="mt-10 font-bold text-2xl">
                  {batchProfile[num].username}, {batchProfile[num].age}
                </div>
              )}
              {/* job title */}
              {!batchProfile[num].profileAdded && ( //generated a random age
                <div className="text-slate-500 text-sm">
                  <p className="py-0 -my-1">Product Manager at Tinder </p>
                  <p className="py-0 -my-1">DJ Sanghvi'25 </p>
                  <p className="py-0 -my-1">2 km </p>
                </div>
              )}
              {batchProfile[num].profileAdded && ( //generated a random age
                <div className="text-slate-500 text-sm">
                  <p className="py-0 -my-1">{batchProfile[num].jobTitle} </p>
                  <p className="py-0 -my-1">{batchProfile[num].college} </p>
                  <p className="py-0 -my-1">2 km</p>
                </div>
              )}
              <hr className="my-1 h-2  sm:w-96" />
              {/* about you */}
              {!batchProfile[num].profileAdded && ( //generated a random age
                <div className="text-slate-500 text-sm w-auto  md:w-[65vh] mb-20 md:mb-10">
                  As a passionate software developer, I dive into lines of code
                  like an explorer venturing into uncharted territories. My eyes
                  light up with excitement as I unravel complex algorithms and
                  turn abstract ideas into tangible solutions. Each bug
                  encountered is a puzzle to be solved, and I approach it with
                  relentless determination. My code is a symphony of creativity
                  and logic, dancing together in perfect harmony. With every
                  keystroke, I feel a sense of fulfillment, knowing that my work
                  has the power to impact lives and shape the digital world. As
                  a software developer, I am fueled by curiosity, innovation,
                  and the joy of building something extraordinary from scratch.
                  The thrill of continuous learning propels me forward, always
                  striving to be at the forefront of technology's ever-evolving
                  landscape.{" "}
                </div>
              )}
              {batchProfile[num].profileAdded && ( //generated a random age
                <div className="text-slate-500 text-sm w-[65vh] mb-20 sm:mb-10">
                  {batchProfile[num].description}
                </div>
              )}
            </div>
            <div className="hidden lg:block w-[85%] h-[77vh] mx-5 mb-80 mt-10 bg-violet-200 relative rounded-xl">
              <div className="flex justify-center  w-full mt-10 ">
                <div className="h-24 w-24 relative">
                  <img src={userImage} alt="" className="rounded-full h-24 w-24" />
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
                    <p className="mt-5 text-xl text-start">
                      A 32 year old SDE at Microsft who codes to make ends meet.
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
                    <div onClick={()=>navigate("/profile")} className="flex justify-center items-center w-full h-12 text-xl mt-7 bg-black hover:bg-slate-800 rounded-lg text-white cursor-pointer">
                      View Profile
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
