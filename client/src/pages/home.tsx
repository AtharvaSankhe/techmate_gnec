import { useNavigate } from "react-router-dom";
import Homenavbar from "../components/navbarHome";
import logo from "../assets/home-bgd.svg";
import userReviews from "../utils/reviews";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="">
      <Homenavbar />
      <div className="flex justify-center items-center bg-blue-50">
        <div className="mt-10 mb-10 sm:mb-40 mx-5 sm:mx-20 lg:mb-40 lg:mt-20">
          <p className="text-blue-700 ">#Explore_Your_Options</p>
          <div className="text-5xl mt-5 mb-5 font">
            Your{" "}
            <span className="font-bold underline text-blue-500">
              Connection
            </span>{" "}
            is
            <br /> just a Click Away....
          </div>
          <div className="mb-5">
            Lorem ipsum dolor sit amet consectetur.
            <br /> Eu vulputate ut purus hendrerit at laoreet dolor vivamus.
            Euismod enim
            <br />
            diam natoque faucibus. In libero magna ipsum nisl enim in. Start
            Shopping
          </div>
          <div className="py-3.5 text-center text-white bg-black rounded-full md:block px-9 mb-10 hover:bg-blue-600 cursor-pointer" onClick={() => {
                  navigate("/signUp");
                }}>
            Start Exploring
          </div>
          <div className="gap-5 flex-wrap sm:gap-20 flex ">
            <div>
              <p className="font-bold text-3xl">10,000</p>
              <p>Collection of Events</p>
            </div>
            <div>
              <p className="font-bold text-3xl">25,000+</p>
              <p>Happy Users 🥰</p>
            </div>
            <div>
              <p className="font-bold text-3xl">5,000+</p>
              <p>StartUp's Born</p>
            </div>
          </div>
        </div>
        <div>
          {/* <img className="self-center h-70 lg:w-70 sm:hidden" src={logo} alt="" /> */}
          <img
            className="self-center hidden lg:block"
            src={logo}
            alt=""
          />
        </div>
      </div>
      {/* section2 */}
      <div className="flex justify-centerpy-0 mx-2 sm:py-8 sm:mx-20">
        <div className="max-w-5.5xl mx-4 mb-10 my-7 sm:mx-auto">
          <h1 className="mb-4 text-3xl font-medium leading-snug sm:text-4xl sm:leading-tight ">
            A Seamless{" "}
            <span className="underline text-sky-600">Experience</span> is what
            we offer...
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Nullam tortor amet aliquet.
          </p>
          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-20 mt-6 mb-6 sm:mt-10 sm:mb-9">
            <div className="py-8 mb-0 text-white rounded-lg bg-slate-800 sm:w-80 px-9">
              <div className="flex items-center bg-black w-fit px-3 py-1.5 rounded-2xl">
                <div className="bg-accent-blue-600 rounded-full h-1.5 w-1.5 "></div>
                <span className="ml-2 text-xs font-light text-white">
                  Feature 1
                </span>
              </div>
              {/* <TruckSVG /> */}
              <h2 className="my-2 text-xl">Real-Time Messaging</h2>
              <p className="font-light text-slate-400">
                Connect and communicate instantly with our seamless real-time
                messaging system.
              </p>
            </div>
            <div className="py-8 mb-0 text-white rounded-lg bg-slate-800 sm:w-80 px-9">
              <div className="flex items-center bg-black w-fit px-3 py-1.5 rounded-2xl">
                <div className="bg-accent-pink rounded-full h-1.5 w-1.5 "></div>
                <span className="ml-2 text-xs font-light text-white">
                  Feature 2
                </span>
              </div>
              {/* <RefundSVG /> */}
              <h2 className="my-2 text-xl">Privacy Controls</h2>
              <p className="font-light text-slate-400">
                Take charge of your privacy with customizable settings for a
                secure online experience.
              </p>
            </div>
            <div className="py-8 mb-0 text-white rounded-lg bg-slate-800 sm:w-80 px-9">
              <div className="flex items-center bg-black w-fit px-3 py-1.5 rounded-2xl">
                <div className="bg-accent-green rounded-full h-1.5 w-1.5 "></div>
                <span className="ml-2 text-xs font-light text-white">
                  Feature 3
                </span>
              </div>
              {/* <LockSVG /> */}
              <h2 className="my-2 text-xl">Event's Near You</h2>
              <p className="font-light text-slate-400">
                Discover technical events and stay updated with the latest in
                technology .
              </p>
            </div>
          </div>
          <p className="text-slate-400">
            Please refer our{" "}
            <a className="text-black underline cursor-pointer">
              customer policy
            </a>{" "}
            for more information.
          </p>
        </div>
      </div>
      {/* sction 3 */}
      <div className="  bg-gray-900 text-white ">
        <br />
        <p className="text-center text-3xl mt-10">
          Our <span className="font-bold text-blue-400 underline">User's</span>{" "}
          love us
        </p>
        <div className="sm:flex justify-center items-center flex-wrap lg:flex-nowrap bg-gray-900 text-white sm:mx-20 mb-10">
          {userReviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-gray-800 p-4 rounded-lg my-10 mx-5 sm:mx-10"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.pic}
                  alt="review_pic"
                  className="rounded-full h-12 w-12"
                />
                <h3 className="text-xl font-semibold ml-2">{review.name}</h3>
              </div>
              <hr className="border-gray-600 my-4" />
              <p className="text-lg">{review.review}</p>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="py-8 sm:py-10 bg-slate-800 ">
          <div className="flex flex-col-reverse mx-5 sm:flex-row justify-center max-w-5.5xl  ">
            {/* Services */}
            <div className="mt-2 mb-3 text-sm font-light w-44 text-primary-400">
              <h1 className="mb-4 text-base text-white">Services</h1>
              <p>Free Shipping</p>
              <p>Full Refund</p>
              <p>24/7 Customer Service</p>
            </div>
            {/* Routes */}
            <div className="w-32 mt-2 mb-3 text-sm font-light text-primary-400">
              <h1 className="mb-4 text-base text-white">Routes</h1>
              <p>Store</p>
              <p>About Us</p>
              <p>Contact</p>
            </div>
            {/* location */}
            <div className="w-40 mt-2 mb-3 text-sm font-light text-primary-400">
              <h1 className="mb-4 text-base text-white">Location</h1>
              <p>Mumbai</p>
              <p>Delhi</p>
              <p>Kolkata</p>
              <p>Bangalore</p>
            </div>
            {/* Newsletter */}
            <div className="mt-2 mb-3 text-sm font-light sm:w-60 text-primary-400">
              <h1 className="mb-4 text-base text-white">
                Sign up to our newsletter.
              </h1>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
              <div className="relative w-full mt-3">
                {/* <input
                className="w-full px-4 py-3 text-white rounded outline-none bg-accent-blue-33"
                type="text"
                placeholder="Email Address"
              /> */}
              </div>
              <button
                className="px-20 py-2 text-white bg-black hover:bg-blue-600"
                onClick={() => {
                  navigate("/newsletter");
                }}
              >
                Click me{" "}
              </button>
            </div>
          </div>
          <div className="mx-40">
            <hr />
          </div>
          <div className="mx-auto mt-5 sm:w-96">
            <p className="mt-5 text-sm text-center  sm:w-auto text-primary-400">
              Copyright © 2023 TechMate. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="bg-slate-800 ">
        <div className="bg-gradient-to-b from-blue-200 to-slate-800 width-screen h-4 rounded-t-3xl">
</div>


        </div>
      </div>
    </div>
  );
}
