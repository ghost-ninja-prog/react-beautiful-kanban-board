import { configureStore } from "@reduxjs/toolkit";
import { cardReducer } from './reducers/cardSlice'


const store = configureStore({
    reducer: {
        cards: cardReducer
    }
})

export default store