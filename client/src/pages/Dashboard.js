import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const nav = useNavigate();

  const handler = async ()=>{
     try {
    await API.post("/auth/logout"); // clears cookie
  } finally {
    localStorage.removeItem("token"); // clear your stored token
    nav("/");
  }
};

  useEffect(() => {
    const fetchPublicSessions = async () => {
      try {
        const res = await API.get("/session/sessions"); 
        setSessions(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch public sessions", err);
      }
    };
    fetchPublicSessions();
  }, []);

  return (
    <div className="p-6  w-screen  ">
      <h1 className="text-2xl font-bold mb-4">Wellness Sessions Dashboard</h1>

      <div className="mb-4 flex items-center gap-4">
        <button
          onClick={() => nav("/my-sessions")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          My Sessions
        </button>
        <button
          onClick={() => nav("/create")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create New Session
        </button>

         <button
          onClick={() => handler() }
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
         logout
        </button>

        <Link to={"/" } className=" text-blue-600 font-bold underline"> Go to home page </Link> 

      </div>

      <h2 className="text-xl font-semibold mb-2">Public Sessions</h2>
      <div className="grid gap-4">
        {sessions.length > 0 ? (
          sessions.map((s) => (
            <div key={s._id} className="border rounded p-4">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-600">By {s.user_id?.email}</p>
              <p className="text-sm">Tags: {s.tags?.join(", ")}</p>
              <p className="text-sm italic">Status: {s.status}</p>
               <p className="text-sm italic">Steps:</p>
              <div className="text-sm italic space-y-1">
              {s.json_content?.steps?.map((st, i) => (
          <div key={i}>
              <span>Type: {st.type}</span>{" "}
                 <p>Duration: {st.duration}</p>
             </div>
                ))}
            </div>

            </div>
          ))
        ) : (
          <p>No published sessions yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
