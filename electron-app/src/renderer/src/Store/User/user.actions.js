export const setCurrentUser = (user) => ({
  type: "SET_CURRENT_USER",
  payload: user,
});

export const setCurrentChat = (chat) => ({
  type: "SET_CURRENT_CHAT",
  payload: chat,
});

export const logoutUser = () => ({
  type: "LOGOUT_USER",
});

export const setRooms = (rooms) => ({
  type: "SET_ROOMS",
  payload: rooms,
});
