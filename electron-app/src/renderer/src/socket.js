const URL = "wss://8c65-212-90-62-215.ngrok-free.app";

export const socket = new WebSocket(URL);

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
