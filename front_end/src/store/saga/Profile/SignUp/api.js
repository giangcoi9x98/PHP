import API from '../../../api';


function* signUp(action){
  try{
    const data = yield API.post('/register', {
      username: action.username,
      password: action.password,
      email: action.email,
      firstname: action.firstName,
      lastname: action.lastName,
    });
    return {
      data: data,
      status: true
    }
  }
  catch (err){
    return {
      data: undefined,
      status: false,
    }
  }

}

export default signUp;
