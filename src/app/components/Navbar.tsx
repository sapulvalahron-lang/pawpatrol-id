import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, PawPrint } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "For Barangays", href: "/#barangays" },
    { label: "Lost & Found", href: "/lost-found" },
  ];

  return (
    <nav
      style={{
        backgroundColor: "#FFFCF7",
        borderBottom: "1px solid #E8DDD0",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#7C4F2F" }}
            >
              <PawPrint size={20} color="#FFFCF7" />
            </div>
            <div>
              <span style={{ color: "#2E2A27", fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.01em" }}>
                PawPatrol
              </span>
              <span style={{ color: "#7C4F2F", fontWeight: 700, fontSize: "1rem" }}> ID</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                style={{
                  color: location.pathname === link.href ? "#7C4F2F" : "#5C4E45",
                  fontWeight: location.pathname === link.href ? 600 : 500,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#7C4F2F")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color =
                    location.pathname === link.href ? "#7C4F2F" : "#5C4E45")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/dashboard"
              style={{
                color: "#7C4F2F",
                fontWeight: 600,
                fontSize: "0.875rem",
                textDecoration: "none",
                padding: "0.45rem 1rem",
                border: "1.5px solid #C4956A",
                borderRadius: "0.625rem",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F7EDE0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                backgroundColor: "#7C4F2F",
                color: "#FFFCF7",
                fontWeight: 600,
                fontSize: "0.875rem",
                textDecoration: "none",
                padding: "0.45rem 1.125rem",
                borderRadius: "0.625rem",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#6A4228";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#7C4F2F";
              }}
            >
              Register a Pet
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#7C4F2F" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden py-4 pb-6 flex flex-col gap-3"
            style={{ borderTop: "1px solid #E8DDD0" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                style={{
                  color: "#5C4E45",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  padding: "0.5rem 0",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Link
                to="/dashboard"
                style={{
                  color: "#7C4F2F",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  padding: "0.6rem 1rem",
                  border: "1.5px solid #C4956A",
                  borderRadius: "0.625rem",
                  textAlign: "center",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  backgroundColor: "#7C4F2F",
                  color: "#FFFCF7",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  padding: "0.6rem 1rem",
                  borderRadius: "0.625rem",
                  textAlign: "center",
                }}
                onClick={() => setMobileOpen(false)}
              >
                Register a Pet
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
