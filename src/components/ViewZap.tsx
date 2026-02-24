import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Shield, AlertTriangle, Home, Lock, Loader2 } from "lucide-react";

function getErrorMessage(errorParam: string | null) {
  if (!errorParam) return null;
  if (errorParam === "viewlimit")
    return "View limit exceeded. This file is no longer accessible.";
  if (errorParam === "expired")
    return "This link has expired. The file is no longer available.";
  if (errorParam === "notfound")
    return "This link does not exist or has expired.";
  if (errorParam === "incorrect_password")
    return "Incorrect password. Please try again.";
  return "An unexpected error occurred. Please try again later.";
}

function getErrorHeading(errorParam: string | null) {
  if (errorParam === "expired") return "Link Expired";
  if (errorParam === "viewlimit") return "View Limit Exceeded";
  if (errorParam === "notfound") return "Not Found";
  if (errorParam === "incorrect_password") return "Incorrect Password";
  return "Access Denied";
}

function getErrorIcon(errorParam: string | null) {
  if (errorParam === "expired") return AlertTriangle;
  if (errorParam === "viewlimit") return AlertTriangle;
  if (errorParam === "notfound") return AlertTriangle;
  if (errorParam === "incorrect_password") return Lock;
  return AlertTriangle;
}

export default function ViewZap() {
  const { shortId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorParam = params.get("error");
    const errorMsg = getErrorMessage(errorParam);
    if (errorMsg) {
      if (errorParam === "incorrect_password") {
        setPasswordRequired(true);
        setPasswordError(errorMsg);
        setLoading(false);
        return;
      }
      setError(errorMsg);
      setErrorType(errorParam);
      toast.error(errorMsg);
      setLoading(false);
      return;
    }
    const fetchZap = async () => {
      setLoading(true);
      setError(null);
      setErrorType(null);
      setPasswordRequired(false);
      setPasswordError(null);
      try {
        // First, check the metadata to validate access and detect errors
        await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/zaps/${shortId}/metadata`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        
        // If metadata check passes, redirect to the API endpoint
        // The browser will automatically follow the redirect from the backend to Cloudinary
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/zaps/${shortId}`;
        return;
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        if (error.response?.status === 401) {
          // Password required
          setPasswordRequired(true);
          setLoading(false);
          return;
        } else if (error.response?.status === 410) {
          setError("This link has expired. The file is no longer available.");
          setErrorType("expired");
          toast.error(
            "This link has expired. The file is no longer available."
          );
        } else if (error.response?.status === 404) {
          setError("This link does not exist or has expired.");
          setErrorType("notfound");
          toast.error("This link does not exist or has expired.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
          setErrorType(null);
          toast.error("An unexpected error occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchZap();
  }, [shortId, location.search]);

  useEffect(() => {
    if (passwordRequired) {
      navigate(location.pathname, {
        replace: true,
        state: { ...location.state, passwordRequired: true },
      });
    }
    // eslint-disable-next-line
  }, [passwordRequired]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setPasswordError(null);
    try {
      // First verify the password by making a request with it
      // The backend will return 200 if correct, 401 if wrong
      const checkResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/zaps/${shortId}/metadata`,
        {
          params: { password },
          headers: {
            Accept: "application/json",
          },
        }
      );
      
      // If password is correct, redirect to the API endpoint with password
      // The browser will automatically follow the redirect to Cloudinary
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/zaps/${shortId}?password=${encodeURIComponent(password)}`;
      return;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (
        error.response &&
        error.response.status === 401
      ) {
        setPasswordError("Incorrect password. Please try again.");
      } else if (error.response && error.response.status === 404) {
        setError("This link does not exist or has expired.");
        setErrorType("notfound");
        toast.error("This link does not exist or has expired.");
      } else if (
        error.response &&
        (error.response.status === 410 || error.response.status === 403)
      ) {
        setError("View limit exceeded. This file is no longer accessible.");
        setErrorType("viewlimit");
        toast.error("View limit exceeded. This file is no longer accessible.");
      } else {
        setPasswordError(
          "An unexpected error occurred. Please try again later."
        );
      }
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full loading-spinner mx-auto mb-6"></div>
          <div className="text-lg text-muted-foreground">
            Loading your content...
          </div>
        </div>
      </div>
    );
  }

  if (passwordRequired) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <div className="bg-card rounded-3xl shadow-lg p-10 border border-border max-w-md w-full text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Password Protected
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            This content is secured. Please enter the password to continue.
          </p>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-focus text-base rounded-xl border-border bg-background h-14 px-6 font-medium text-lg focus-ring"
              disabled={verifying}
              autoFocus
            />
            {passwordError && (
              <div className="text-destructive text-sm bg-destructive/10 p-4 rounded-xl border border-destructive/20">
                {passwordError}
              </div>
            )}
            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus-ring"
              disabled={verifying || !password}
            >
              {verifying ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-3" />
                  Verifying...
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5 mr-3" />
                  Unlock Content
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (error) {
    const ErrorIcon = getErrorIcon(errorType);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <div className="bg-card rounded-3xl shadow-lg p-10 border border-border max-w-md w-full text-center">
          <div className="w-20 h-20 bg-destructive/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <ErrorIcon className="h-10 w-10 text-destructive" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            {getErrorHeading(errorType)}
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">{error}</p>
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] h-14 px-8 text-lg focus-ring"
          >
            <Home className="h-5 w-5 mr-3" />
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  // If no error and not loading, the backend should have redirected or served the file.
  return null;
}