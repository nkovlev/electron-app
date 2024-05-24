import { useSelector, useDispatch } from "react-redux";
import { EllipsisVertical } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { fetchRooms } from "../../../functions.js";
import { useNavigate } from "react-router";
import { setCurrentChat } from "../../../Store/User/user.actions";

const ChatHeader = () => {
  const currentChatUser = useSelector(
    (state) => state.userReducer.currentChatUser,
  );
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const isActive = currentChatUser.active;
  const [menuActive, setMenuActive] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuActive(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuRef]);

  const deleteChat = async (roomId) => {
    try {
      await axios.delete(
        ` https://8c65-212-90-62-215.ngrok-free.app/users/chat/${roomId}`,
      );
      await fetchRooms(currentUser.id, dispatch);
      dispatch(setCurrentChat(null));
      navigate("/messages");
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  return (
    <div className="w-[65%] h-16 bg-[#f9fafc] flex items-center justify-between p-3 pt-10 gap-2 fixed top-0 z-10">
      <div className="flex flex-col">
        <p className="text-black text-2xl">{currentChatUser.full_name}</p>
        {isActive ? (
          <div className="flex gap-1 items-center">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <p>Online</p>
          </div>
        ) : (
          <div className="flex gap-1 items-center">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <p>Ofline</p>
          </div>
        )}
      </div>
      <div ref={menuRef}>
        <EllipsisVertical onClick={() => setMenuActive(!menuActive)} />
        <div
          className={`w-32 h-20 bg-neutral-700 absolute right-5 top-16 p-3 ${
            menuActive ? "block" : "hidden"
          }`}
        >
          <p
            className="text-[#f9fafc] text-md font-semibold"
            onClick={() => deleteChat(currentChatUser.room_id)}
          >
            Delete Chat
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
