export default (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
            ...state,
            token: action.payload.token,
            isLoggined: true,
            type: action.payload.type,
        }
        case "LOGOUT":
            return {
                ...state,
                token: null,
                isLoggined: false,
                type: null,
            }
        default:
            return state;
    }
  };
  