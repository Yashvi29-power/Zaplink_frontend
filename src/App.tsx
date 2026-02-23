import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/src/lib/src/data/src/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "@/contexts/src/pages/src/components/ProtectedRoute";
const App = () => {
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more protected routes here */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;