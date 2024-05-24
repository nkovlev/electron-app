import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Routers from "./Routers";
import { socket } from "./socket.js";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="flex gap-3">
      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <ClipLoader color="green" loading={loading} size={50} />
        </div>
      ) : (
        <Routers />
      )}
    </div>
  );
}

export default App;
