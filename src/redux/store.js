import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import itemsReducer from "./itemSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    users: itemsReducer,
  },
});

export default store;
