import constants from '../constants';

const SignUpAction = (data) => {
  return{
    type: constants.SIGN_UP,
    playLoad: data,
  }
}
const on_SignUpAction = (data) => {
  console.log(data);
  return{
    type: constants.ON_SIGN_UP,
    playLoad: data,
  }
}
export {SignUpAction, on_SignUpAction};
