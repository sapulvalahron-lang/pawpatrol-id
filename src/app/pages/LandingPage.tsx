import { Link } from "react-router";
import {
  QrCode,
  BookOpen,
  Search,
  Syringe,
  Heart,
  Users,
  PawPrint,
  ScanLine,
  AlertTriangle,
  ClipboardList,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Shield,
} from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1764942705097-cef6e29b0b42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB3YWxraW5nJTIwZG9nJTIwbmVpZ2hib3Job29kJTIwY29tbXVuaXR5fGVufDF8fHx8MTc3NzgxMDUyM3ww&ixlib=rb-4.1.0&q=80&w=1080";
const dogCollar =
  "https://images.unsplash.com/photo-1682969651476-6fb48aba8b03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBjb2xsYXIlMjB0YWclMjBpZGVudGlmaWNhdGlvbnxlbnwxfHx8fDE3Nzc4MTA1MjV8MA&ixlib=rb-4.1.0&q=80&w=1080";
const communityImage =
  "https://images.unsplash.com/photo-1767620275245-70721d786653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBzZXJ2aWNlJTIwZ292ZXJubWVudCUyMG9mZmljZSUyMHRlYW18ZW58MXx8fHwxNzc3ODEwNTI5fDA&ixlib=rb-4.1.0&q=80&w=1080";

const floatingActions = [
  {
    icon: <PawPrint size={22} />,
    label: "Register Pet",
    desc: "Submit pet info",
    color: "#7C4F2F",
    bg: "#F7EDE0",
    href: "/register",
  },
  {
    icon: <ScanLine size={22} />,
    label: "Scan QR ID",
    desc: "View pet profile",
    color: "#5C8A64",
    bg: "#EDF4EE",
    href: "/pet/1",
  },
  {
    icon: <AlertTriangle size={22} />,
    label: "Report Lost Pet",
    desc: "File a lost report",
    color: "#C0601A",
    bg: "#FDF0E6",
    href: "/lost-found",
  },
  {
    icon: <ClipboardList size={22} />,
    label: "Barangay Records",
    desc: "Manage registry",
    color: "#3B6FA0",
    bg: "#EBF3FA",
    href: "/dashboard",
  },
];

const features = [
  {
    icon: <QrCode size={24} />,
    title: "QR Pet Identification",
    desc: "Each registered pet receives a unique QR tag linking to their full profile — scannable by anyone instantly.",
    color: "#7C4F2F",
    bg: "#F7EDE0",
  },
  {
    icon: <BookOpen size={24} />,
    title: "Barangay Pet Registry",
    desc: "Barangay offices get a centralized, searchable database of all registered pets and owners in their jurisdiction.",
    color: "#5C8A64",
    bg: "#EDF4EE",
  },
  {
    icon: <Search size={24} />,
    title: "Lost & Found Reporting",
    desc: "Community-powered lost pet reporting with status tracking, photo uploads, and instant owner contact.",
    color: "#C0601A",
    bg: "#FDF0E6",
  },
  {
    icon: <Syringe size={24} />,
    title: "Vaccination Records",
    desc: "Track rabies and other vaccination schedules. Integrated reminders for pet owners and barangay health teams.",
    color: "#3B6FA0",
    bg: "#EBF3FA",
  },
  {
    icon: <Shield size={24} />,
    title: "Responsible Ownership",
    desc: "Accountability tools for barangay officials to monitor ownership compliance and identify unregistered pets.",
    color: "#7B5EA7",
    bg: "#F3EFF8",
  },
  {
    icon: <Heart size={24} />,
    title: "Adoption Support",
    desc: "Animal welfare partners can list adoptable pets and connect them with responsible owners in the barangay.",
    color: "#B84D6F",
    bg: "#FAEDF2",
  },
];

const stats = [
  { value: "120+", label: "Barangays Onboarded", icon: <MapPin size={18} /> },
  { value: "14,800+", label: "Pets Registered", icon: <PawPrint size={18} /> },
  { value: "97%", label: "QR Scan Success Rate", icon: <QrCode size={18} /> },
  { value: "340+", label: "Lost Pets Recovered", icon: <Heart size={18} /> },
];

const howItWorks = [
  {
    step: "01",
    title: "Barangay Enrolls",
    desc: "Your barangay registers on PawPatrol ID and gets access to the full admin dashboard.",
  },
  {
    step: "02",
    title: "Pet Owner Registers",
    desc: "Residents submit their pet's info and photo at the barangay office or online.",
  },
  {
    step: "03",
    title: "QR ID is Generated",
    desc: "A unique QR code is issued — print it on a tag, collar, or certificate.",
  },
  {
    step: "04",
    title: "Community Scans & Tracks",
    desc: "Anyone who finds a lost pet scans the QR to contact the owner instantly.",
  },
];

const testimonials = [
  {
    quote:
      "PawPatrol ID transformed how we handle pet registrations. What used to take hours now takes minutes.",
    name: "Kagawad Maria Santos",
    role: "Barangay Poblacion, Quezon City",
    initials: "MS",
  },
  {
    quote:
      "We recovered 3 lost dogs in our barangay within the same week using the QR system. It works!",
    name: "Tanod Juan Dela Cruz",
    role: "Barangay Bagumbuhay, Pasig",
    initials: "JD",
  },
  {
    quote:
      "As a veterinary partner, tracking vaccination compliance per barangay has never been this easy.",
    name: "Dr. Anna Reyes",
    role: "Municipal Veterinarian, Makati",
    initials: "AR",
  },
];

export function LandingPage() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#F7F2EA" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-6 pb-16 lg:pb-24">
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
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  fontWeight: 700,
                  color: "#2E2A27",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Modern Pet Registration{" "}
                <span style={{ color: "#7C4F2F" }}>for Safer Barangays</span>
              </h1>

              <p style={{ color: "#5C4E45", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "520px" }}>
                A QR-based pet identification system that helps barangays track registered pets,
                promote responsible ownership, and recover lost animals faster.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/register"
                  style={{
                    backgroundColor: "#7C4F2F",
                    color: "#FFFCF7",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.75rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s",
                    boxShadow: "0 4px 14px rgba(124, 79, 47, 0.3)",
                  }}
                >
                  Register a Pet <ArrowRight size={16} />
                </Link>
                <Link
                  to="/dashboard"
                  style={{
                    backgroundColor: "#FFFCF7",
                    color: "#2E2A27",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.75rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    border: "1.5px solid #E0D4C4",
                    transition: "all 0.2s",
                  }}
                >
                  Request Barangay Demo
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-4 pt-2 flex-wrap">
                {["Free for Barangays", "No App Required", "Data Privacy Compliant"].map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} color="#5C8A64" />
                    <span style={{ color: "#5C4E45", fontSize: "0.8rem", fontWeight: 500 }}>{badge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="relative hidden lg:block">
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  height: "520px",
                  boxShadow: "0 24px 60px rgba(124, 79, 47, 0.15)",
                }}
              >
                <img
                  src={heroImage}
                  alt="Community pet registration"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(46,42,39,0.35) 0%, transparent 60%)",
                  }}
                />
                {/* Overlay badge */}
                <div
                  className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl"
                  style={{
                    backgroundColor: "rgba(255,252,247,0.95)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#7C4F2F" }}
                    >
                      <QrCode size={20} color="#FFFCF7" />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, color: "#2E2A27", fontSize: "0.9rem" }}>
                        QR ID: PPB-2024-00842
                      </p>
                      <p style={{ color: "#8C7B6B", fontSize: "0.78rem" }}>
                        Registered · Brgy. San Isidro · Vaccinated ✓
                      </p>
                    </div>
                    <div
                      className="ml-auto px-3 py-1 rounded-full"
                      style={{ backgroundColor: "#EDF4EE" }}
                    >
                      <span style={{ color: "#3D6B45", fontSize: "0.75rem", fontWeight: 700 }}>Active</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative blob */}
              <div
                className="absolute -top-8 -right-8 w-48 h-48 rounded-full -z-10"
                style={{ backgroundColor: "#F0E4D4", opacity: 0.7 }}
              />
              <div
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full -z-10"
                style={{ backgroundColor: "#EDF4EE", opacity: 0.8 }}
              />
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20V60Z" fill="#FFFCF7" />
          </svg>
        </div>
      </section>

      {/* ── FLOATING ACTION CARDS ─────────────────────── */}
      <section style={{ backgroundColor: "#FFFCF7", paddingBottom: "5rem" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {floatingActions.map((action) => (
              <Link
                key={action.label}
                to={action.href}
                style={{
                  backgroundColor: "#FFFCF7",
                  border: "1.5px solid #E8DDD0",
                  borderRadius: "1rem",
                  padding: "1.25rem",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(124,79,47,0.12)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: action.bg, color: action.color }}
                >
                  {action.icon}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "#2E2A27", fontSize: "0.9rem" }}>
                    {action.label}
                  </p>
                  <p style={{ color: "#8C7B6B", fontSize: "0.78rem", marginTop: "0.1rem" }}>
                    {action.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────── */}
      <section style={{ backgroundColor: "#7C4F2F", padding: "4rem 0" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(255,252,247,0.15)", color: "#F7C99A" }}
                >
                  {stat.icon}
                </div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#FFFCF7",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p style={{ color: "#D4B08A", fontSize: "0.82rem", fontWeight: 500 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────── */}
      <section id="features" style={{ backgroundColor: "#F7F2EA", padding: "6rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: "#F0E4D4", border: "1px solid #C4956A" }}
            >
              <span style={{ color: "#7C4F2F", fontSize: "0.78rem", fontWeight: 600 }}>
                Platform Features
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "#2E2A27",
                marginBottom: "0.75rem",
              }}
            >
              Everything a Barangay Needs
            </h2>
            <p style={{ color: "#5C4E45", fontSize: "1rem", maxWidth: "500px", margin: "0 auto" }}>
              Built specifically for local government units — simple enough for any barangay staff to use.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  backgroundColor: "#FFFCF7",
                  border: "1.5px solid #E8DDD0",
                  borderRadius: "1.25rem",
                  padding: "1.75rem",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(124,79,47,0.1)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: f.bg, color: f.color }}
                >
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 700, color: "#2E2A27", marginBottom: "0.5rem", fontSize: "1rem" }}>
                  {f.title}
                </h3>
                <p style={{ color: "#5C4E45", fontSize: "0.875rem", lineHeight: 1.65 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section style={{ backgroundColor: "#FFFCF7", padding: "6rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: "#EDF4EE", border: "1px solid #A8C9AE" }}
              >
                <span style={{ color: "#3D6B45", fontSize: "0.78rem", fontWeight: 600 }}>
                  How It Works
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                  fontWeight: 700,
                  color: "#2E2A27",
                  marginBottom: "0.75rem",
                }}
              >
                From Registration to Recovery — All in One Platform
              </h2>
              <p style={{ color: "#5C4E45", marginBottom: "2.5rem", lineHeight: 1.7, fontSize: "0.95rem" }}>
                PawPatrol ID is designed to work within existing barangay workflows — no technical expertise required.
              </p>
              <div className="space-y-5">
                {howItWorks.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "#F7EDE0" }}
                    >
                      <span style={{ color: "#7C4F2F", fontWeight: 800, fontSize: "0.75rem" }}>
                        {step.step}
                      </span>
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, color: "#2E2A27", marginBottom: "0.2rem" }}>{step.title}</p>
                      <p style={{ color: "#5C4E45", fontSize: "0.875rem", lineHeight: 1.6 }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/dashboard"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "2rem",
                  backgroundColor: "#7C4F2F",
                  color: "#FFFCF7",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.75rem",
                }}
              >
                View Barangay Dashboard <ArrowRight size={15} />
              </Link>
            </div>
            <div className="space-y-4">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ height: "280px", boxShadow: "0 12px 40px rgba(124,79,47,0.15)" }}
              >
                <img src={dogCollar} alt="Pet ID tag" className="w-full h-full object-cover" />
              </div>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ height: "220px", boxShadow: "0 12px 40px rgba(124,79,47,0.1)" }}
              >
                <img src={communityImage} alt="Barangay team" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR BARANGAYS ────────────────────────────── */}
      <section id="barangays" style={{ backgroundColor: "#F7F2EA", padding: "6rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl p-8 lg:p-14 text-center"
            style={{
              background: "linear-gradient(135deg, #7C4F2F 0%, #9B6340 60%, #C4956A 100%)",
              boxShadow: "0 20px 60px rgba(124,79,47,0.3)",
            }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: "rgba(255,252,247,0.2)", border: "1px solid rgba(255,252,247,0.3)" }}
            >
              <Users size={14} color="#F7C99A" />
              <span style={{ color: "#F7C99A", fontSize: "0.78rem", fontWeight: 600 }}>
                For Barangay Officials
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "#FFFCF7",
                marginBottom: "1rem",
              }}
            >
              Empower Your Barangay with Smarter Pet Governance
            </h2>
            <p style={{ color: "#F0D9C2", maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.7, fontSize: "0.95rem" }}>
              PawPatrol ID integrates seamlessly into barangay operations. Track registrations, manage vaccination campaigns, and coordinate with animal welfare partners — all from one dashboard.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/dashboard"
                style={{
                  backgroundColor: "#FFFCF7",
                  color: "#7C4F2F",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.75rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                View Dashboard <ArrowRight size={15} />
              </Link>
              <Link
                to="/register"
                style={{
                  backgroundColor: "rgba(255,252,247,0.15)",
                  color: "#FFFCF7",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.75rem",
                  border: "1.5px solid rgba(255,252,247,0.35)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                Start Registration
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────── */}
      <section style={{ backgroundColor: "#FFFCF7", padding: "6rem 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                fontWeight: 700,
                color: "#2E2A27",
                marginBottom: "0.5rem",
              }}
            >
              Trusted by Barangay Officials Across the Philippines
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                style={{
                  backgroundColor: "#F7F2EA",
                  border: "1.5px solid #E8DDD0",
                  borderRadius: "1.25rem",
                  padding: "1.75rem",
                }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: "#C4956A", fontSize: "1rem" }}>★</span>
                  ))}
                </div>
                <p style={{ color: "#3D3530", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem", fontStyle: "italic" }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#7C4F2F" }}
                  >
                    <span style={{ color: "#FFFCF7", fontWeight: 700, fontSize: "0.8rem" }}>{t.initials}</span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: "#2E2A27", fontSize: "0.875rem" }}>{t.name}</p>
                    <p style={{ color: "#8C7B6B", fontSize: "0.775rem" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────── */}
      <footer style={{ backgroundColor: "#2E2A27", padding: "3rem 0 2rem" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8" style={{ borderBottom: "1px solid rgba(255,252,247,0.1)" }}>
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#7C4F2F" }}>
                  <PawPrint size={16} color="#FFFCF7" />
                </div>
                <span style={{ color: "#FFFCF7", fontWeight: 700 }}>PawPatrol ID</span>
              </div>
              <p style={{ color: "#9C8D82", fontSize: "0.82rem", lineHeight: 1.6 }}>
                A civic-tech platform for barangay-based pet registration and QR identification.
              </p>
            </div>
            {[
              {
                title: "Platform",
                links: ["Features", "For Barangays", "Lost & Found", "Pet Profile"],
              },
              {
                title: "Partners",
                links: ["Barangay Officials", "Veterinary Clinics", "Animal Welfare", "LGU Integration"],
              },
              {
                title: "Support",
                links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Use"],
              },
            ].map((col) => (
              <div key={col.title}>
                <p style={{ color: "#FFFCF7", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.75rem" }}>
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" style={{ color: "#9C8D82", fontSize: "0.82rem", textDecoration: "none" }}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
            <p style={{ color: "#6B5E56", fontSize: "0.78rem" }}>
              © 2026 PawPatrol ID. Built for Philippine Barangays.
            </p>
            <p style={{ color: "#6B5E56", fontSize: "0.78rem" }}>
              A product of Civic Innovation Labs PH
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
