const initialState = {
  currentUser: null,
  currentChat: null,
  rooms: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER": {
      const currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      return {
        ...state,
        currentUser,
      };
    }
    case "SET_CURRENT_CHAT": {
      const currentChatUser = action.payload;
      localStorage.setItem("currentChatUser", JSON.stringify(currentChatUser));
      return {
        ...state,
        currentChatUser,
      };
    }
    case "LOGOUT_USER": {
      localStorage.removeItem("currentUser");
      return {
        ...state,
        currentUser: null,
        currentChat: null,
        rooms: [],
      };
    }
    case "SET_ROOMS": {
      return {
        ...state,
        rooms: action.payload,
      };
    }
    default:
      return state;
  }
};
