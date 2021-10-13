const rootReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_LOGIN_UI_VISIBILITY":
      const visibilityValue = !state.showLogin;
      return {
        ...state,
        showLogin: visibilityValue,
      };
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
        authenticated: true,
      };
    default:
      return state;
  }
};

export default rootReducer;
