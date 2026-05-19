import { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { Lock, PawPrint, User } from "lucide-react";
import {
  isAdminSessionActive,
  setAdminSession,
  validateDemoLogin,
} from "../data/adminSession";

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAdminSessionActive()) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validateDemoLogin(username, password)) {
      setError("Invalid demo credentials.");
      return;
    }
    setError("");
    setAdminSession(true);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10"
      style={{ backgroundColor: "#F3E8D8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-8"
        style={{
          backgroundColor: "#FFFCF7",
          border: "1.5px solid #E8DDD0",
          boxShadow: "0 16px 48px rgba(124,79,47,0.12)",
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <span
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#7C4F2F", color: "#FFFCF7" }}
          >
            <PawPrint size={22} />
          </span>
          <div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#2E2A27",
                lineHeight: 1.2,
              }}
            >
              Demo Admin Login
            </h1>
            <p style={{ color: "#5C4E45", fontSize: "0.8rem", marginTop: "0.2rem" }}>
              Frontend-only MVP approval flow
            </p>
          </div>
        </div>

        <p
          className="rounded-xl px-4 py-3 mb-5"
          style={{ backgroundColor: "#F7F2EA", border: "1px solid #E1D1BE", color: "#5C4E45", fontSize: "0.8rem", lineHeight: 1.6 }}
        >
          Demo login only. No real authentication is connected yet.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#5C4E45", marginBottom: "0.35rem", textTransform: "uppercase", letterSpacing: "0.04em" }}
            >
              Username
            </label>
            <div className="relative">
              <User size={16} color="#8C7B6B" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem 0.625rem 2.25rem",
                  borderRadius: "0.625rem",
                  border: "1.5px solid #E1D1BE",
                  backgroundColor: "#FFFCF7",
                  color: "#2E2A27",
                  fontSize: "0.875rem",
                }}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#5C4E45", marginBottom: "0.35rem", textTransform: "uppercase", letterSpacing: "0.04em" }}
            >
              Password
            </label>
            <div className="relative">
              <Lock size={16} color="#8C7B6B" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem 0.625rem 2.25rem",
                  borderRadius: "0.625rem",
                  border: "1.5px solid #E1D1BE",
                  backgroundColor: "#FFFCF7",
                  color: "#2E2A27",
                  fontSize: "0.875rem",
                }}
              />
            </div>
          </div>

          {error && (
            <p style={{ color: "#C0601A", fontSize: "0.82rem", fontWeight: 700 }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.7rem 1rem",
              borderRadius: "0.75rem",
              backgroundColor: "#7C4F2F",
              color: "#FFFCF7",
              fontWeight: 700,
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign in to Dashboard
          </button>
        </form>

        <p style={{ color: "#8C7B6B", fontSize: "0.75rem", marginTop: "1rem", textAlign: "center" }}>
          Demo credentials: <strong>admin</strong> / <strong>admin123</strong>
        </p>

        <Link
          to="/"
          style={{
            display: "block",
            textAlign: "center",
            marginTop: "1.25rem",
            color: "#7C4F2F",
            fontWeight: 700,
            fontSize: "0.85rem",
            textDecoration: "none",
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
