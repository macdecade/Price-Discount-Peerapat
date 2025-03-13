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
  },
});

export const {} = appSlice.actions;
export default appSlice.reducer;
