import { takeEvery, call, put } from "redux-saga/effects"
import * as actions from '../constants';
import "isomorphic-fetch"

const sampleUser = [{"gender":"female","name":{"title":"ms","first":"karla","last":"petersen"},"location":{"street":"7930 kratvej","city":"gjern","state":"syddanmark","postcode":27377,"coordinates":{"latitude":"-36.1589","longitude":"14.3791"},"timezone":{"offset":"-6:00","description":"Central Time (US & Canada), Mexico City"}},"email":"karla.petersen@example.com","login":{"uuid":"7cb3c73e-3c99-463b-a90d-a98549628ba0","username":"smallmouse622","password":"1234qwer","salt":"UMKzoQkJ","md5":"2ba119f9f36154a3d9df905aca916304","sha1":"562889ddaf22300038468aa318c880a30a292e3e","sha256":"366a25f57174f5242b842252ea6d157e4479fb54c2a87628ee286f467f4d5561"},"dob":{"date":"1972-06-30T10:29:16Z","age":46},"registered":{"date":"2007-12-07T16:10:58Z","age":11},"phone":"54157603","cell":"68576574","id":{"name":"CPR","value":"692491-2727"},"picture":{"large":"https://randomuser.me/api/portraits/women/26.jpg","medium":"https://randomuser.me/api/portraits/med/women/26.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/26.jpg"},"nat":"DK"}]

export function* initalize() {
  try {
    yield put({
      type: actions.SAVE,
      number: 100,
      allUsers: sampleUser,
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