
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    setPastes: (state, action) => {
      state.pastes = action.payload;
    },

    addToPaste: (state, action) => {
      state.pastes.unshift(action.payload);
      toast.success("Paste Created Successfully!");
    },

    updateToPaste: (state, action) => {
      const paste = action.payload;

      const index = state.pastes.findIndex(
        (item) => item._id === paste._id
      );

      if (index !== -1) {
        state.pastes[index] = paste;
        toast.success("Paste Updated");
      }
    },

    resetAllPaste: (state) => {
      state.pastes = [];
    },

    removePaste: (state, action) => {
      const pasteId = action.payload;

      state.pastes = state.pastes.filter(
        (item) => item._id !== pasteId
      );

      toast.success("Paste Deleted");
    },
  },
});

export const {
  setPastes,
  addToPaste,
  updateToPaste,
  resetAllPaste,
  removePaste,
} = pasteSlice.actions;

export default pasteSlice.reducer;
