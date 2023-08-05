import { ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import Sidebar from "../components/sidebar";
import PhoneMenu from "../components/phonemenu";
import axios from "axios";
import logo from "../assets/logo_white_bgd.svg";

export default function TechmateProfile() {
  interface PostData {
    postContent: string;
    postSubject: string;
  }
  interface UserDataItem {
    username: string;
    email: string;
    profession: string;
    gender: string;
    location: { [key: string]: string }; // Assuming location is a key-value pair with both keys and values being strings
    post: PostData[]; // An array of PostData objects
    postnum:number
  }
  const [userData, setUserData] = useState<UserDataItem[]>([]);
  const [userImage, setUserImage] = useState<string>("");

  const navigate=useNavigate();
  useEffect(() => {
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
        if (userCreatedResponse)
        setUserImage(userCreatedResponse.data.imageurl);
        setUserData(userCreatedResponse.data.user_data);
        console.log(userCreatedResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex ">
      <div className="hidden md:block ">
        <Sidebar name="profile" />
      </div>
      <div className="bottom-0 border-t-2 border-DBDBDB fixed md:hidden">
        <PhoneMenu name="profile" />
      </div>
      {userData  && (
        
        <div className="py-4 md:py-16 h-screen w-screen md:bg-white ml-2 mr-5 md:ml-72">
          <img src={logo} alt="" className="md:hidden mb-8"/>
          <div className="sm:flex items-center justify-center">
            <div className="sm:py-10 flex justify-center">
              <img src={userImage} alt="" className="rounded-full h-44 w-44" />
            </div>
            <div className="sm:ml-20">
              <div className="flex  mt-10 sm:mt-5 text-3xl">
                <p className="text-gray-600">{userData.username}</p>
                <div className="flex items-center justify-center rounded-xl ml-10 text-xl  bg-black text-white hover:bg-blue-700 cursor-pointer w-full  md:w-60 md:h-10 ">
                  <p>Edit Profile</p>
                </div>
              </div>
              <div className="flex mt-5 gap-5">
                <p>76 Connects</p>
                <p>23 Requests</p>
                {userData && userData.post &&<p>{userData.post.length} Post</p>}
              </div>
              <div className="mt-5">
                <h1 className="text-xl underline">About me:</h1>
                <p className="">-Hi,I am @{userData.username}.</p>
                <p>-I Identify as a {userData.gender}</p>
                <p>
                  -You can Connect with me{" "}
                  <a
                    href={`mailto:${userData.email}`}
                    style={{ color: "blue" }}
                  >
                    @{userData.email}
                  </a>
                </p>
                {userData.profession == "Student" && (
                  <p>
                    -I am a student looking to connect with talented individual
                  </p>
                )}
                {userData.profession == "Organization" && (
                  <p>
                    -I am a recruiter looking to connect with talented
                    individual
                  </p>
                )}
              </div>
            </div>
          </div>
          <hr className="ml-4"/>
          <div className="flex justify-center items-center py-40 text-xl  ">
            <div className="flex justify-center items-center rounded-full h-10 w-80  bg-blue-600 text-white cursor-pointer" onClick={()=>{navigate("/post")}}>
            <p>+ Start with a new post</p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
