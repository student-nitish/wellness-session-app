import React, { useState, useEffect, useRef } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SessionEditor = ({ existing }) => {
  const [title, setTitle] = useState(existing?.title || "");
  const [tags, setTags] = useState(existing?.tags?.join(", ") || "");
  const [jsonContent, setJsonContent] = useState(
    existing?.json_content ? JSON.stringify(existing.json_content, null, 2) : "{}"
  );
  const [sessionId, setSessionId] = useState(existing?._id || null);
  const [statusMsg, setStatusMsg] = useState("");
  const inactivityRef = useRef(null);
  const nav =useNavigate();

  const saveDraft = async () => {
    try {
      const parsed = JSON.parse(jsonContent);
      const payload = {
        sessionId,
        title,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        json_content: parsed,
      };
      const res = await API.post("/session/my-sessions/save-draft", payload);
      if (!sessionId && res.data.data._id) setSessionId(res.data.data._id);
      setStatusMsg("Auto-saved");
      setTimeout(() => setStatusMsg(""), 1500);
    } catch (err) {
      setStatusMsg("Save failed");
      console.error(err);
    }
  };

  // Save after 5 seconds of inactivity on any of the tracked fields.
useEffect(() => {
  // Reset previous inactivity timer whenever inputs change.
  clearTimeout(inactivityRef.current);

  // Schedule a draft save 5s after the last change.
  inactivityRef.current = setTimeout(() => {
    saveDraft();
  }, 5000);

  // Cleanup if the effect re-runs or component unmounts.
  return () => clearTimeout(inactivityRef.current);
}, [title, tags, jsonContent]); // runs whenever any content changes

// Periodic fallback: ensure we save at least every 30 seconds even if the user
// is continuously editing (so the debounce never fires).
useEffect(() => {
  const interval = setInterval(() => {
    saveDraft();
  }, 30000); // every 30s

  // Cleanup on unmount.
  return () => clearInterval(interval);
}, []); // empty deps so the interval isn’t reset on every edit


  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <input
          className="text-2xl font-semibold border p-2 flex-grow"
          placeholder="Session Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="text-sm ">{statusMsg}</div>
      </div>
      <input
        placeholder="Tags (comma separated)"
        className="w-full border p-2"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <textarea
        className="w-full h-64 border p-2 font-mono"
        value={jsonContent}
        onChange={(e) => setJsonContent(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={saveDraft}
        >
          Save Draft
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={async () => {
            // publish     
           const res= await API.post("/session/my-sessions/publish", { sessionId });
            setStatusMsg("Published");
            nav("/my-sessions");
          }}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default SessionEditor;
