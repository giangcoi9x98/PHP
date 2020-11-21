import API from '../../api';


function* logIn({username, password}){
    const data = yield API.post('/login', {
        username: username,
        password: password,
    }).then((res) => {
        return{
            status: true,
            data: res.data,
        }
    }).catch((err) => {
        return{
            status: false,
            mesage: ' login falied',
        }
    })
    return data;
}

export default logIn;
