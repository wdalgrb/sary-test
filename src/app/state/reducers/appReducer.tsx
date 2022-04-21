import { createSlice } from "@reduxjs/toolkit";
import { COUNTRY_RES } from "../../../constants";

export const appReducer = createSlice({
  name: "appValues",
  initialState: { countriesList: [] },
  reducers: {
    getCountries: (state: any) => {
      let res = COUNTRY_RES;
      if (res.IsSuccess) {
        state.countriesList = COUNTRY_RES.Response;
        return;
      }
      state.countriesList = [];
    },
  },
});
export const { getCountries } = appReducer.actions;
export default appReducer.reducer;
