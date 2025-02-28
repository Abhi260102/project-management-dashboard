
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  items: [],
  userData: localStorage.getItem("userData")?JSON.parse(localStorage.getItem("userData")):{}
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    editItem: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updatedData };
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    getUserData: (state, action) => {
      state.userData = action.payload
    }
  }
});

export const { addItem, editItem, deleteItem,getUserData } = itemsSlice.actions;
export default itemsSlice.reducer;