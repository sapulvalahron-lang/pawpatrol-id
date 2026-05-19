import { Link } from "react-router";
import {
  QrCode,
  BookOpen,
  Search,
  Users,
  PawPrint,
  ClipboardList,
  ArrowRight,
  CheckCircle2,
  Shield,
} from "lucide-react";



const howItWorks = [
  {
    step: "01",
    title: "Register the Pet",
    desc: "Barangay staff or residents submit basic pet, owner, and vaccination details.",
  },
  {
    step: "02",
    title: "Create a Barangay Record",
    desc: "The pet receives a digital profile connected to a barangay registry record.",
  },
  {
    step: "03",
    title: "Use QR or Manual Search",
    desc: "The QR tag allows fast lookup, while barangay staff can still search records if the tag is missing.",
  },
  {
    step: "04",
    title: "Support Reports and Follow-Up",
    desc: "Lost, found, vaccination, and ownership-related concerns can be documented for proper barangay action.",
  },
];

export function LandingPage() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* ── HERO ─────────────────────────────────────── */}
      <section id="home" className="relative overflow-hidden" style={{ backgroundColor: "#F7F2EA" }}>
        {/* Soft paw-print or dot pattern overlay, very subtle */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(#7C4F2F 2px, transparent 2px)", backgroundSize: "32px 32px" }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-6 pb-0 relative z-10">
          <div className="grid lg:grid-cols-[0.98fr_1.02fr] gap-8 lg:gap-10 items-center">
            {/* Left */}
            <div className="space-y-4 pb-8 lg:pb-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "#F0E4D4", border: "1px solid #C4956A" }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#7C4F2F" }} />
                <span style={{ color: "#7C4F2F", fontSize: "0.8rem", fontWeight: 600 }}>
                  Civic-Tech Platform for Barangays
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.2rem, 4.35vw, 3.45rem)",
                  fontWeight: 700,
                  color: "#2E2A27",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                Register. Identify.<br/>
                <span style={{ color: "#7C4F2F", whiteSpace: "nowrap" }}>Take Responsibility.</span>
              </h1>

              <p style={{ color: "#5C4E45", fontSize: "1.05rem", lineHeight: 1.6, maxWidth: "520px" }}>
                PawPatrol ID helps barangays organize pet records, create QR-based profiles, and support lost-and-found response through one simple platform.
              </p>

              {/* Support Line */}
              <div style={{ borderLeft: "3px solid #C4956A", paddingLeft: "1rem", maxWidth: "500px" }}>
                <p style={{ color: "#6F5F52", fontSize: "0.94rem", lineHeight: 1.5, fontWeight: 600, fontStyle: "italic" }}>
                  Built as a digital foundation for responsible pet ownership programs, not just a QR tag system.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-3">
                <Link
                  to="/register-pet"
                  style={{
                    backgroundColor: "#7C4F2F",
                    color: "#FFFCF7",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    padding: "0.85rem 1.75rem",
                    borderRadius: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s",
                    boxShadow: "0 4px 14px rgba(124, 79, 47, 0.3)",
                  }}
                >
                  Start Pet Registration <ArrowRight size={16} />
                </Link>
                <Link
                  to="/dashboard"
                  style={{
                    backgroundColor: "#FFFCF7",
                    color: "#5A3B25",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    padding: "0.82rem 1.35rem",
                    borderRadius: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    border: "1.5px solid #CDB9A3",
                    transition: "all 0.2s",
                  }}
                >
                  Preview Barangay Dashboard
                </Link>
              </div>

              <p className="pt-2">
                <Link
                  to="/check-status"
                  style={{ color: "#7C4F2F", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none" }}
                >
                  Check Registration Status →
                </Link>
              </p>

              <div className="pt-1">
                <Link
                  to="/pet-profile"
                  className="inline-flex items-center gap-2"
                  style={{
                    color: "#5A3B25",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    padding: "0.4rem 0",
                    transition: "color 0.2s"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = "#7C4F2F"}
                  onMouseOut={(e) => e.currentTarget.style.color = "#5A3B25"}
                >
                  <Search size={14} /> View Sample QR Profile
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-4 pt-1 flex-wrap">
                {["Barangay-ready workflow", "No mobile app required", "Privacy-conscious records"].map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} color="#3D6B45" />
                    <span style={{ color: "#4F443D", fontSize: "0.85rem", fontWeight: 600 }}>{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Hero Image (Soft Editorial Visual) */}
            <div className="relative hidden lg:flex items-end justify-center min-h-[440px]">
              {/* Soft radial glows behind the subject to blend naturally */}
              <div
                className="absolute top-8 right-12 w-80 h-80 rounded-full z-0"
                style={{ backgroundColor: "#F0E4D4", opacity: 0.78, filter: "blur(70px)" }}
              />
              <div
                className="absolute bottom-6 left-8 w-72 h-72 rounded-full z-0"
                style={{ backgroundColor: "#EDF4EE", opacity: 0.72, filter: "blur(60px)" }}
              />

              {/* The free-floating editorial image */}
              <div className="relative w-full max-w-[500px] flex items-end justify-center z-10 -mb-2">
                {/* Very soft background gradient directly behind the subject */}
                <div 
                  className="absolute inset-x-6 top-8 bottom-0 z-[-1] rounded-full"
                  style={{ background: "radial-gradient(circle at 52% 52%, rgba(247, 237, 224, 0.9) 0%, rgba(237, 244, 238, 0.45) 42%, transparent 72%)" }}
                />

                {/* Ground/contact shadow */}
                <div 
                  className="absolute bottom-0 w-[70%] h-8 z-[-1] rounded-[100%]"
                  style={{ background: "radial-gradient(ellipse, rgba(92, 78, 69, 0.18) 0%, rgba(124, 79, 47, 0.08) 42%, transparent 72%)", filter: "blur(6px)" }}
                />

                <img
                  src="/hero-barangay-pet.png"
                  alt="Barangay staff with prominently featured registered dog"
                  className="w-full h-auto object-contain"
                  style={{ filter: "drop-shadow(0 24px 34px rgba(92, 78, 69, 0.14))" }}
                />

                {/* Top Right Cue - Barangay Record */}
                <div
                  className="absolute top-20 right-4 lg:right-6 px-4 py-2.5 rounded-full flex items-center gap-2 z-20 scale-95 origin-right"
                  style={{
                    backgroundColor: "rgba(255,252,247,0.98)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 8px 24px rgba(124,79,47,0.12)",
                    border: "1px solid rgba(232, 221, 208, 0.5)",
                  }}
                >
                  <Shield size={16} color="#3D6B45" />
                  <span style={{ fontWeight: 700, color: "#2E2A27", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                    Barangay Record Verified
                  </span>
                </div>

                {/* Bottom Left Cue - QR Layer */}
                <div
                  className="absolute bottom-14 -left-1 lg:left-3 px-4 py-2.5 rounded-full flex items-center gap-2 z-20 scale-95 origin-left"
                  style={{
                    backgroundColor: "rgba(46, 42, 39, 0.95)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    border: "1px solid rgba(255, 252, 247, 0.1)",
                  }}
                >
                  <QrCode size={16} color="#F7C99A" />
                  <span style={{ fontWeight: 600, color: "#FFFCF7", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                    QR Pet ID Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Soft Bottom Wave Divider */}
        <div style={{ lineHeight: 0, position: "relative", zIndex: 10 }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20V60Z" fill="#FFFCF7" />
          </svg>
        </div>
      </section>

      {/* ── ABOUT / GOAL ──────────────────────────────── */}
      <section id="about" style={{ backgroundColor: "#FFFCF7", padding: "5rem 0 6rem" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "#2E2A27",
                marginBottom: "1.25rem",
              }}
            >
              Built for Barangay Pet Accountability
            </h2>
            <p style={{ color: "#5C4E45", fontSize: "1.05rem", lineHeight: 1.7 }}>
              PawPatrol ID aims to help barangays promote responsible pet ownership by making pet registration, QR-based identification, and lost-and-found support easier to manage. The platform gives barangays a simple digital tool for organizing pet records, tracing registered owners, and improving local response to pet-related concerns.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Organized Pet Records",
                desc: "Keep pet and owner information in one searchable barangay registry.",
                icon: <ClipboardList size={26} />,
                bg: "#F7EDE0",
                color: "#7C4F2F",
              },
              {
                title: "Faster Owner Tracing",
                desc: "Use QR profiles or manual search to help identify registered pets and contact owners.",
                icon: <Search size={26} />,
                bg: "#EDF4EE",
                color: "#3D6B45",
              },
              {
                title: "Documented Follow-Up",
                desc: "Support lost, found, vaccination, and incident-related reports with clearer records.",
                icon: <BookOpen size={26} />,
                bg: "#FDF0E6",
                color: "#9A4B14",
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  backgroundColor: "#FFFCF7",
                  borderRadius: "1.5rem",
                  padding: "2.5rem 2rem",
                  border: "1.5px solid #E8DDD0",
                  boxShadow: "0 8px 30px rgba(124, 79, 47, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "transform 0.2s",
                }}
                className="hover:-translate-y-1"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: card.bg, color: card.color }}
                >
                  {card.icon}
                </div>
                <h3 style={{ fontWeight: 700, color: "#2E2A27", fontSize: "1.15rem", marginBottom: "0.75rem" }}>
                  {card.title}
                </h3>
                <p style={{ color: "#5C4E45", lineHeight: 1.6, fontSize: "0.95rem" }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Accountability Callout */}
          <div
            className="mt-16 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 max-w-4xl mx-auto text-center sm:text-left"
            style={{ backgroundColor: "#F7F2EA", border: "1.5px solid #E8DDD0" }}
          >
            <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: "#EDF4EE", color: "#3D6B45" }}>
              <Shield size={22} />
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: "#2E2A27", fontSize: "1.05rem", marginBottom: "0.35rem" }}>
                Accountability Support, Not Legal Judgment
              </h4>
              <p style={{ color: "#5C4E45", fontSize: "0.95rem", lineHeight: 1.6 }}>
                PawPatrol ID does not determine legal liability. It provides organized records that help barangay officials trace registered pet owners, document reports, and support proper follow-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section id="how-it-works" style={{ backgroundColor: "#F7F2EA", padding: "6rem 0", position: "relative" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: "#EDF4EE", border: "1px solid #A8C9AE" }}
            >
              <span style={{ color: "#3D6B45", fontSize: "0.78rem", fontWeight: 600 }}>
                Simple Workflow
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "#2E2A27",
              }}
            >
              How PawPatrol ID Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line (hidden on mobile) */}
            <div className="hidden md:block absolute top-10 left-10 right-10 h-0.5" style={{ backgroundColor: "#E8DDD0", zIndex: -1 }} />
            
            {howItWorks.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: "#FFFCF7", border: "1.5px solid #E8DDD0", boxShadow: "0 8px 24px rgba(124, 79, 47, 0.08)" }}
                >
                  <span style={{ color: "#7C4F2F", fontWeight: 800, fontSize: "1.25rem", fontFamily: "'Playfair Display', serif" }}>
                    {step.step}
                  </span>
                </div>
                <h3 style={{ fontWeight: 700, color: "#2E2A27", marginBottom: "0.75rem", fontSize: "1.05rem" }}>
                  {step.title}
                </h3>
                <p style={{ color: "#5C4E45", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR BARANGAYS ────────────────────────────── */}
      <section id="barangays" style={{ backgroundColor: "#F7F2EA", padding: "6rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-[2.5rem] p-10 lg:p-16 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #7C4F2F 0%, #9B6340 60%, #C4956A 100%)",
              boxShadow: "0 20px 60px rgba(124,79,47,0.25)",
            }}
          >
            {/* Decorative background accent inside the CTA */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px)", backgroundSize: "32px 32px" }} />

            <div className="relative z-10">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                style={{ backgroundColor: "rgba(255,252,247,0.2)", border: "1px solid rgba(255,252,247,0.3)" }}
              >
                <Users size={16} color="#F7C99A" />
                <span style={{ color: "#F7C99A", fontSize: "0.85rem", fontWeight: 600 }}>
                  For Barangay Officials
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                  fontWeight: 700,
                  color: "#FFFCF7",
                  marginBottom: "1.25rem",
                }}
              >
                Give Barangays a Clearer Pet Records System
              </h2>
              <p style={{ color: "#F0D9C2", maxWidth: "600px", margin: "0 auto 2.5rem", lineHeight: 1.7, fontSize: "1.05rem" }}>
                PawPatrol ID brings registration records, QR identity previews, owner accountability, and lost-and-found coordination into one civic-tech platform designed for local communities.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/dashboard"
                  style={{
                    backgroundColor: "#FFFCF7",
                    color: "#7C4F2F",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    padding: "0.875rem 2rem",
                    borderRadius: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    transition: "transform 0.2s",
                  }}
                  className="hover:-translate-y-1"
                >
                  Preview Barangay Dashboard <ArrowRight size={16} />
                </Link>
                <Link
                  to="/register-pet"
                  style={{
                    backgroundColor: "rgba(255,252,247,0.15)",
                    color: "#FFFCF7",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    padding: "0.875rem 2rem",
                    borderRadius: "1rem",
                    border: "1.5px solid rgba(255,252,247,0.4)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backdropFilter: "blur(4px)",
                  }}
                  className="hover:bg-white/20"
                >
                  Open Registration Form
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────── */}
      <footer id="contact" style={{ backgroundColor: "#2E2A27", padding: "4rem 0 2rem" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10" style={{ borderBottom: "1px solid rgba(255,252,247,0.1)" }}>
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#7C4F2F" }}>
                  <PawPrint size={16} color="#FFFCF7" />
                </div>
                <span style={{ color: "#FFFCF7", fontWeight: 700, fontSize: "1.1rem" }}>PawPatrol ID</span>
              </div>
              <p style={{ color: "#B9AA9F", fontSize: "0.9rem", lineHeight: 1.6 }}>
                A civic-tech platform for barangay-based pet registration and QR identification.
              </p>
            </div>
            {[
              {
                title: "Platform",
                links: [
                  { label: "Home", href: "#home" },
                  { label: "About", href: "#about" },
                  { label: "For Barangays", href: "#barangays" },
                  { label: "Contact", href: "#contact" },
                ],
              },
              {
                title: "Pet Owners",
                links: [
                  { label: "Register Pet", href: "/register-pet" },
                  { label: "Check Registration Status", href: "/check-status" },
                  { label: "Lost & Found", href: "/lost-found" },
                ],
              },
              {
                title: "Barangay Tools",
                links: [
                  { label: "Admin Login", href: "/login" },
                  { label: "Preview Barangay Dashboard", href: "/dashboard" },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <p style={{ color: "#FFFCF7", fontWeight: 600, fontSize: "0.95rem", marginBottom: "1rem" }}>
                  {col.title}
                </p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("/") ? (
                        <Link to={link.href} className="hover:text-[#FFFCF7] transition-colors" style={{ color: "#B9AA9F", fontSize: "0.85rem", textDecoration: "none" }}>
                          {link.label}
                        </Link>
                      ) : (
                        <a 
                          href={link.href} 
                          className="hover:text-[#FFFCF7] transition-colors" 
                          style={{ color: "#B9AA9F", fontSize: "0.85rem", textDecoration: "none" }}
                          onClick={(e) => {
                            if (link.href.startsWith("#") && link.href !== "#") {
                              e.preventDefault();
                              document.getElementById(link.href.replace("#", ""))?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                          }}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
            <p style={{ color: "#B9AA9F", fontSize: "0.85rem" }}>
              &copy; 2026 PawPatrol ID. Built for Philippine Barangays.
            </p>
            <p style={{ color: "#B9AA9F", fontSize: "0.85rem" }}>
              A product of Civic Innovation Labs PH
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
