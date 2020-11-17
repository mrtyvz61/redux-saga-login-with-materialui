export const LOGIN_REQUEST = "LOGIN_OPTIONS/LOGIN_REQUEST";
export const LOGIN_PENDING = "LOGIN_OPTIONS/LOGIN_PENDING";
export const LOGOUT = "LOGIN_OPTIONS/LOGOUT";
export const LOGIN_SUCCESS = "LOGIN_OPTIONS/LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_OPTIONS/LOGIN_ERROR";
export const LOGIN_CANCELLED = "LOGIN_OPTIONS/LOGIN_CANCELLED";
export const SAVE_TOKEN = "LOGIN_OPTIONS/SAVE_TOKEN";
export const DELETE_TOKEN = "LOGIN_OPTIONS/DELETE_TOKEN";
export const LOGGED_IN = "LOGIN_OPTIONS/LOGGED_IN";

export const REGISTER_REQUEST = "REGISTER_OPTIONS/REGISTER_REQUEST";
export const REGISTER_PENDING = "REGISTER_OPTIONS/REGISTER_PENDING";
export const REGISTER_SUCCESS = "REGISTER_OPTIONS/REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_OPTIONS/REGISTER_ERROR";
export const REGISTER_CANCELLED = "REGISTER_OPTIONS/REGISTER_CANCELLED";

export function loggedIn() {
  return { type: LOGGED_IN };
}

export function loginRequest({ email, password }) {
  return {
    type: LOGIN_REQUEST,
    data: { email, password },
  };
}

export function loginOut() {
  return {
    type: LOGOUT,
  };
}

export function registerRequest({ email, password }) {
  return {
    type: REGISTER_REQUEST,
    data: { email, password },
  };
}

export default function reducer(
  state = {
    token: null,
    status: "logged out",
    error: "",
    isLoading: false,
  },
  action
) {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        status: LOGGED_IN,
        isLoading: false,
      };
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case DELETE_TOKEN:
      return {
        ...state,
        token: null,
      };
    case LOGOUT:
      return {
        ...state,
        status: "LOGGED_OUT",
      };
    case LOGIN_ERROR:
      return {
        ...state,
        status: "LOGIN_ERROR",
        error: action.error,
        isLoading: false,
      };
    case LOGIN_CANCELLED:
      return {
        ...state,
        status: "LOGIN_CANCELLED",
        isLoading: false,
      };
    default:
      break;
  }
  return state;
}
