import { useEffect, useState, useRef } from "react";
import { Send } from "lucide-react";
import ChatHeader from "./ui/ChatHeader";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket.js";
import { setCurrentChat } from "../../Store/User/user.actions.js";
import axios from "axios";
import ChatMessage from "../../components/ChatMessage.jsx";
import { fetchRooms } from "../../functions.js";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [roomId, setRoomId] = useState(null);
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const currentChatUser = useSelector(
    (state) => state.userReducer.currentChatUser,
  );
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (currentChatUser && currentChatUser.room_id) {
      const newRoomId = currentChatUser.room_id;
      setRoomId(newRoomId);
      fetchMessages(newRoomId);
    } else {
      setMessages([]);
    }
  }, [currentChatUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async (roomId) => {
    try {
      const response = await axios.post(
        "https://8c65-212-90-62-215.ngrok-free.app/users/messagesByRoomId",
        { room_id: roomId },
      );
      const formattedMessages = response.data.map((message) => ({
        ...message,
        timestamp: new Date(message.timestamp).toISOString(),
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      socket.onmessage = (event) => {
        try {
          const receivedMessage = JSON.parse(event.data);
          if (
            receivedMessage.type === "message" &&
            receivedMessage.room_id === roomId
          ) {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                ...receivedMessage,
                timestamp: new Date(receivedMessage.timestamp).toISOString(),
              },
            ]);
          }
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      };
    }
  }, [currentUser, roomId]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      if (!roomId) {
        const response = await axios.post(
          "https://8c65-212-90-62-215.ngrok-free.app/users/room",
          {
            chat_item_id: currentChatUser.id,
            user_id: currentUser.id,
          },
        );
        const { roomId: newRoomId } = response.data;

        if (newRoomId) {
          setRoomId(newRoomId);
          dispatch(setCurrentChat({ ...currentChatUser, room_id: newRoomId }));
          fetchRooms(currentUser.id);
          await sendSocketMessage(newRoomId);
        } else {
          console.log("Room does not exist for this chat");
        }
      } else {
        await sendSocketMessage(roomId);
      }
    } catch (error) {
      console.error("Failed to check room:", error.response?.data?.error);
    }
  };

  const sendSocketMessage = async (roomId) => {
    const messageData = {
      id: Math.floor(Math.random() * 1000000),
      sender_id: currentUser.id,
      recepient_id: currentChatUser.id,
      room_id: roomId,
      message_text: newMessage,
      timestamp: new Date().toLocaleString("en-US", {
        timeZone: "Europe/Kiev",
      }),
    };

    socket.send(JSON.stringify({ ...messageData, type: "message" }));
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setNewMessage("");
  };

  const deleteMessage = async (messageId) => {
    try {
      await axios.delete(
        `https://f707-212-90-62-215.ngrok-free.app/users/message/${messageId}`,
      );
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== messageId),
      );
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {!currentChatUser ? (
        <div className="w-full h-screen bg-neutral-600 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">
            Select the chat first
          </h1>
        </div>
      ) : (
        <div className="w-full h-screen bg-[#f9fafc]">
          <ChatHeader />
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-white font-semibold text-md">
              <span>Oops</span>
              <span>{`You don't have messages with this user`}</span>
            </div>
          ) : (
            <div className="p-4 py-24 h-full overflow-scroll">
              {messages.map((el) => (
                <ChatMessage
                  key={el.id}
                  id={el.id}
                  position={el.sender_id === currentUser.id ? "right" : "left"}
                  text={el.message_text}
                  messageTime={el.timestamp}
                  onClick={() => deleteMessage(el.id)}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
          <div className="flex fixed bottom-0 pl-2 w-[65%] py-6 px-2 bg-[#f9fafc]">
            <input
              type="text"
              placeholder="Type here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full py-3 px-4 rounded-l-md bg-[#dbdcff]"
            />
            <button
              className="px-4 bg-[#dbdcff] rounded-r-md"
              onClick={sendMessage}
            >
              <Send className="text-[#8685B0]" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
