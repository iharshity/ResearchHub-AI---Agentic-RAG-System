import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SearchPapers from "./pages/SearchPapers";
import DocSpace from "./pages/DocSpace";
import Workspace from "./pages/Workspace";
import AITools from "./pages/AITools";
import UploadPDF from "./pages/UploadPDF";

// ✅ Protected Route Component (FIXED)
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="search" element={<SearchPapers />} />
          <Route path="workspace/:id" element={<Workspace />} />
          <Route path="ai-tools" element={<AITools />} />
          <Route path="upload" element={<UploadPDF />} />
          <Route path="docspace" element={<DocSpace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;