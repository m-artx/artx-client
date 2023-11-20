// rootReducer.js
import { combineReducers } from 'redux';
import cartReducer from './cartSlice';
import userSlice from "./userSlice";

const rootReducer = combineReducers({
   cart: cartReducer,
   user: userSlice,
   // 다른 리듀서들도 필요하다면 추가
});

export default rootReducer;
