// ContactsList.js
import { useEffect, useState } from "react";
import ChatItem from "../../components/ChatItem";
import supabase from "../../supabase.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../../Store/User/user.actions.js";
import { fetchRooms } from "../../functions.js"; // Импорт функции fetchRooms

const ContactsList = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer.currentUser);
  const rooms = useSelector((state) => state.userReducer.rooms);

  const handleInputChange = async (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm.trim() === "") {
      setUsers([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("users")
        .select("full_name, id, active")
        .ilike("full_name", `%${searchTerm}%`)
        .neq("full_name", currentUser.full_name);

      if (error) {
        throw error;
      }

      setUsers(data);
    } catch (error) {
      console.error(
        "Ошибка при получении данных из таблицы пользователей:",
        error.message,
      );
    }
  };

  const handleChatSelect = async (user) => {
    if (!user) {
      console.error("Selected user is null or undefined");
      return;
    }

    try {
      const response = await axios.post(
        "https://8c65-212-90-62-215.ngrok-free.app/users/room",
        {
          chat_item_id: user.id,
          user_id: currentUser.id,
        },
      );

      const { roomId } = response.data;

      if (roomId) {
        setSelectedChat(user);
        setSearchTerm("");
        dispatch(setCurrentChat({ ...user, room_id: roomId }));
        await fetchRooms(currentUser.id, dispatch);
      } else {
        console.log("Room does not exist for this chat");
      }
    } catch (error) {
      console.error("Failed to check room:", error.response?.data?.error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchRooms(currentUser.id, dispatch);
    }
  }, [currentUser, dispatch]);

  return (
    <div className="w-[27%] h-screen flex flex-col items-center bg-[#f9fafc]">
      <div className="w-[80%] py-6 flex flex-col gap-4">
        <input
          type="search"
          name="search"
          placeholder="Search..."
          className="bg-[#dbdcff] p-[10px] text-black rounded-lg"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div className="flex flex-col gap-1 overflow-y-scroll">
          {searchTerm ? (
            users.length > 0 ? (
              users.map((user) => (
                <ChatItem
                  key={user.id}
                  username={user.full_name}
                  selected={selectedChat === user}
                  onClick={() => handleChatSelect(user)}
                />
              ))
            ) : (
              <div className="w-full flex justify-center items-center h-10">
                <p className="text-black text-md font-semibold">
                  No users found
                </p>
              </div>
            )
          ) : rooms.length > 0 ? (
            rooms.map((room) => (
              <ChatItem
                key={room.room_id}
                date={new Date(room.lastMessage.timestamp)}
                username={room.user.full_name}
                lastmessage={room.lastMessage}
                selected={selectedChat && selectedChat.id === room.user.id}
                onClick={() => handleChatSelect(room.user)}
              />
            ))
          ) : (
            <div className="w-full flex justify-center items-center h-10">
              <p className="text-black text-md font-semibold">No rooms found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsList;
