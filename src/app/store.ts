import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import languageReducer from '../language/languageSlice';



// ---------- Комбинируем все редьюсеры ----------

const rootReducer = combineReducers({

    language: languageReducer,


});



const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'language',
    ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


// ---------- Создаём store ----------

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefault) =>
        getDefault({
            serializableCheck: {
            },

        })

});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
