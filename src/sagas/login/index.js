import { call, cancelled, put, takeEvery } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  DELETE_TOKEN,
  SAVE_TOKEN,
  LOGIN_CANCELLED,
} from "../../reducer/LoginOptions";
import {} from "react-router-dom";

import { History } from "../../App";

import TokenService from "../../utils/token";

export async function authApi(email, password) {
  try {
    const response = await fetch(`https://reqres.in/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function* authorize(email, password) {
  yield put({ type: LOGIN_PENDING });
  try {
    const response = yield call(authApi, email, password);
    const { token, error } = response;
    if (token) {
      yield put({ type: SAVE_TOKEN, token: token });
      TokenService.saveToken(token);
      yield put({ type: LOGIN_SUCCESS });
    } else {
      yield put({ type: LOGIN_ERROR, error: error });
    }
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error: error });
  } finally {
    if (yield cancelled()) {
      yield put({ type: LOGIN_CANCELLED });
    }
  }
}

export function* loginFlow({ data }) {
  debugger;
  const { email, password } = data;
  yield authorize(email, password);
}

export function* logoutFlow() {
  debugger;
  yield put({ type: DELETE_TOKEN });
  TokenService.destroyToken();
  yield History.push("/login");
}

export function* manageRoute() {
  // yield History.push("/app");
  yield put((window.location.href = "/home"));
}

export default function* loginSagas() {
  yield takeEvery(LOGIN_REQUEST, loginFlow);
  yield takeEvery(LOGIN_SUCCESS, manageRoute);
  yield takeEvery(LOGOUT, logoutFlow);
}
