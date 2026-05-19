import { useEffect, useState, MouseEvent } from "react";
import { Link, useLocation } from "react-router";
import { Menu, PawPrint, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "For Barangays", href: "/#barangays" },
  { label: "Contact", href: "/#contact" },
  { label: "Lost & Found", href: "/lost-found" },
  { label: "Register Pet", href: "/register-pet" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const scrollToId = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/" && !location.hash;
    return (
      location.pathname === href ||
      (href.startsWith("/#") && location.pathname === "/" && location.hash === href.replace("/", "")) ||
      (href.startsWith("/pet-profile") && location.pathname.startsWith("/pet-profile"))
    );
  };

  useEffect(() => {
    if (!location.hash) return;

    const targetId = location.hash.replace("#", "");
    window.requestAnimationFrame(() => {
      scrollToId(targetId);
    });
  }, [location.hash, location.pathname]);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/") {
      if (location.pathname === "/") {
        e.preventDefault();
        const homeEl = document.getElementById("home");
        if (homeEl) {
          scrollToId("home");
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    } else if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (location.pathname === "/") {
        e.preventDefault();
        scrollToId(targetId);
      }
    }
    setMobileOpen(false);
  };

  return (
    <nav className="app-navbar sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="app-navbar__brand" onClick={(e) => handleNavClick(e, "/")}>
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
                onClick={(e) => handleNavClick(e, link.href)}
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
                onClick={(e) => handleNavClick(e, link.href)}
                className={`app-navbar__mobile-link ${
                  isActive(link.href) ? "app-navbar__mobile-link--active" : ""
                }`}
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
