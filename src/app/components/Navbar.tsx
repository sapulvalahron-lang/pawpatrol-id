import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, PawPrint, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Register Pet", href: "/register-pet" },
  { label: "Pet Profile", href: "/pet-profile" },
  { label: "Lost & Found", href: "/lost-found" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="app-navbar sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="app-navbar__brand">
            <span className="app-navbar__mark" aria-hidden="true">
              <PawPrint size={20} />
            </span>
            <span className="app-navbar__wordmark">
              PawPatrol <span>ID</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`app-navbar__link ${isActive(link.href) ? "app-navbar__link--active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="app-navbar__toggle md:hidden"
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="app-navbar__mobile md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`app-navbar__mobile-link ${
                  isActive(link.href) ? "app-navbar__mobile-link--active" : ""
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
