import {createStore} from 'redux';
import reducerApp from './reducer';

let store = createStore(reducerApp);

export default store;