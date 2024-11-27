import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:5000", {
  withCredentials: true,
  transports: ["websocket", "polling"], // Ensure both transports are supported
});

async function joinSocketRoom() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found. Cannot join room.");
    return;
  }

  try {
    // Dynamically import jwt-decode
    const { default: jwtDecode } = await import("jwt-decode");
    const decoded = jwtDecode(token); // Decode the token
    const userId = decoded.userId || decoded.sub; // Adjust based on your token's structure

    if (userId) {
      socket.emit("join_room", { userId }, (response) => {
        console.log("Joined room successfully:", response);
      });
    } else {
      console.error("User ID not found in token payload.");
    }
  } catch (error) {
    console.error("Error decoding token or joining room:", error);
  }
}

export { socket, joinSocketRoom };
