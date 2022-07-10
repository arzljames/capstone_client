import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import "react-toastify/dist/ReactToastify.css";
import AnimatedRoutes from "./Components/AnimatedRoutes";

TimeAgo.addDefaultLocale(en);

function App() {
  Axios.defaults.withCredentials = true;

  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
