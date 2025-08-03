import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/bghome.svg";



const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token",token);
    {token && setLoggedIn(true)}
  }, []);


  return (
    <div className="min-h-screen bg-slate-300 flex flex-col  items-center  p-6" style={{ backgroundImage: `url(${bg})` }} >
      <div className="max-w-2xl flex flex-col gap-4 mt-32 mx-auto  w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-black">
  Wellness Session Platform
</h1>
        <p className="mb-6 text-gray-700 font-semibold">
         "Wellness is the complete integration of body, mind, and spirit — the realization that everything we do, think, feel, and believe has an effect on our state of well-being."
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {!loggedIn && (
            <>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login
              </Link>
            </>
          )}
          {loggedIn && (
            <div className=" flex flex- col">
            <div className="">


            </div>
           
           <div className="flex gap-2 mt-3">
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Dashboard
              </Link>
              <Link
                to="/my-sessions"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                My Sessions
              </Link>
            </>
           </div>

            </div>
          )}
        </div>

       
      </div>
    </div>
  );
};

export default Home;
