import { NavigationButtonProps } from "@/app/interface/app_interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppSliceState {
  navigationButton: NavigationButtonProps[];
}
const initialNavigationButton: NavigationButtonProps[] = [
  // { name: "Home", path: "/", key: "home" },
];

const initialState: AppSliceState = {
  navigationButton: initialNavigationButton,
};

const appSlice = createSlice({
  name: "app-slice",
  initialState: initialState,
  reducers: {
    removeNavigationButton: (state, action: PayloadAction<string>) => {
      state.navigationButton = state.navigationButton.filter(
        (button) => button.key !== action.payload
      );
    },
    removeButtonsAfterSelected: (state, action: PayloadAction<string>) => {
      const index = state.navigationButton.findIndex(
        (button) => button.key === action.payload
      );
      if (index >= 0) {
        state.navigationButton = state.navigationButton.slice(0, index + 1);
      }
    },
  },
});

export const { removeButtonsAfterSelected, removeNavigationButton } =
  appSlice.actions;
export default appSlice.reducer;
