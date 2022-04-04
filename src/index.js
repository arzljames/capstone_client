import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DataProvider } from "./Context/DataContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {CaseDataProvider} from "./Context/CaseDataContext";
import Axios from 'axios';
Axios.defaults.withCredentials = true;
ReactDOM.render(
  
  <Router>
    <DataProvider>
      <CaseDataProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
      </CaseDataProvider>
    </DataProvider>
  </Router>,
  document.getElementById("root")
);
