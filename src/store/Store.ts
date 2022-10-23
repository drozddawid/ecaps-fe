import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {userSlice} from "./UserSlice";
import sessionStorage from 'reduxjs-toolkit-persist/lib/storage/session';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage: sessionStorage
}

const rootReducer = combineReducers({
    UserSlice: persistReducer(persistConfig, userSlice.reducer)
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
