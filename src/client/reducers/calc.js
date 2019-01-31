import * as actions from '../constants';

const calc = (state = {}, action) => {
  switch (action.type) {
  case actions.SAVE:
    return Object.assign({}, state, {
      number: action.number,
    });
  case actions.GET_ALL_USERS:
    console.log('actions.GET_ALL_USERS:',action);
    return Object.assign({}, state, {
      allUsers: action.payload,
    });
  default:
    return state;
  }
};

export default calc;
