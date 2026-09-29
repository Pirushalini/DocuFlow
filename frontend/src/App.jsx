import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import UploadDocument from "./pages/UploadDocument";
import DocumentDetails from "./pages/DocumentDetails";
import CategoryManagement from "./pages/CategoryManagement";
import ProfileSettings from "./pages/ProfileSettings";
import Notifications from "./pages/Notifications";
import UserManagement from "./pages/UserManagement";
import AuditLogs from "./pages/AuditLogs";
import UIStatesDemo from "./pages/UIStatesDemo";

import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/documents" element={<Documents />} />

          <Route
            path="/documents/:documentId"
            element={<DocumentDetails />}
          />

          <Route path="/upload" element={<UploadDocument />} />

          <Route
            path="/categories"
            element={<CategoryManagement />}
          />

          <Route
            path="/users"
            element={<UserManagement />}
          />

          <Route
            path="/profile"
            element={<ProfileSettings />}
          />

          <Route
            path="/notifications"
            element={<Notifications />}
          />

          <Route
            path="/audit-logs"
            element={<AuditLogs />}
          />

          <Route
            path="/ui-states"
            element={<UIStatesDemo />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;