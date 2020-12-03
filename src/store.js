import {createStore} from 'redux';
import rootReducer from './reducers';

const persistedState = localStorage.getItem('store')
  ? JSON.parse(localStorage.getItem('store'))
  : {};

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  localStorage.setItem('store', JSON.stringify(store.getState()));
});

export default store;
