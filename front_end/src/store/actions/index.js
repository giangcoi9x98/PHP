import {addCount, addProduct, updateOrder, increment, decrement} from './countAction';
import {showModal, showSignInModal, showSignUpModal, closeModal} from './modalAction';
import {on_SignInAction, SignInAction} from './signInAction';
import {on_SignUpAction, SignUpAction} from './signUpAction';
import {category, get_Category} from './catagory';
import {product, get_Product} from './product';
import {getProfileAction, on_GetProfileAction} from './ProfileAction';

export default {
    addProduct,
    addCount,
    updateOrder,
    increment,
    decrement,
    showSignUpModal,
    showSignInModal,
    showModal,
    on_SignInAction,
    SignInAction,
    closeModal,
    on_SignUpAction,
    SignUpAction,
    category,
    get_Category,
    product,
    get_Product,
    getProfileAction,
    on_GetProfileAction,
};
