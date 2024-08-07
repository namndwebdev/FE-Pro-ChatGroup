import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import chatReducer from './chat';
import toggleReducer from './toggle';

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    toggle: toggleReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store)