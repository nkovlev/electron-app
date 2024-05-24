// fetchRooms.js
import axios from "axios";
import { setRooms } from "./Store/User/user.actions";

export const fetchRooms = async (currentUserId, dispatch) => {
  try {
    const response = await axios.get(
      `https://8c65-212-90-62-215.ngrok-free.app/users/rooms/${currentUserId}`,
    );

    const roomsWithLastMessages = await Promise.all(
      response.data.rooms.map(async (room) => {
        const lastMessageResponse = await axios.get(
          `https://8c65-212-90-62-215.ngrok-free.app/users/lastMessage/${room.room_id}`,
        );
        return {
          ...room,
          lastMessage: lastMessageResponse.data,
        };
      }),
    );

    dispatch(setRooms(roomsWithLastMessages));
  } catch (error) {
    console.error(
      "Fetch rooms failed:",
      error.response ? error.response.data.error : error.message,
    );
  }
};
