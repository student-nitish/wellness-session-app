import { useEffect, useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const load = async () => {
    
      const res = await API.get("/session/my-sessions");
      console.log("result",res);
      setSessions(res.data.data);
    };
    load();
  }, []);

  return (
    <div className=" bg-slate-300   w-screen h-screen">
      <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Sessions</h2>
      <div className="grid gap-4">
      {
        sessions.length ===0  && <p className=" font-semibold text-black"> No session created by you </p> 
      }
        {sessions.map((s) => (
          <div key={s._id} className="border p-4 rounded">
            <h3 className="font-semibold">{s.title}</h3>
            <div className="text-sm mb-2">
              Status: <span className="capitalize">{s.status}</span>
            </div>
            <button
              onClick={() => nav(`/edit/${s._id}`)}
              className="bg-indigo-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <div> <Link to={"/dashboard"} className=" text-blue-600 font-bold underline" > Go to dashbaord </Link></div>
    </div>

   
    </div>
    
  );
};

export default MySessions;
