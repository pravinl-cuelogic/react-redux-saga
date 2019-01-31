import { takeEvery, call, put } from "redux-saga/effects"
import * as actions from '../constants';
import "isomorphic-fetch"


export function* initalize() {
  try {
    yield put({
      type: actions.SAVE,
      number: 100,
    });
  } catch (e) {
    yield put({ type: 'INITALIZE_APPLICATION_FAILED', number: null });
  }
}

export function* initalizeWatcher() {
  yield takeEvery(actions.INITALIZE_APPLICATION, initalize);
}

export function* addnumber(action) {
  try {
    yield put({ type: actions.SAVE, number: action.payload.number + 1 });
  } catch (e) {
    yield put({ type: 'ADD_FAILED', message: e.message });
  }
}

export function* addWatcher() {
  yield takeEvery(actions.ADD, addnumber);
}
export default addWatcher;


export function* changenumber(action) {
  try {
    yield put({ type: actions.SAVE, number: action.payload.number });
  } catch (e) {
    yield put({ type: 'CHANGE_FAILED', message: e.message });
  }
}

export function* changeWatcher() {
  yield takeEvery(actions.CHANGE, changenumber);
}


export function* subnumber(action) {
  try {
    yield put({ type: actions.SAVE, number: action.payload.number - 1 });
  } catch (e) {
    yield put({ type: 'SUB_FAILED', message: e.message });
  }
}

export function* subWatcher() {
  yield takeEvery(actions.SUB, subnumber);
}

const API_URL = "https://randomuser.me";

// get all channels data of user
function* getAllUsers() {
    console.log('API_URL',API_URL)  
    try {
        // ?page=1&results=10
        const response = yield call(fetch, API_URL + "/api/", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        if (response.status === 200) {
            const users = yield response.json();
            console.log('response=>',users.results);
            yield put({ type: actions.GET_ALL_USERS, payload: users.results });
        }
        else {
            // yield put({ type: actionTypes.CHANNEL_ALL_SUCCESS, payload: [] });
            throw { message: "Error in posting contactus data. Try again." }
        }
    }
    catch (error) {
        console.log(error)
    }
}

export function* allUsersWatcher() {
  yield takeEvery(actions.GET_ALL_USERS, getAllUsers);
}