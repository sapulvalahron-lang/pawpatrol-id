import { useState } from "react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import {
  PawPrint,
  LayoutDashboard,
  ClipboardList,
  Search,
  AlertTriangle,
  QrCode,
  Settings,
  Bell,
  ChevronDown,
  Plus,
  Download,
  Filter,
  MoreHorizontal,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  Menu,
  X,
  LogOut,
  Map,
  Heart,
  Syringe,
  ChevronRight,
} from "lucide-react";

const goldenRetriever =
  "https://images.unsplash.com/photo-1768676758480-44e11e5c164a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdCUyMG91dGRvb3JzfGVufDF8fHx8MTc3NzgxMDUyNHww&ixlib=rb-4.1.0&q=80&w=400";
const tabbyCat =
  "https://images.unsplash.com/photo-1759687134753-3b5dc2e53c41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJieSUyMGNhdCUyMHNpdHRpbmclMjB3aW5kb3clMjBsaWdodHxlbnwxfHx8fDE3Nzc4MTA1MjR8MA&ixlib=rb-4.1.0&q=80&w=400";
const beagle =
  "https://images.unsplash.com/photo-1559015307-e8e2c0e62223?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFnbGUlMjBwdXBweSUyMGN1dGUlMjBicm93biUyMHdoaXRlfGVufDF8fHx8MTc3NzgxMDUyNXww&ixlib=rb-4.1.0&q=80&w=400";
const shihTzu =
  "https://images.unsplash.com/photo-1712742606909-c95e463539a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGloJTIwdHp1JTIwZG9nJTIwd2hpdGUlMjBmbHVmZnl8ZW58MXx8fHwxNzc3ODEwNTI4fDA&ixlib=rb-4.1.0&q=80&w=400";

const statCards = [
  {
    label: "Registered Pets",
    value: "842",
    change: "+28 this month",
    description: "Official pet records currently tracked by the barangay registry.",
    icon: <PawPrint size={20} />,
    color: "#7C4F2F",
    bg: "#F7EDE0",
    trend: "+",
  },
  {
    label: "Lost Reports",
    value: "12",
    change: "3 pending review",
    description: "Open lost-pet cases that need owner, finder, or field follow-up.",
    icon: <AlertTriangle size={20} />,
    color: "#C0601A",
    bg: "#FDF0E6",
    trend: "-",
  },
  {
    label: "Found Reports",
    value: "9",
    change: "7 reunited",
    description: "Found-pet reports coordinated through the barangay recovery board.",
    icon: <Heart size={20} />,
    color: "#5C8A64",
    bg: "#EDF4EE",
    trend: "+",
  },
  {
    label: "Pending Registrations",
    value: "34",
    change: "Needs approval",
    description: "New submissions waiting for barangay verification and QR assignment.",
    icon: <Clock size={20} />,
    color: "#3B6FA0",
    bg: "#EBF3FA",
    trend: "~",
  },
];

const recentRegistrations = [
  {
    id: "PPB-2024-00842",
    pet: "Brownie",
    type: "Dog",
    breed: "Aspin",
    owner: "Maria Santos",
    date: "May 2, 2026",
    status: "Active",
    vaccinated: true,
    img: goldenRetriever,
  },
  {
    id: "PPB-2024-00841",
    pet: "Mochi",
    type: "Cat",
    breed: "Domestic Shorthair",
    owner: "Juan dela Cruz",
    date: "May 1, 2026",
    status: "Active",
    vaccinated: true,
    img: tabbyCat,
  },
  {
    id: "PPB-2024-00840",
    pet: "Choco",
    type: "Dog",
    breed: "Beagle",
    owner: "Ana Reyes",
    date: "Apr 30, 2026",
    status: "Pending",
    vaccinated: false,
    img: beagle,
  },
  {
    id: "PPB-2024-00839",
    pet: "Snowball",
    type: "Dog",
    breed: "Shih Tzu",
    owner: "Pedro Manalo",
    date: "Apr 29, 2026",
    status: "Active",
    vaccinated: true,
    img: shihTzu,
  },
  {
    id: "PPB-2024-00838",
    pet: "Kitkat",
    type: "Cat",
    breed: "Persian",
    owner: "Rosa Lim",
    date: "Apr 28, 2026",
    status: "Lost",
    vaccinated: true,
    img: tabbyCat,
  },
];

const sidebarItems = [
  { icon: <LayoutDashboard size={18} />, label: "Overview", href: "/dashboard" },
  { icon: <PawPrint size={18} />, label: "All Pets", href: "/dashboard/all-pets" },
  { icon: <ClipboardList size={18} />, label: "Registrations", href: "/register-pet" },
  { icon: <AlertTriangle size={18} />, label: "Lost & Found", href: "/lost-found" },
  { icon: <Syringe size={18} />, label: "Vaccinations", href: "/dashboard/vaccinations" },
  { icon: <Map size={18} />, label: "Barangay Map", href: "/dashboard/barangay-map" },
  { icon: <QrCode size={18} />, label: "QR Generator", href: "/dashboard/qr-generator" },
  { icon: <Users size={18} />, label: "Pet Owners", href: "/dashboard/pet-owners" },
];

const dashboardSections: Record<
  string,
  {
    title: string;
    description: string;
    cards: { label: string; value: string; copy: string; color: string; bg: string; icon: ReactNode }[];
  }
> = {
  "/dashboard/all-pets": {
    title: "All Pets",
    description: "Browse the barangay pet registry, review active records, and prepare owner accountability workflows.",
    cards: [
      { label: "Active Records", value: "842", copy: "Registered pets currently visible to barangay staff.", color: "#7C4F2F", bg: "#F7EDE0", icon: <PawPrint size={18} /> },
      { label: "Pending Review", value: "34", copy: "Records waiting for validation before QR ID release.", color: "#3B6FA0", bg: "#EBF3FA", icon: <Clock size={18} /> },
      { label: "Flagged Cases", value: "12", copy: "Lost, incomplete, or follow-up-required records.", color: "#C0601A", bg: "#FDF0E6", icon: <AlertTriangle size={18} /> },
    ],
  },
  "/dashboard/vaccinations": {
    title: "Vaccinations",
    description: "Track compliance, verification gaps, and upcoming health program readiness across registered pets.",
    cards: [
      { label: "Due This Month", value: "68", copy: "Pets projected for anti-rabies follow-up this month.", color: "#C0601A", bg: "#FDF0E6", icon: <Clock size={18} /> },
      { label: "Vaccinated Pets", value: "74%", copy: "Current rabies vaccination coverage in the registry.", color: "#5C8A64", bg: "#EDF4EE", icon: <CheckCircle2 size={18} /> },
      { label: "Pending Verification", value: "41", copy: "Uploaded records that need barangay confirmation.", color: "#3B6FA0", bg: "#EBF3FA", icon: <ClipboardList size={18} /> },
      { label: "Vet Partner Sync", value: "Planned", copy: "Future module for clinic and barangay coordination.", color: "#7C4F2F", bg: "#F7EDE0", icon: <Syringe size={18} /> },
    ],
  },
  "/dashboard/barangay-map": {
    title: "Barangay Map",
    description: "Prepare location intelligence for coverage zones, lost-and-found activity, and household pet density.",
    cards: [
      { label: "Coverage Zones", value: "7", copy: "Mock barangay zones ready for future map plotting.", color: "#7C4F2F", bg: "#F7EDE0", icon: <Map size={18} /> },
      { label: "Lost/Found Areas", value: "14", copy: "Recent report locations that can be clustered later.", color: "#C0601A", bg: "#FDF0E6", icon: <AlertTriangle size={18} /> },
      { label: "Pet Density", value: "High", copy: "Sample density signal for household registration planning.", color: "#5C8A64", bg: "#EDF4EE", icon: <PawPrint size={18} /> },
      { label: "Map Integration", value: "Planned", copy: "Future GIS or map provider integration point.", color: "#3B6FA0", bg: "#EBF3FA", icon: <Map size={18} /> },
    ],
  },
  "/dashboard/qr-generator": {
    title: "QR Generator",
    description: "Preview the future QR workflow for pet profile links, scan-to-owner identification, and tag printing.",
    cards: [
      { label: "QR Profile Links", value: "Ready", copy: "Each pet record will resolve to a public profile page.", color: "#5C8A64", bg: "#EDF4EE", icon: <QrCode size={18} /> },
      { label: "Tag Printing", value: "Planned", copy: "Batch print workflow for barangay-issued pet tags.", color: "#7C4F2F", bg: "#F7EDE0", icon: <Download size={18} /> },
      { label: "Scan-to-Owner", value: "MVP", copy: "Contact and accountability flow prepared for recovery use cases.", color: "#3B6FA0", bg: "#EBF3FA", icon: <Users size={18} /> },
      { label: "QR Generation", value: "Planned", copy: "Real QR generation will be added after frontend routing.", color: "#C0601A", bg: "#FDF0E6", icon: <QrCode size={18} /> },
    ],
  },
  "/dashboard/pet-owners": {
    title: "Pet Owners",
    description: "Organize owner accountability, contact readiness, and household-level pet registration coverage.",
    cards: [
      { label: "Registered Owners", value: "516", copy: "Mock count of pet owners represented in the registry.", color: "#7C4F2F", bg: "#F7EDE0", icon: <Users size={18} /> },
      { label: "Contact Verified", value: "88%", copy: "Owner phone and address fields ready for validation workflows.", color: "#5C8A64", bg: "#EDF4EE", icon: <CheckCircle2 size={18} /> },
      { label: "Multiple Pets", value: "93", copy: "Households with more than one registered pet.", color: "#3B6FA0", bg: "#EBF3FA", icon: <PawPrint size={18} /> },
    ],
  },
  "/dashboard/settings": {
    title: "Settings",
    description: "Prepare barangay profile settings, module controls, and civic reporting preferences.",
    cards: [
      { label: "Barangay Profile", value: "San Isidro", copy: "Office identity and public-facing registry details.", color: "#7C4F2F", bg: "#F7EDE0", icon: <Settings size={18} /> },
      { label: "Modules", value: "6", copy: "Navigation modules currently enabled for prototype review.", color: "#3B6FA0", bg: "#EBF3FA", icon: <LayoutDashboard size={18} /> },
      { label: "Reports", value: "Planned", copy: "Future export and compliance reporting preferences.", color: "#5C8A64", bg: "#EDF4EE", icon: <ClipboardList size={18} /> },
    ],
  },
};

const quickActions = [
  { label: "Add Pet", icon: <Plus size={16} />, color: "#7C4F2F", bg: "#F7EDE0", href: "/register-pet" },
  { label: "Search Pet", icon: <Search size={16} />, color: "#3B6FA0", bg: "#EBF3FA", href: "/pet-profile" },
  { label: "Report Lost", icon: <AlertTriangle size={16} />, color: "#C0601A", bg: "#FDF0E6", href: "/lost-found" },
  { label: "Generate QR", icon: <QrCode size={16} />, color: "#5C8A64", bg: "#EDF4EE", href: "/dashboard/qr-generator" },
];

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; color: string }> = {
    Active: { bg: "#EDF4EE", color: "#3D6B45" },
    Pending: { bg: "#FFF7E6", color: "#A0680E" },
    Lost: { bg: "#FFF0EE", color: "#C03A1A" },
  };
  const c = config[status] || { bg: "#F0F0F0", color: "#666" };
  return (
    <span
      style={{
        backgroundColor: c.bg,
        color: c.color,
        padding: "0.2rem 0.65rem",
        borderRadius: "999px",
        fontSize: "0.75rem",
        fontWeight: 700,
      }}
    >
      {status}
    </span>
  );
}

export function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const activeSection = dashboardSections[location.pathname];
  const isActiveRoute = (href: string) => location.pathname === href;

  const Sidebar = () => (
    <aside className="dashboard-sidebar">
      {/* Logo */}
      <div>
        <Link to="/" className="dashboard-brand">
          <span className="dashboard-brand__mark">
            <PawPrint size={17} />
          </span>
          <div>
            <p className="dashboard-brand__name">
              PawPatrol <span>ID</span>
            </p>
            <p className="dashboard-brand__descriptor">Barangay Pet Registry</p>
          </div>
        </Link>
      </div>

      {/* Barangay Info */}
      <div className="dashboard-org-card">
        <p style={{ fontSize: "0.7rem", color: "#8C7B6B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Logged in as
        </p>
        <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#2E2A27", marginTop: "0.1rem" }}>
          Brgy. San Isidro
        </p>
        <p style={{ fontSize: "0.75rem", color: "#8C7B6B" }}>Quezon City, Metro Manila</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "#8C7B6B", textTransform: "uppercase", letterSpacing: "0.06em", padding: "0.5rem 0.5rem 0.25rem" }}>
          Main Menu
        </p>
        {sidebarItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`dashboard-nav-link ${isActiveRoute(item.href) ? "dashboard-nav-link--active" : ""}`}
            style={{
              color: isActiveRoute(item.href) ? "#7C4F2F" : "#5C4E45",
            }}
            onClick={() => setSidebarOpen(false)}
          >
            <span style={{ color: isActiveRoute(item.href) ? "#7C4F2F" : "#8C7B6B" }}>{item.icon}</span>
            {item.label}
            {item.label === "Pending Registrations" && (
              <span
                className="ml-auto px-1.5 py-0.5 rounded-full"
                style={{ backgroundColor: "#7C4F2F", color: "#FFFCF7", fontSize: "0.65rem", fontWeight: 700 }}
              >
                34
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-3 space-y-1" style={{ borderTop: "1.5px solid #E8DDD0" }}>
        <Link
          to="/dashboard/settings"
          className={`dashboard-nav-link ${isActiveRoute("/dashboard/settings") ? "dashboard-nav-link--active" : ""}`}
          style={{
            color: isActiveRoute("/dashboard/settings") ? "#7C4F2F" : "#5C4E45",
            fontWeight: isActiveRoute("/dashboard/settings") ? 700 : 500,
            width: "100%",
          }}
          onClick={() => setSidebarOpen(false)}
        >
          <Settings size={18} color={isActiveRoute("/dashboard/settings") ? "#7C4F2F" : "#8C7B6B"} />
          Settings
        </Link>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            padding: "0.6rem 0.75rem",
            borderRadius: "0.625rem",
            color: "#C0601A",
            fontSize: "0.875rem",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          <LogOut size={18} color="#C0601A" />
          Logout
        </Link>
      </div>
    </aside>
  );

  return (
    <div className="dashboard-shell flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="flex">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black bg-opacity-30"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="dashboard-topbar flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-6 py-5 flex-shrink-0">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              className="lg:hidden p-2 rounded-lg"
              style={{ color: "#7C4F2F" }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="dashboard-page-title">
                Barangay Dashboard
              </h1>
              <p className="dashboard-page-copy">
                Monitor registered pets, QR IDs, owner accountability, and lost-and-found activity across the barangay.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              className="relative p-2 rounded-xl"
              style={{ backgroundColor: "#F7EDE0", color: "#7C4F2F" }}
            >
              <Bell size={18} />
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: "#C0601A" }}
              />
            </button>
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer"
              style={{ backgroundColor: "#F7F2EA", border: "1.5px solid #E8DDD0" }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#7C4F2F" }}
              >
                <span style={{ color: "#FFFCF7", fontWeight: 700, fontSize: "0.7rem" }}>KA</span>
              </div>
              <span style={{ fontWeight: 600, color: "#2E2A27", fontSize: "0.82rem" }}>Kgd. Abad</span>
              <ChevronDown size={14} color="#8C7B6B" />
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeSection ? (
            <section className="space-y-5">
              <div className="dashboard-panel p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <span className="dashboard-badge dashboard-badge--planned">Coming in MVP phase</span>
                    <h2 className="dashboard-page-title mt-3">{activeSection.title}</h2>
                    <p className="dashboard-page-copy mt-2">{activeSection.description}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    className="dashboard-button"
                    style={{ backgroundColor: "#F7EDE0", color: "#7C4F2F", borderColor: "#E8D3BA" }}
                  >
                    <LayoutDashboard size={15} />
                    Back to Overview
                  </Link>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {activeSection.cards.map((card) => (
                  <div key={card.label} className="dashboard-placeholder-card">
                    <div className="flex items-center justify-between gap-3">
                      <span className="dashboard-placeholder-card__label">{card.label}</span>
                      <span
                        className="dashboard-icon-box"
                        style={{ backgroundColor: card.bg, color: card.color, height: "2.25rem", width: "2.25rem" }}
                      >
                        {card.icon}
                      </span>
                    </div>
                    <p className="dashboard-placeholder-card__value">{card.value}</p>
                    <p className="dashboard-placeholder-card__copy">{card.copy}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <>
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.href}
                className="dashboard-action"
                style={{
                  backgroundColor: action.bg,
                  color: action.color,
                }}
              >
                {action.icon}
                {action.label}
              </Link>
            ))}
            <button
              className="dashboard-button"
              style={{
                backgroundColor: "#FFFCF7",
                cursor: "pointer",
              }}
            >
              <Download size={16} />
              Export Data
            </button>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="dashboard-stat-card"
              >
                <div className="dashboard-stat-card__top">
                  <div
                    className="dashboard-icon-box"
                    style={{ backgroundColor: card.bg, color: card.color }}
                  >
                    {card.icon}
                  </div>
                  <TrendingUp size={14} color="#C4956A" />
                </div>
                <p className="dashboard-stat-card__value">{card.value}</p>
                <p className="dashboard-stat-card__label">{card.label}</p>
                <p className="dashboard-stat-card__description">{card.description}</p>
                <p className="dashboard-stat-card__change" style={{ color: card.color }}>
                  {card.change}
                </p>
              </div>
            ))}
              </div>

              {/* Recent Registrations Table */}
              <div
                className="dashboard-panel"
            style={{
              overflow: "hidden",
            }}
          >
            {/* Table header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1.5px solid #E8DDD0" }}
            >
              <div>
                <h3 style={{ fontWeight: 700, color: "#2E2A27", fontSize: "0.95rem" }}>
                  Recent Registrations
                </h3>
                <p style={{ color: "#8C7B6B", fontSize: "0.78rem", marginTop: "0.1rem" }}>
                  Showing 5 most recent entries
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.45rem 0.875rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "#F7F2EA",
                    color: "#5C4E45",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    border: "1.5px solid #E8DDD0",
                    cursor: "pointer",
                  }}
                >
                  <Filter size={13} />
                  Filter
                </button>
                <Link
                  to="/register-pet"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.45rem 0.875rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "#7C4F2F",
                    color: "#FFFCF7",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    textDecoration: "none",
                  }}
                >
                  <Plus size={13} />
                  Add New
                </Link>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="dashboard-table w-full">
                <thead>
                  <tr style={{ backgroundColor: "#F7F2EA" }}>
                    {["Pet", "QR ID", "Type / Breed", "Owner", "Date", "Vaccinated", "Status", ""].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: "#8C7B6B",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentRegistrations.map((reg, i) => (
                    <tr
                      key={reg.id}
                      style={{ borderTop: "1px solid #F0EAE0" }}
                    >
                      <td>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0"
                            style={{ border: "2px solid #E8DDD0" }}
                          >
                            <img src={reg.img} alt={reg.pet} className="w-full h-full object-cover" />
                          </div>
                          <span style={{ fontWeight: 700, color: "#2E2A27", fontSize: "0.875rem" }}>{reg.pet}</span>
                        </div>
                      </td>
                      <td>
                        <span style={{ color: "#7C4F2F", fontWeight: 600, fontSize: "0.78rem", fontFamily: "monospace" }}>
                          {reg.id}
                        </span>
                      </td>
                      <td>
                        <span style={{ color: "#5C4E45", fontSize: "0.82rem" }}>
                          {reg.type} · {reg.breed}
                        </span>
                      </td>
                      <td>
                        <span style={{ color: "#5C4E45", fontSize: "0.82rem" }}>{reg.owner}</span>
                      </td>
                      <td>
                        <span style={{ color: "#8C7B6B", fontSize: "0.78rem" }}>{reg.date}</span>
                      </td>
                      <td>
                        {reg.vaccinated ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 size={14} color="#3D6B45" />
                            <span style={{ fontSize: "0.78rem", color: "#3D6B45", fontWeight: 600 }}>Yes</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <X size={14} color="#C0601A" />
                            <span style={{ fontSize: "0.78rem", color: "#C0601A", fontWeight: 600 }}>No</span>
                          </div>
                        )}
                      </td>
                      <td>
                        <StatusBadge status={reg.status} />
                      </td>
                      <td>
                        <Link
                          to="/pet-profile"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            color: "#7C4F2F",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            textDecoration: "none",
                          }}
                        >
                          View <ChevronRight size={13} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-between px-6 py-3"
              style={{ borderTop: "1.5px solid #E8DDD0", backgroundColor: "#FDFAF6" }}
            >
              <p style={{ color: "#8C7B6B", fontSize: "0.78rem" }}>
                Showing 5 of 842 registrations
              </p>
              <Link
                to="/dashboard/all-pets"
                style={{
                  color: "#7C4F2F",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                View All Records <ChevronRight size={13} />
              </Link>
            </div>
              </div>

              {/* Bottom Grid */}
              <div className="grid lg:grid-cols-2 gap-4">
            {/* Vaccination Compliance */}
            <div
              style={{
                backgroundColor: "#FFFCF7",
                border: "1.5px solid #E8DDD0",
                borderRadius: "1.25rem",
                padding: "1.5rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <h3 style={{ fontWeight: 700, color: "#2E2A27", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
                Vaccination Compliance
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Rabies Vaccinated", pct: 74, color: "#5C8A64", bg: "#EDF4EE" },
                  { label: "Distemper Vaccinated", pct: 61, color: "#3B6FA0", bg: "#EBF3FA" },
                  { label: "Bordetella Vaccinated", pct: 48, color: "#C4956A", bg: "#F7EDE0" },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between mb-1">
                      <span style={{ fontSize: "0.8rem", color: "#5C4E45", fontWeight: 500 }}>{bar.label}</span>
                      <span style={{ fontSize: "0.8rem", color: bar.color, fontWeight: 700 }}>{bar.pct}%</span>
                    </div>
                    <div
                      style={{
                        backgroundColor: bar.bg,
                        borderRadius: "999px",
                        height: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${bar.pct}%`,
                          height: "100%",
                          backgroundColor: bar.color,
                          borderRadius: "999px",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lost & Found Summary */}
            <div
              style={{
                backgroundColor: "#FFFCF7",
                border: "1.5px solid #E8DDD0",
                borderRadius: "1.25rem",
                padding: "1.5rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontWeight: 700, color: "#2E2A27", fontSize: "0.95rem" }}>
                  Lost & Found Summary
                </h3>
                <Link
                  to="/lost-found"
                  style={{
                    color: "#7C4F2F",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  View All <ChevronRight size={13} />
                </Link>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Active Lost Reports", count: 5, color: "#C0601A", bg: "#FDF0E6" },
                  { label: "Found, Pending Reunion", count: 2, color: "#3B6FA0", bg: "#EBF3FA" },
                  { label: "Successfully Reunited", count: 7, color: "#5C8A64", bg: "#EDF4EE" },
                  { label: "Transferred to Shelter", count: 1, color: "#7B5EA7", bg: "#F3EFF8" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ backgroundColor: item.bg }}
                  >
                    <span style={{ fontSize: "0.82rem", color: "#3D3530", fontWeight: 500 }}>{item.label}</span>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: "0.95rem",
                        color: item.color,
                      }}
                    >
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
