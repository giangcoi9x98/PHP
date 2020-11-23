import API from '../../../api';


function* logIn(username, password){
    const data = yield API.post('/login', {
        username: username,
        password: password,
    });
    return data;
}

export default logIn;
