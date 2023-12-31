export const GET_REGISTRATION_REQUEST = 'GET_REGISTRATION_REQUEST';
export const GET_REGISTRATION_SUCCESS = 'GET_REGISTRATION_SUCCESS';
export const GET_REGISTRATION_FAILED = 'GET_REGISTRATION_FAILED';

export const GET_LOGIN_REQUEST = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';
export const GET_LOGIN_FAILED = 'GET_LOGIN_FAILED';

export const GET_LOGIN_OUT_SUCCESS = 'GET_LOGIN_OUT_SUCCESS';

export const getRegistrationRequest = () => ({
    type: GET_REGISTRATION_REQUEST,
});
  
export const getRegistrationSuccess = (registrationData) => ({
    type: GET_REGISTRATION_SUCCESS,
    payload: registrationData,
});
  
export const getRegistrationFailed = (error) => ({
    type: GET_REGISTRATION_FAILED,
    error: error,
});

export const getLoginRequest = () => ({
    type: GET_LOGIN_REQUEST,
});
  
export const getLoginSuccess = (loginData) => ({
    type: GET_LOGIN_SUCCESS,
    payload: loginData,
});
  
export const getLoginFailed = (error) => ({
    type: GET_LOGIN_FAILED,
    payload: error.message,
});

export const getLogOutSuccess = () => ({
    type: GET_LOGIN_OUT_SUCCESS,
});