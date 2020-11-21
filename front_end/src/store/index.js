import { createStore , applyMiddleware} from 'redux';
import rootReducer from './reducers/index';
import createSagaMiddleware from 'redux-saga';
import Cookie from 'js-cookie'
import orderLocalStorage from '../utils/orderLocalStorage';
import rootSaga from './saga';
const sagaMiddleware = createSagaMiddleware();


const store  = createStore(rootReducer, applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
sagaMiddleware.run(rootSaga);
// const store = createStore(
//   rootReducer,
//   initialState,
//   ,
// );
export default store;
