import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to Code Duel!</h1>
      <p>This is the home page of your project.</p>

      {/* Example navigation buttons */}
      <div style={{ marginTop: "1rem" }}>
        <Link to="/login" style={{ marginRight: "1rem" }}>
          Go to Login
        </Link>
        <Link to="/dashboard">Go to Dashboard</Link>
      </div>
    </div>
  );
};

export default Home;