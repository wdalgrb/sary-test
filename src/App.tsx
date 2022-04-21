import React, { useEffect } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/Home/HomeScreen";
import { useDispatch } from "react-redux";
import { getCountries } from "./app/state/reducers/appReducer";

const App = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());

    return () => {};
  }, []);

  return (
    <BrowserRouter basename="heroes">
      <Routes>
        <Route path={`/`} element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
