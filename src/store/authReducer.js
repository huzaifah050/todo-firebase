const initState = {
  authError: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.log('error');
      return { ...state, authError: action.err.messgae };

    case 'LOGIN_SUCCESS':
      console.log('login success');
      return { ...state, authError: null };
    case 'SIGNOUT_SUCCESS':
      console.log('logout');
      return state;

    case 'SIGNUP_SUCCESS':
      console.log('signup suceess');
      return {
        ...state,
        authError: null,
      };

    case 'SIGNUP_ERROR':
      console.log('signup error');
      // console.log(action);
      return {
        ...state,
        authError: action.err,
      };
    default:
      return state;
  }
};
