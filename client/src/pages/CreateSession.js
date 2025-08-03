// src/pages/CreateSession.jsx
import React, { useState } from "react";
import API from "../services/api"; // axios instance (withCredentials if using cookie auth)
import { useNavigate } from "react-router-dom";

const defaultJsonContent = {
  steps: [
    {
      type: "",
      duration: 0,
      description: "",
    },
  ],
};

const CreateSession = () => {
  const nav = useNavigate();
  const [data, setData] = useState({
    title: "",
    tags: [], // array for submission
    json_content: defaultJsonContent,
  });
  const [tagsInput, setTagsInput] = useState(""); // raw string for the input
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    if (name === "title" || name === "status") {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTagsChange = (e) => {
    const val = e.target.value;
    setTagsInput(val);
    setData((prev) => ({
      ...prev,
      tags: val
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    }));
  };

  const handleStepChange = (idx, field, value) => {
    setData((prev) => {
      const steps = [...prev.json_content.steps];
      steps[idx] = {
        ...steps[idx],
        [field]: field === "duration" ? Number(value) : value,
      };
      return { ...prev, json_content: { ...prev.json_content, steps } };
    });
  };

  const addStep = () => {
    setData((prev) => ({
      ...prev,
      json_content: {
        ...prev.json_content,
        steps: [
          ...prev.json_content.steps,
          { type: "", duration: 0, description: "" },
        ],
      },
    }));
  };

  const removeStep = (idx) => {
    setData((prev) => {
      const steps = prev.json_content.steps.filter((_, i) => i !== idx);
      return { ...prev, json_content: { ...prev.json_content, steps } };
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const payload = {
        title: data.title,
        tags: data.tags,
        json_content: data.json_content,
        
      };
      await API.post("/session/my-sessions/save-draft", payload); // adjust endpoint if different
      nav("/my-sessions");
    } catch (err) {
      console.error("Create session failed:", err);
      setError(err.response?.data?.message || "Failed to create session.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Wellness Session</h2>
      {error && (
        <div className="mb-3 text-red-700 bg-red-100 p-2 rounded">{error}</div>
      )}
      <form onSubmit={submit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={data.title}
            onChange={handleFieldChange}
            placeholder="Session title"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="tags">
            Tags (comma separated)
          </label>
          <input
            id="tags"
            name="tags"
            value={tagsInput}
            onChange={handleTagsChange}
            placeholder="e.g. yoga, breathing"
            className="w-full p-2 border rounded"
          />
        </div>

       
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block font-medium">Steps</label>
            <button
              type="button"
              onClick={addStep}
              className="text-sm px-3 py-1 bg-green-500 text-white rounded"
            >
              + Add Step
            </button>
          </div>
          {data.json_content.steps.map((step, idx) => (
            <div
              key={idx}
              className="border p-3 rounded mb-2 bg-gray-50 relative"
            >
              <div className="flex gap-4 mb-2">
                <div className="flex-1">
                  <label className="text-sm block mb-1">Type</label>
                  <input
                    type="text"
                    value={step.type}
                    onChange={(e) =>
                      handleStepChange(idx, "type", e.target.value)
                    }
                    className="w-full p-1 border rounded"
                  />
                </div>
                <div className="w-32">
                  <label className="text-sm block mb-1">Duration</label>
                  <input
                    type="number"
                    min={0}
                    value={step.duration}
                    onChange={(e) =>
                      handleStepChange(idx, "duration", e.target.value)
                    }
                    className="w-full p-1 border rounded"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm block mb-1">Description</label>
                <textarea
                  value={step.description}
                  onChange={(e) =>
                    handleStepChange(idx, "description", e.target.value)
                  }
                  className="w-full p-1 border rounded"
                  rows={2}
                />
              </div>
              <button
                type="button"
                onClick={() => removeStep(idx)}
                className="absolute top-2 right-2 text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Create Session"}
        </button>
      </form>
    </div>
  );
};

export default CreateSession;
