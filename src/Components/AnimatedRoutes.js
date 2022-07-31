import React, { useEffect } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AdminReport from "../AdminPages/AdminReport";
import AdminFacility from "../AdminPages/AdminFacility";
import AdminPeople from "../AdminPages/AdminPeople";
import AdminUserProfile from "../AdminPages/AdminUserProfile";
import AdminDashboard from "../AdminPages/AdminDashboard";
import Layout from "../Components/Layout";
import AccountSettings from "../Pages/AccountSettings";
import PageNotFound from "../Pages/PageNotFound";
import Introduction from "../Pages/UserManual/Introduction";
import QuickStart from "../Pages/UserManual/QuickStart";
import DevTeam from "../Pages/DevTeam";
import PageConstruction from "../Pages/PageConstruction";
import AdminGenerateReport from "../AdminPages/AdminGenerateReport";
import AdminAccountSetttings from "../AdminPages/AdminAccountSetttings";
import UserDashboard from "../Pages/UserDashboard";
import AdminSpecialization from "../AdminPages/AdminSpecialization";
import { AnimatePresence } from "framer-motion";
import ProtectedRoutes from "../Components/ProtectedRoutes";
import ProtectedLoginRoutes from "../Components/ProtectedLoginRoute";
import VerificationPage from "../Pages/VerificationPage";
import Chat from "../Pages/Chat";
import Profile from "../Pages/Profile";
import Patients from "../Pages/Patients";
import IncomingConsult from "../Pages/IncomingConsult";
import OutgoingConsult from "../Pages/OutgoingConsult";
import PatientsData from "../Pages/PatientsData";
import Reports from "../Pages/Reports";
import GenerateReport from "../Components/GenerateReport";
import useAuth from "../Hooks/useAuth";
import CaseData from "../Pages/CaseData";
import EditPatientProfile from "../Pages/EditPatientProfile";
import Case from "../Pages/Case";
import PatientAdmission from "../Pages/PatientAdmission";
import ChatUser from "../Pages/ChatUser";
import { socket } from "../Components/Socket";
import NavigatorDashboard from "../Pages/NavigatorDashboard";
import NavigatorCase from "../Pages/NavigatorCase";
import ArchivedCase from "../Pages/ArchivedCase";

//Custom components for adding animation for each components and pages
//Header Tree
const AnimatedRoutes = () => {
  const { user } = useAuth();
  const location = useLocation();

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
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route
            path="account/verification/:code/:id"
            element={<VerificationPage />}
          />
          <Route path="constructions" element={<PageConstruction />} />
          <Route element={<ProtectedRoutes user={user} role="admin" />}>
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/doctors" element={<AdminPeople />} />
            <Route path="admin/doctors/:id" element={<AdminUserProfile />} />
            <Route path="admin/hospital" element={<AdminFacility />} />
            <Route path="admin/report" element={<AdminReport />} />
            <Route
              path="admin-reports/:id/:reportId"
              element={<AdminGenerateReport />}
            />
            <Route
              path="settings/admin-account"
              element={<AdminAccountSetttings />}
            />
            <Route
              path="admin/specialization"
              element={<AdminSpecialization />}
            />
          </Route>

          <Route element={<ProtectedRoutes user={user} role="navigator" />}>
            <Route
              path="/navigator/dashboard"
              element={<NavigatorDashboard />}
            />
             <Route
              path="/navigator/case"
              element={<NavigatorCase />}
            />
          </Route>

          <Route element={<ProtectedRoutes user={user} role="user" />}>
            <Route path="/" element={<UserDashboard />} />
            <Route
              path="/consultation"
              element={<Navigate to="/consultation/patients" replace />}
            />
            <Route path="chat/:userId/:id" element={<ChatUser />} />
            <Route path="chat" element={<Chat />} />
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
            <Route path="consultation/archived" element={<ArchivedCase />} />
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
           
          </Route>
        </Route>
        <Route path="/team" element={<DevTeam />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
