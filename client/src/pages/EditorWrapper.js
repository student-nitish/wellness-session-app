import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import API from "../services/api";
import SessionEditor from "../components/sessionEditor";

const EditorWrapper = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSession = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/session/my-sessions/${id}`);
        if (isMounted) {
          setSession(res.data?.data ?? null);
        }
      } catch (err) {
        console.error("Failed to fetch session:", err);
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) {
      fetchSession();
    } else {
      setLoading(false);
      setError(new Error("No session ID provided"));
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error.message || "Failed to load session."}</div>;
  if (!session) return <div>No session found.</div>;

  return <SessionEditor existing={session} />;
};

export default EditorWrapper;