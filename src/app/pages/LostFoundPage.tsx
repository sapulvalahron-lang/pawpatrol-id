import { useState } from "react";
import { Link } from "react-router";
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Phone,
  Calendar,
  Filter,
  PawPrint,
  ArrowLeft,
  X,
  ChevronRight,
  Heart,
  ScanLine,
  Clock,
  Flag,
} from "lucide-react";

const goldenRetriever =
  "https://images.unsplash.com/photo-1768676758480-44e11e5c164a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdCUyMG91dGRvb3JzfGVufDF8fHx8MTc3NzgxMDUyNHww&ixlib=rb-4.1.0&q=80&w=400";
const tabbyCat =
  "https://images.unsplash.com/photo-1759687134753-3b5dc2e53c41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJieSUyMGNhdCUyMHNpdHRpbmclMjB3aW5kb3clMjBsaWdodHxlbnwxfHx8fDE3Nzc4MTA1MjR8MA&ixlib=rb-4.1.0&q=80&w=400";
const beagle =
  "https://images.unsplash.com/photo-1559015307-e8e2c0e62223?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFnbGUlMjBwdXBweSUyMGN1dGUlMjBicm93biUyMHdoaXRlfGVufDF8fHx8MTc3NzgxMDUyNXww&ixlib=rb-4.1.0&q=80&w=400";
const shihTzu =
  "https://images.unsplash.com/photo-1712742606909-c95e463539a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGloJTIwdHp1JTIwZG9nJTIwd2hpdGUlMjBmbHVmZnl8ZW58MXx8fHwxNzc3ODEwNTI4fDA&ixlib=rb-4.1.0&q=80&w=400";
const blackLab =
  "https://images.unsplash.com/photo-1763568890860-1793fced7249?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGxhYnJhZG9yJTIwZG9nJTIwc2l0dGluZyUyMHBhcmt8ZW58MXx8fHwxNzc3ODEwNTI3fDA&ixlib=rb-4.1.0&q=80&w=400";
const orangeCat =
  "https://images.unsplash.com/photo-1709473361891-ec127a5cf3cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjBjYXQlMjBtaXNzaW5nJTIwbG9zdCUyMHBvc3RlcnxlbnwxfHx8fDE3Nzc4MTA1Mjh8MA&ixlib=rb-4.1.0&q=80&w=400";

interface PetReport {
  id: number;
  type: "lost" | "found";
  petName?: string;
  species: string;
  breed: string;
  color: string;
  sex: string;
  area: string;
  barangay: string;
  date: string;
  description: string;
  contact: string;
  img: string;
  qrId?: string;
  hasQrTag: boolean;
  reporterName: string;
}

const reports: PetReport[] = [
  {
    id: 1,
    type: "lost",
    petName: "Brownie",
    species: "Dog",
    breed: "Golden Retriever",
    color: "Golden Brown",
    sex: "Male",
    area: "Near Sampaguita St. Market",
    barangay: "Brgy. San Isidro, QC",
    date: "May 2, 2026",
    description: "Last seen wearing a red collar with a QR tag. Friendly and responds to 'Brownie'. Missing since Thursday evening.",
    contact: "0917-234-5678",
    img: goldenRetriever,
    qrId: "PPB-2026-00842",
    hasQrTag: true,
    reporterName: "Maria Santos",
  },
  {
    id: 2,
    type: "lost",
    petName: "Mochi",
    species: "Cat",
    breed: "Domestic Shorthair",
    color: "Gray Tabby",
    sex: "Female",
    area: "Villa Nueva Subd.",
    barangay: "Brgy. Bagumbuhay, QC",
    date: "Apr 30, 2026",
    description: "Gray tabby with white belly. Shy around strangers. Has a small notch on the left ear. No collar.",
    contact: "0998-765-4321",
    img: tabbyCat,
    hasQrTag: false,
    reporterName: "Juan dela Cruz",
  },
  {
    id: 3,
    type: "lost",
    petName: "Choco",
    species: "Dog",
    breed: "Beagle",
    color: "Tri-color (Brown/White/Black)",
    sex: "Male",
    area: "Circular Road Area",
    barangay: "Brgy. Poblacion, Pasig",
    date: "May 1, 2026",
    description: "Beagle mix, very energetic. Has a blue collar. Responds to 'Choco'. May have gone towards Kapitolyo area.",
    contact: "0912-888-0011",
    img: beagle,
    qrId: "PPB-2026-00840",
    hasQrTag: true,
    reporterName: "Ana Reyes",
  },
  {
    id: 4,
    type: "found",
    species: "Dog",
    breed: "Shih Tzu",
    color: "White and Cream",
    sex: "Female",
    area: "In front of BrGy. Hall",
    barangay: "Brgy. Santa Cruz, Manila",
    date: "May 3, 2026",
    description: "Found a small Shih Tzu, appears well-groomed. No collar but seems domesticated. Currently in temporary shelter at the barangay hall.",
    contact: "Barangay Office: 02-8812-0099",
    img: shihTzu,
    hasQrTag: false,
    reporterName: "Barangay Tanod Manalo",
  },
  {
    id: 5,
    type: "found",
    species: "Dog",
    breed: "Labrador",
    color: "Black",
    sex: "Male",
    area: "Ortigas Ave. near C5",
    barangay: "Brgy. Ugong, Pasig",
    date: "May 2, 2026",
    description: "Large black Labrador, appears to be 2-3 years old. Has a QR tag but it's damaged. Very friendly and house-trained. Safe with finder.",
    contact: "0922-333-4455",
    img: blackLab,
    hasQrTag: true,
    reporterName: "Rodrigo Punzalan",
  },
  {
    id: 6,
    type: "found",
    species: "Cat",
    breed: "Domestic Longhair",
    color: "Orange",
    sex: "Unknown",
    area: "Bagong Lipunan Condo Area",
    barangay: "Brgy. Batasan Hills, QC",
    date: "Apr 29, 2026",
    description: "Orange cat found wandering near the condo. No identifiable markings. Appears healthy. Being cared for by finder.",
    contact: "0933-111-2222",
    img: orangeCat,
    hasQrTag: false,
    reporterName: "Luz Ocampo",
  },
];

interface ReportFormState {
  open: boolean;
  type: "lost" | "found";
}

export function LostFoundPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "lost" | "found">("all");
  const [filterSpecies, setFilterSpecies] = useState("All");
  const [reportForm, setReportForm] = useState<ReportFormState>({ open: false, type: "lost" });
  const [formData, setFormData] = useState({ name: "", species: "Dog", breed: "", color: "", area: "", barangay: "", contact: "", desc: "" });
  const [submitted, setSubmitted] = useState(false);

  const filtered = reports.filter((r) => {
    const matchSearch =
      !search ||
      r.petName?.toLowerCase().includes(search.toLowerCase()) ||
      r.breed.toLowerCase().includes(search.toLowerCase()) ||
      r.barangay.toLowerCase().includes(search.toLowerCase()) ||
      r.color.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === "all" || r.type === activeTab;
    const matchSpecies = filterSpecies === "All" || r.species === filterSpecies;
    return matchSearch && matchTab && matchSpecies;
  });

  const lostCount = reports.filter((r) => r.type === "lost").length;
  const foundCount = reports.filter((r) => r.type === "found").length;

  const inputStyle = {
    width: "100%",
    padding: "0.6rem 0.875rem",
    borderRadius: "0.625rem",
    border: "1.5px solid #E0D4C4",
    backgroundColor: "#FFFCF7",
    color: "#2E2A27",
    fontSize: "0.875rem",
    outline: "none",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  };

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ backgroundColor: "#F7F2EA", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            color: "#7C4F2F",
            fontWeight: 600,
            fontSize: "0.85rem",
            textDecoration: "none",
            marginBottom: "1.5rem",
          }}
        >
          <ArrowLeft size={15} /> Back to Home
        </Link>

        {/* Header */}
        <div className="mb-7">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 700,
                  color: "#2E2A27",
                  marginBottom: "0.35rem",
                }}
              >
                Lost & Found Pets
              </h1>
              <p style={{ color: "#5C4E45", fontSize: "0.875rem" }}>
                Community board for lost and found pet reports across barangays
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setReportForm({ open: true, type: "lost" })}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.6rem 1rem",
                  borderRadius: "0.625rem",
                  backgroundColor: "#FDF0E6",
                  color: "#C0601A",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  border: "1.5px solid #E8B88A",
                  cursor: "pointer",
                }}
              >
                <AlertTriangle size={15} /> Report Lost Pet
              </button>
              <button
                onClick={() => setReportForm({ open: true, type: "found" })}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.6rem 1rem",
                  borderRadius: "0.625rem",
                  backgroundColor: "#EDF4EE",
                  color: "#3D6B45",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  border: "1.5px solid #A8C9AE",
                  cursor: "pointer",
                }}
              >
                <CheckCircle2 size={15} /> Report Found Pet
              </button>
            </div>
          </div>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Active Lost Reports", count: lostCount, icon: <AlertTriangle size={16} />, color: "#C0601A", bg: "#FDF0E6" },
            { label: "Found Pet Reports", count: foundCount, icon: <Heart size={16} />, color: "#3D6B45", bg: "#EDF4EE" },
            { label: "Pets Reunited (May)", count: 7, icon: <CheckCircle2 size={16} />, color: "#3B6FA0", bg: "#EBF3FA" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl"
              style={{ backgroundColor: stat.bg, border: "none" }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(255,255,255,0.6)", color: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="text-center sm:text-left">
                <p style={{ fontSize: "1.35rem", fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.count}</p>
                <p style={{ fontSize: "0.72rem", color: stat.color, fontWeight: 600, opacity: 0.85, marginTop: "0.15rem" }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div
          className="p-4 rounded-2xl mb-6"
          style={{ backgroundColor: "#FFFCF7", border: "1.5px solid #E8DDD0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={16}
                color="#8C7B6B"
                style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                style={{ ...inputStyle, paddingLeft: "2.5rem" }}
                placeholder="Search by name, breed, barangay, color..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
              />
            </div>

            {/* Species Filter */}
            <div className="flex items-center gap-2">
              <Filter size={15} color="#8C7B6B" />
              <select
                style={{ ...inputStyle, width: "auto", paddingRight: "2rem", cursor: "pointer", minWidth: "120px" }}
                value={filterSpecies}
                onChange={(e) => setFilterSpecies(e.target.value)}
              >
                {["All", "Dog", "Cat", "Rabbit", "Bird", "Other"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tab Filters */}
          <div className="flex gap-2 mt-3">
            {(["all", "lost", "found"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "999px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  backgroundColor:
                    activeTab === tab
                      ? tab === "lost"
                        ? "#C0601A"
                        : tab === "found"
                        ? "#3D6B45"
                        : "#7C4F2F"
                      : "#F7F2EA",
                  color: activeTab === tab ? "#fff" : "#5C4E45",
                  transition: "all 0.15s",
                }}
              >
                {tab === "all" ? "All Reports" : tab === "lost" ? `Lost (${lostCount})` : `Found (${foundCount})`}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p style={{ color: "#8C7B6B", fontSize: "0.8rem", marginBottom: "1rem", fontWeight: 500 }}>
          Showing <strong style={{ color: "#2E2A27" }}>{filtered.length}</strong> reports
          {search && ` matching "${search}"`}
        </p>

        {/* Cards Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <PawPrint size={40} color="#C4956A" style={{ margin: "0 auto 1rem" }} />
            <p style={{ fontWeight: 700, color: "#2E2A27", fontSize: "1rem" }}>No reports found</p>
            <p style={{ color: "#8C7B6B", fontSize: "0.875rem" }}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((report) => (
              <div
                key={report.id}
                style={{
                  backgroundColor: "#FFFCF7",
                  border: `2px solid ${report.type === "lost" ? "#E8B88A" : "#A8C9AE"}`,
                  borderRadius: "1.25rem",
                  overflow: "hidden",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
                }}
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={report.img}
                    alt={report.petName || "Found pet"}
                    style={{ width: "100%", height: "180px", objectFit: "cover" }}
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        padding: "0.25rem 0.7rem",
                        borderRadius: "999px",
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        backgroundColor: report.type === "lost" ? "rgba(192,96,26,0.95)" : "rgba(61,107,69,0.95)",
                        color: "#fff",
                        backdropFilter: "blur(4px)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {report.type === "lost" ? (
                        <><AlertTriangle size={11} /> LOST</>
                      ) : (
                        <><CheckCircle2 size={11} /> FOUND</>
                      )}
                    </span>
                  </div>
                  {/* QR Tag indicator */}
                  {report.hasQrTag && (
                    <div className="absolute top-3 right-3">
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "999px",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          backgroundColor: "rgba(124,79,47,0.9)",
                          color: "#FFFCF7",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        <ScanLine size={11} /> QR ID
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 style={{ fontWeight: 800, color: "#2E2A27", fontSize: "0.95rem" }}>
                        {report.petName || `${report.species} (Unknown Name)`}
                      </h3>
                      <p style={{ color: "#8C7B6B", fontSize: "0.78rem" }}>
                        {report.breed} · {report.color} · {report.sex}
                      </p>
                    </div>
                    {report.qrId && (
                      <span
                        style={{
                          fontSize: "0.65rem",
                          fontFamily: "monospace",
                          color: "#7C4F2F",
                          backgroundColor: "#F7EDE0",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "999px",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {report.qrId.slice(-5)}
                      </span>
                    )}
                  </div>

                  <p style={{ color: "#5C4E45", fontSize: "0.8rem", lineHeight: 1.55, marginBottom: "0.875rem" }}>
                    {report.description.slice(0, 100)}...
                  </p>

                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} color="#C4956A" />
                      <span style={{ color: "#5C4E45", fontSize: "0.78rem" }}>{report.area}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Flag size={13} color="#C4956A" />
                      <span style={{ color: "#5C4E45", fontSize: "0.78rem" }}>{report.barangay}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} color="#C4956A" />
                      <span style={{ color: "#8C7B6B", fontSize: "0.75rem" }}>Reported: {report.date}</span>
                    </div>
                  </div>

                  {/* Reporter */}
                  <div
                    className="flex items-center gap-2 p-2.5 rounded-xl mb-3"
                    style={{ backgroundColor: "#F7F2EA" }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#C4956A" }}
                    >
                      <span style={{ color: "#FFFCF7", fontWeight: 700, fontSize: "0.65rem" }}>
                        {report.reporterName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.72rem", color: "#8C7B6B", fontWeight: 500 }}>Reported by</p>
                      <p style={{ fontSize: "0.78rem", color: "#2E2A27", fontWeight: 700, lineHeight: 1 }}>{report.reporterName}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <a
                      href={`tel:${report.contact}`}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.35rem",
                        padding: "0.55rem",
                        borderRadius: "0.625rem",
                        backgroundColor: report.type === "lost" ? "#7C4F2F" : "#5C8A64",
                        color: "#FFFCF7",
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        textDecoration: "none",
                      }}
                    >
                      <Phone size={13} />
                      {report.type === "lost" ? "Contact Owner" : "Contact Finder"}
                    </a>
                    <Link
                      to="/pet/1"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.25rem",
                        padding: "0.55rem 0.75rem",
                        borderRadius: "0.625rem",
                        backgroundColor: "#F7F2EA",
                        color: "#5C4E45",
                        fontWeight: 600,
                        fontSize: "0.78rem",
                        textDecoration: "none",
                        border: "1.5px solid #E8DDD0",
                      }}
                    >
                      Profile <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div
          className="mt-10 p-6 sm:p-8 rounded-3xl text-center"
          style={{
            background: "linear-gradient(135deg, #2E2A27 0%, #5C4E45 100%)",
          }}
        >
          <PawPrint size={32} color="#C4956A" style={{ margin: "0 auto 0.75rem" }} />
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#FFFCF7",
              marginBottom: "0.5rem",
            }}
          >
            Is Your Pet Registered with a QR ID?
          </h2>
          <p style={{ color: "#C4B4A4", fontSize: "0.875rem", maxWidth: "480px", margin: "0 auto 1.5rem", lineHeight: 1.65 }}>
            Registered pets have a much higher chance of being returned when lost. Get your pet's QR ID tag today — free through your barangay.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/register"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.7rem 1.5rem",
                borderRadius: "0.75rem",
                backgroundColor: "#7C4F2F",
                color: "#FFFCF7",
                fontWeight: 700,
                fontSize: "0.875rem",
                textDecoration: "none",
              }}
            >
              <PawPrint size={15} /> Register Your Pet
            </Link>
            <button
              onClick={() => setReportForm({ open: true, type: "lost" })}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.7rem 1.5rem",
                borderRadius: "0.75rem",
                backgroundColor: "rgba(255,252,247,0.1)",
                color: "#FFFCF7",
                fontWeight: 700,
                fontSize: "0.875rem",
                border: "1.5px solid rgba(255,252,247,0.25)",
                cursor: "pointer",
              }}
            >
              <AlertTriangle size={15} /> Report Lost Pet
            </button>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {reportForm.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(46,42,39,0.55)", backdropFilter: "blur(4px)" }}
          onClick={() => {
            setReportForm({ open: false, type: "lost" });
            setSubmitted(false);
          }}
        >
          <div
            className="w-full max-w-lg rounded-3xl overflow-hidden"
            style={{
              backgroundColor: "#FFFCF7",
              boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{
                borderBottom: "1.5px solid #E8DDD0",
                backgroundColor: reportForm.type === "lost" ? "#FDF0E6" : "#EDF4EE",
              }}
            >
              <div className="flex items-center gap-2">
                {reportForm.type === "lost" ? (
                  <AlertTriangle size={18} color="#C0601A" />
                ) : (
                  <CheckCircle2 size={18} color="#3D6B45" />
                )}
                <h3 style={{ fontWeight: 700, color: "#2E2A27", fontSize: "1rem" }}>
                  {reportForm.type === "lost" ? "Report a Lost Pet" : "Report a Found Pet"}
                </h3>
              </div>
              <button
                onClick={() => {
                  setReportForm({ open: false, type: "lost" });
                  setSubmitted(false);
                }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#8C7B6B" }}
              >
                <X size={20} />
              </button>
            </div>

            {submitted ? (
              <div className="p-8 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: reportForm.type === "lost" ? "#FDF0E6" : "#EDF4EE" }}
                >
                  {reportForm.type === "lost" ? (
                    <AlertTriangle size={28} color="#C0601A" />
                  ) : (
                    <CheckCircle2 size={28} color="#3D6B45" />
                  )}
                </div>
                <h3 style={{ fontWeight: 700, color: "#2E2A27", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                  Report Submitted!
                </h3>
                <p style={{ color: "#5C4E45", fontSize: "0.875rem", lineHeight: 1.65 }}>
                  Your report has been posted to the community board and shared with the barangay office. You'll be contacted if there's an update.
                </p>
                <button
                  onClick={() => {
                    setReportForm({ open: false, type: "lost" });
                    setSubmitted(false);
                  }}
                  style={{
                    marginTop: "1.5rem",
                    padding: "0.65rem 1.5rem",
                    borderRadius: "0.75rem",
                    backgroundColor: "#7C4F2F",
                    color: "#FFFCF7",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#5C4E45", marginBottom: "0.35rem", textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>
                      Pet Name {reportForm.type === "lost" ? "*" : "(if known)"}
                    </label>
                    <input
                      style={inputStyle}
                      placeholder={reportForm.type === "lost" ? "Your pet's name" : "Unknown if unsure"}
                      value={formData.name}
                      onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                      onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#5C4E45", marginBottom: "0.35rem", textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>
                      Species *
                    </label>
                    <select
                      style={{ ...inputStyle, cursor: "pointer" }}
                      value={formData.species}
                      onChange={(e) => setFormData((f) => ({ ...f, species: e.target.value }))}
                    >
                      {["Dog", "Cat", "Rabbit", "Bird", "Other"].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#5C4E45", marginBottom: "0.35rem", textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>
                      Breed
                    </label>
                    <input
                      style={inputStyle}
                      placeholder="e.g. Aspin, Mixed"
                      value={formData.breed}
                      onChange={(e) => setFormData((f) => ({ ...f, breed: e.target.value }))}
                      onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#5C4E45", marginBottom: "0.35rem", textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>
                      Color / Markings
                    </label>
                    <input
                      style={inputStyle}
                      placeholder="e.g. Brown with white patch"
                      value={formData.color}
                      onChange={(e) => setFormData((f) => ({ ...f, color: e.target.value }))}
                      onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#5C4E45", marginBottom: "0.35rem", textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>
                    {reportForm.type === "lost" ? "Last Seen Area *" : "Found At Location *"}
                  </label>
                  <div className="relative">
                    <MapPin size={14} color="#8C7B6B" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
                    <input
                      style={{ ...inputStyle, paddingLeft: "2.25rem" }}
                      placeholder="Street, landmark, area"
                      value={formData.area}
                      onChange={(e) => setFormData((f) => ({ ...f, area: e.target.value }))}
                      onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#5C4E45", marginBottom: "0.35rem", textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>
                    Description
                  </label>
                  <textarea
                    style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                    placeholder="Physical features, behavior, last outfit/collar worn..."
                    value={formData.desc}
                    onChange={(e) => setFormData((f) => ({ ...f, desc: e.target.value }))}
                    onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                    onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#5C4E45", marginBottom: "0.35rem", textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>
                    Your Contact Number *
                  </label>
                  <div className="relative">
                    <Phone size={14} color="#8C7B6B" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
                    <input
                      style={{ ...inputStyle, paddingLeft: "2.25rem" }}
                      placeholder="09XX XXX XXXX"
                      value={formData.contact}
                      onChange={(e) => setFormData((f) => ({ ...f, contact: e.target.value }))}
                      onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setReportForm({ open: false, type: "lost" });
                    }}
                    style={{
                      flex: 1,
                      padding: "0.7rem",
                      borderRadius: "0.75rem",
                      backgroundColor: "#F7F2EA",
                      color: "#5C4E45",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      border: "1.5px solid #E8DDD0",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setSubmitted(true)}
                    style={{
                      flex: 2,
                      padding: "0.7rem",
                      borderRadius: "0.75rem",
                      backgroundColor: reportForm.type === "lost" ? "#C0601A" : "#3D6B45",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {reportForm.type === "lost" ? "Submit Lost Report" : "Submit Found Report"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
