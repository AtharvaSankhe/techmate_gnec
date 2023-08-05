import { ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import Sidebar from "../components/sidebar";
import PhoneMenu from "../components/phonemenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import logo from "../assets/logo_white_bgd.svg";
import load from "../assets/load.gif"

export default function TechmateEvents() {
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
    // Add other properties as needed
  }

  interface SummarizationState {
    text: string;
    summary: string;
  }
  
  const [userData, setUserData] = useState<UserDataItem[]>([]);
  const [userImage, setUserImage] = useState<string>("");
  const [newpost, setNewPost] = useState<string>("");
  const [newsubject, setNewSubject] = useState<string>("");
  const [allPost, setAllPost] = useState([]);

  const [modal, setModal] = useState(false);
  const [summarization, setSummarization] = useState<SummarizationState>({
    text: '',
    summary: '',
  });
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
      if (userCreatedResponse) setUserImage(userCreatedResponse.data.imageurl);
      setUserData(userCreatedResponse.data.user_data);
      console.log(userCreatedResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAllChat = async () => {
    try {
      const userCreatedResponse = await axios.post(
        "http://127.0.0.1:8080/events",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(userCreatedResponse);
      setAllPost(userCreatedResponse.data);
      // if (userCreatedResponse) setUserImage(userCreatedResponse.data.imageurl);
      // setUserData(userCreatedResponse.data.user_data);
      // console.log(userCreatedResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAllChat();
  }, []);

  async function addPost() {
    if (newpost.length && newsubject.length) {
      console.log(newpost);
      console.log(newsubject);
      try {
        const userCreatedResponse = await axios.post(
          " http://127.0.0.1:8080/post",
          {
            newpost,
            newsubject,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        // console.log(userCreatedResponse);
        if (userCreatedResponse.data === "document updated") {
          toast.success("Post added");
          fetchData();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please Enter both the fields before adding a new post");
      console.log(userData.post);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addPost();
    }
  };

 

  function Textsummary(chatData) {
    async function performSummarization() {
      try {
        setModal(true);
        const response = await axios.post("http://localhost:8081/summarize", {
          text: chatData.postContent,
        });
        console.log(response)
        const summary = response.data.summary;
        // Set the modal to be visible and update the summarization state
        setSummarization({ text: chatData.postContent, summary });
      } catch (error) {
        console.error("Error summarizing text:", error);
      }
    }
  
    performSummarization();
  }
  

  return (
    <div className="flex">
      <div className="hidden md:block">
        <Sidebar name="Events" />
      </div>
      
      <div className="bottom-0 border-t-2 border-DBDBDB fixed md:hidden">
        <PhoneMenu name="Events" />
      </div>

      
      {modal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-screen mx-5 md:ml-96 md:mr-24">
      <h2 className="text-xl font-semibold">POST SUMMARY</h2>
      <div className="flex items-center justify-center "> {/* Centering container */}
        {summarization.summary.length === 0 && <img src={load} alt=""/>}
        {summarization.summary.length > 0 && <p className="text-sm md:text-xl">{summarization.summary}</p>}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            setModal(false);
            setSummarization({ text: '', summary: '' });
          }}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}



      {userData && allPost && (
        <div className="mt-2 sm:mt-10  w-screen md:ml-72">
          <img src={logo} alt="" className="mt-1 mb-4 md:hidden" />
          <div>
            <div className="flex gap-0 md:gap-10  bg-blue-50 rounded-xl mx-2 md:mx-20 border-2  ">
              <div className="">
                <img
                  src={userImage}
                  alt=""
                  className="ml-2 md:ml-8 my-6 h-16 w-16 md:h-20 md:w-20 rounded-full hidden sm:block"
                />
              </div>
              <div className="w-full my-4 mr-6 md:mx-0 md:mr-8">
                <input
                  className="sm:mt-6 px-1 m-1 sm:m-4 rounded-full w-full h-10 border-2"
                  placeholder="Write your own post"
                  onClick={() => {
                    navigate("/post");
                  }}
                />

                <div className="flex justify-end sm:hidden">
                  <p className="my-2 ml-2"></p>
                  <img
                    src={userImage}
                    alt=""
                    className="ml-2 md:ml-8  h-10 w-10 md:h-10 md:w-10 rounded-full "
                  />
                  <p className="my-2 mx-2">{userData.username}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 mt-5 md:mx-20">
            <hr className="bg-black mx-10 md:mx-0" />
            <div className="mt-5 mx-2 md:mx-0">
              <div className="flex-col text-xl font-bold  mx-2  mb-8 sm:mx-0 ">
                <h1 className="font-normal text-2xl sm:text-3xl  bg-gradient-to-r from-blue-800 to-indigo-600  text-transparent bg-clip-text underline">Check what other's are up to:</h1>
                <div className="flex">
                Sort by: 
                <p className="underline mx-2 cursor-pointer">Most Recent Posts</p>

                </div>
              </div>
              {allPost && (
                <>
                  {allPost.length && allPost.map((data, index) => (
                    <div key={index}>
                      <div>
                        {data.chat && data.chat.map((chatData, chatIndex) => (
                          <div key={chatIndex}>
                            {/* Render chat data here */}
                            <div className="bg-blue-100 rounded-xl px-4 py-2">
                              <h1 className="text-2xl text-bold pt-4">Title:{chatData.postSubject}</h1>
                              <hr className="h-2"/>
                              <h1 className="text-md ">{chatData.postContent}</h1>
                              <div className="flex justify-end">
                                <p className="text-xl underline hover:text-blue-600 cursor-pointer mb-2">~{data.username}</p></div>
                              <div className="h-10 w-full my-2  rounded-full bg-black hover:bg-blue-600 cursor-pointer text-white flex justify-center items-center" onClick={()=>{Textsummary(chatData)}} > Show summary </div>
                              {/* <div className="h-10 w-full my-2  rounded-full bg-black hover:bg-blue-600 cursor-pointer text-white flex justify-center items-center" onClick={()=>{ setModal(true);setSummarization({ text: chatData.postContent, summary: '' });}} > Show summary </div> */}
                            </div>
                              <hr className="my-4"/>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
              <div className="text-center text-xs mb-16 md:mb-8">
                  Unlock endless opportunities – share your passion, skills, and achievements through powerful posts and connect with employers on a whole new level!"
                  </div>

              {!allPost && (
                <div className="h-60 flex justify-center items-center text-xl">
                  No one has posted anything yet!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
