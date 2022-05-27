import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Axios from "axios";
import Homepage from "./Pages/Homepage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import Notification from "./Pages/Notification";
import AdminChannel from "./AdminPages/AdminChannel";
import AdminFacility from "./AdminPages/AdminFacility";
import AdminPeople from "./AdminPages/AdminPeople";
import AdminUserProfile from "./AdminPages/AdminUserProfile";
import AdminDashboard from "./AdminPages/AdminDashboard";
import Layout from "./Components/Layout";
import useAuth from "./Hooks/useAuth";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import ProtectedLoginRoutes from "./Components/ProtectedLoginRoute";
import VerificationPage from "./Pages/VerificationPage";
import Chat from "./Pages/Chat";
import Profile from "./Pages/Profile";
import Patients from "./Pages/Patients";
import IncomingConsult from "./Pages/IncomingConsult";
import OutgoingConsult from "./Pages/OutgoingConsult";
import TeleChannel from "./Pages/TeleChannel";
import PatientsData from "./Pages/PatientsData";
import { useEffect } from "react";

import PatientAdmission from "./Pages/PatientAdmission";
import CaseData from "./Pages/CaseData";
import EditPatientProfile from "./Pages/EditPatientProfile";
import { socket } from "./Components/Socket";
import ChatUser from "./Pages/ChatUser";
import Case from "./Pages/Case";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import Reports from "./Pages/Reports";
import GenerateReport from "./Components/GenerateReport";
import "react-toastify/dist/ReactToastify.css";
import AccountSettings from "./Pages/AccountSettings";
import PageNotFound from "./Pages/PageNotFound";
import Introduction from "./Pages/UserManual/Introduction";
import QuickStart from "./Pages/UserManual/QuickStart";
import DevTeam from "./Pages/DevTeam";
import PageConstruction from "./Pages/PageConstruction";
import AdminGenerateReport from "./AdminPages/AdminGenerateReport";
import AdminAccountSetttings from "./AdminPages/AdminAccountSetttings";

TimeAgo.addDefaultLocale(en);

function App() {
  Axios.defaults.withCredentials = true;
  const { user } = useAuth();

  useEffect(() => {
    socket.emit("chat");
    const activeStatus = () => {
      socket.emit("active_status", user.userId);
    };
    {
      user && activeStatus();
    }
  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<DevTeam />} />
        <Route path="*" element={<PageNotFound />} />
        {/* <Route path="/" element={<Layout />}>
          <Route
            path="account/verification/:code/:id"
            element={<VerificationPage />}
          />
          <Route path="constructions" element={<PageConstruction />} />
          <Route element={<ProtectedRoutes user={user} role="admin" />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="people" element={<AdminPeople />} />
            <Route path="people/:id" element={<AdminUserProfile />} />
            <Route path="hospital" element={<AdminFacility />} />
            <Route path="admin-reports" element={<AdminChannel />} />
            <Route
              path="admin-reports/:id/:reportId"
              element={<AdminGenerateReport />}
            />
            <Route
              path="settings/admin-account"
              element={<AdminAccountSetttings />}
            />
          </Route>

          <Route element={<ProtectedRoutes user={user} role="user" />}>
            <Route path="/" element={<Navigate to="/consultation" replace />} />
            <Route path="/consultation" element={<Homepage />} />
            <Route path="notifications" element={<Notification />} />
            <Route path="chat/:userId/:id" element={<ChatUser />} />
            <Route path="chat" element={<Chat />} />
            <Route path="telechannel" element={<TeleChannel />} />
            <Route path="profile/:username" element={<Profile />} />
            <Route path="consultation/patients" element={<Patients />} />
            <Route path="settings/account" element={<AccountSettings />} />
            <Route
              path="user-manual/guide/introduction"
              element={<Introduction />}
            />
            <Route
              path="user-manual/guide/quick-start"
              element={<QuickStart />}
            />
            <Route
              path="consultation/patients/admission"
              element={<PatientAdmission />}
            />
            <Route
              path="consultation/patients/edit-profile/:id"
              element={<EditPatientProfile />}
            />
            <Route
              path="consultation/patients/:id"
              element={<PatientsData />}
            />
            <Route path="consultation/incoming" element={<IncomingConsult />} />
            <Route path="consultation/outgoing" element={<OutgoingConsult />} />
            <Route path="consultation/case" element={<Case />} />
            <Route
              path="consultation/case/case-data/:id"
              element={<CaseData />}
            />
            <Route path="consultation/outgoing/:id" element={<CaseData />} />
            <Route
              path="consultation/incoming/case/case-data/:id"
              element={<CaseData />}
            />
            <Route
              path="consultation/patients/case/:id"
              element={<CaseData />}
            />
            <Route path="reports" element={<Reports />} />
            <Route path="reports/:id/:reportId" element={<GenerateReport />} />
          </Route>

          <Route element={<ProtectedLoginRoutes user={user} />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="reset-password" element={<ForgotPassword />} />
          </Route>

         
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
