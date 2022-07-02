import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DataProvider } from "./Context/DataContext";
import { CaseDataProvider } from "./Context/CaseDataContext";
import Axios from "axios";

Axios.defaults.withCredentials = true;
ReactDOM.render(

  <DataProvider>
    <CaseDataProvider>
      <App />
    </CaseDataProvider>
  </DataProvider>,

  document.getElementById("root")
);
