<<<<<<< HEAD
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import UploadPage from "./components/UploadPage";
import Customize from "./components/Customize";
import HowItWorks from "./components/HowItWorks";
import AboutUs from "./components/AboutUs";
import ViewZap from "./components/ViewZap";
// import UrlShortenerPage from "./components/UrlShortenerPage";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar";

// Wrapper for ViewZap to show logo-only navbar if password is required
function ViewZapWrapper() {
  const location = useLocation();
  const passwordRequired = location.state && location.state.passwordRequired;
  return (
    <>
      <Navbar hideNavOptions={!!passwordRequired} />
      <ViewZap />
    </>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/upload"
          element={
            <>
              <Navbar />
              <UploadPage />
            </>
          }
        />
        <Route
          path="/customize"
          element={
            <>
              <Navbar />
              <Customize />
            </>
          }
        />
        <Route
          path="/how-it-works"
          element={
            <>
              <Navbar />
              <HowItWorks />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <AboutUs />
            </>
          }
        />
        <Route path="/zaps/:shortId" element={<ViewZapWrapper />} />
        {/* // <Route path="/url-shortener" element={<UrlShortenerPage />} /> */}
      </Routes>
      <Analytics />
    </>
  );
}
=======
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import CodeEditor from "@/components/CodeEditor";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ChallengePage from "@/pages/ChallengePage";
import CreateChallenge from "@/pages/CreateChallenge";
import Leaderboard from "@/pages/Leaderboard";
import Settings from "@/pages/Settings";
import Profile from "@/pages/Profile";
import Leetcode from "@/pages/Leetcode";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Index />
        }
      />

      <Route
        path="/login"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />
      <Route
        path="/register"
        element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leetcode"
        element={
          <ProtectedRoute>
            <Leetcode />
          </ProtectedRoute>
        }
      />
      <Route
        path="/duel-editor"
        element={
          <ProtectedRoute>
            <CodeEditor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/challenge/:id"
        element={
          <ProtectedRoute>
            <ChallengePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-challenge"
        element={
          <ProtectedRoute>
            <CreateChallenge />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
>>>>>>> upstream/main
