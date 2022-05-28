import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DataProvider } from "./Context/DataContext";
import { BrowserRouter } from "react-router-dom";
import { CaseDataProvider } from "./Context/CaseDataContext";
import Axios from "axios";

Axios.defaults.withCredentials = true;
ReactDOM.render(
  // <BrowserRouter>
  //   <DataProvider>
  //     <CaseDataProvider>
  //       <App />
  //     </CaseDataProvider>
  //   </DataProvider>
  // </BrowserRouter>,
  <DataProvider>
    <CaseDataProvider>
      <App />
    </CaseDataProvider>
  </DataProvider>,

  document.getElementById("root")
);
