import * as ActionTypes from './ActionTypes';

const axios = require('axios').default;

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}



export const receiveLogin = (response) => {

    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.data.token,

    }

}



export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}


export const loginUser = (creds) => (dispatch) => {

    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    //let data = JSON.stringify(creds)
    //console.log(data)

    return axios.post(`http://localhost:5000/users/login`, creds)
        .then(response => {

            if (response.statusText === "OK") {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => {
            if (response.data.success) {
                // If login was successful, set the token in local storage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('creds', JSON.stringify(creds));
                localStorage.setItem('admin', response.data.isAdmin);
                // Dispatch the success action

                dispatch(receiveLogin(response));


            }
            else {
                var error = new Error('Error ' + response.status);
                error.response = response;
                throw error;
            }
        })
        .catch(error => dispatch(loginError(error.message)))
};



export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}



export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}




// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    localStorage.removeItem('admin');
    dispatch(receiveLogout())
}




