import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {userSlice} from "./UserSlice";
import sessionStorage from 'reduxjs-toolkit-persist/lib/storage/session';
import storage from 'reduxjs-toolkit-persist/lib/storage/';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from "redux-thunk";
import {themeSlice} from './ThemeSlice';

const sessionStoragePersistConfig = {
    key: 'sessionstorageroot',
    storage: sessionStorage
}

const storagePersistConfig = {
    key: 'storageroot',
    storage: storage
}

const rootReducer = combineReducers({
    UserSlice: persistReducer(sessionStoragePersistConfig, userSlice.reducer),
    ThemeSlice: persistReducer(storagePersistConfig, themeSlice.reducer)
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
