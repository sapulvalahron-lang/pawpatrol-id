import { useEffect, useRef, useState } from "react";
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
import { mockPets } from "../data/mockPets";

const statCards = [
  {
    label: "Registered Pets",
    value: "842",
    change: "+28 this month",
    description: "Pet profiles prepared for official barangay recordkeeping and lookup.",
    icon: <PawPrint size={20} />,
    color: "#7C4F2F",
    bg: "#F7EDE0",
    trend: "+",
  },
  {
    label: "Lost Reports",
    value: "12",
    change: "3 pending review",
    description: "Reports that need barangay review, owner contact, or field coordination.",
    icon: <AlertTriangle size={20} />,
    color: "#C0601A",
    bg: "#FDF0E6",
    trend: "-",
  },
  {
    label: "Found Reports",
    value: "9",
    change: "7 reunited",
    description: "Found reports prepared for owner matching and recovery coordination.",
    icon: <Heart size={20} />,
    color: "#5C8A64",
    bg: "#EDF4EE",
    trend: "+",
  },
  {
    label: "Pending Registrations",
    value: "34",
    change: "Needs approval",
    description: "Resident submissions pending staff review before QR identity release.",
    icon: <Clock size={20} />,
    color: "#3B6FA0",
    bg: "#EBF3FA",
    trend: "~",
  },
];

const recentRegistrations = mockPets.slice(0, 4).map((pet) => ({
  id: pet.qrId,
  pet: pet.name,
  slug: pet.slug,
  type: pet.species,
  breed: pet.breed,
  owner: pet.owner.name,
  date: pet.registeredDate,
  status: pet.status,
  vaccinated: pet.vaccinations.some((vax) => vax.status === "Completed"),
  img: pet.image,
}));

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
    description: "Review registered pets, owner details, and record status in one barangay registry.",
    cards: [
      { label: "Active Records", value: "842", copy: "Pet records ready for barangay lookup and monitoring.", color: "#7C4F2F", bg: "#F7EDE0", icon: <PawPrint size={18} /> },
      { label: "Pending Review", value: "34", copy: "Submissions waiting for staff validation before QR identity release.", color: "#3B6FA0", bg: "#EBF3FA", icon: <Clock size={18} /> },
      { label: "Needs Follow-up", value: "12", copy: "Records with lost status, missing details, or barangay action needed.", color: "#C0601A", bg: "#FDF0E6", icon: <AlertTriangle size={18} /> },
    ],
  },
  "/dashboard/vaccinations": {
    title: "Vaccinations",
    description: "Planned module for monitoring vaccination records and preparing barangay health program reports.",
    cards: [
      { label: "Due This Month", value: "68", copy: "Estimated count for pets needing vaccination follow-up.", color: "#C0601A", bg: "#FDF0E6", icon: <Clock size={18} /> },
      { label: "Recorded Vaccinations", value: "74%", copy: "Sample registry coverage for anti-rabies documentation.", color: "#5C8A64", bg: "#EDF4EE", icon: <CheckCircle2 size={18} /> },
      { label: "Pending Verification", value: "41", copy: "Records that would need barangay staff confirmation.", color: "#3B6FA0", bg: "#EBF3FA", icon: <ClipboardList size={18} /> },
      { label: "Vet Partner Sync", value: "Planned", copy: "Coming in next phase for clinic and barangay coordination.", color: "#7C4F2F", bg: "#F7EDE0", icon: <Syringe size={18} /> },
    ],
  },
  "/dashboard/barangay-map": {
    title: "Barangay Map",
    description: "Planned module for visualizing coverage zones, report locations, and pet registration density.",
    cards: [
      { label: "Coverage Zones", value: "7", copy: "Sample zones for future barangay coverage mapping.", color: "#7C4F2F", bg: "#F7EDE0", icon: <Map size={18} /> },
      { label: "Report Areas", value: "14", copy: "Lost-and-found locations prepared for future clustering.", color: "#C0601A", bg: "#FDF0E6", icon: <AlertTriangle size={18} /> },
      { label: "Pet Density", value: "High", copy: "Household registration planning indicator.", color: "#5C8A64", bg: "#EDF4EE", icon: <PawPrint size={18} /> },
      { label: "Map Integration", value: "Planned", copy: "Coming in next phase through a map or GIS provider.", color: "#3B6FA0", bg: "#EBF3FA", icon: <Map size={18} /> },
    ],
  },
  "/dashboard/qr-generator": {
    title: "QR Generator",
    description: "Link pet records to QR profiles and prepare future tag printing workflows.",
    cards: [
      { label: "QR Profile Links", value: "Preview", copy: "Pet records demonstrate how public profile links can work.", color: "#5C8A64", bg: "#EDF4EE", icon: <QrCode size={18} /> },
      { label: "Tag Printing", value: "Planned", copy: "Coming in next phase for barangay-issued pet tags.", color: "#7C4F2F", bg: "#F7EDE0", icon: <Download size={18} /> },
      { label: "Scan-to-Owner", value: "Preview", copy: "Shows how finder-to-owner recovery can be supported.", color: "#3B6FA0", bg: "#EBF3FA", icon: <Users size={18} /> },
      { label: "QR Generation", value: "Planned", copy: "Real QR code generation is intentionally not enabled yet.", color: "#C0601A", bg: "#FDF0E6", icon: <QrCode size={18} /> },
    ],
  },
  "/dashboard/pet-owners": {
    title: "Pet Owners",
    description: "Organize owner records, contact readiness, and household registration coverage.",
    cards: [
      { label: "Registered Owners", value: "516", copy: "Sample owner records represented in the barangay registry.", color: "#7C4F2F", bg: "#F7EDE0", icon: <Users size={18} /> },
      { label: "Contact Readiness", value: "88%", copy: "Preview of records with usable phone and address details.", color: "#5C8A64", bg: "#EDF4EE", icon: <CheckCircle2 size={18} /> },
      { label: "Multiple Pets", value: "93", copy: "Households with more than one pet record in the registry.", color: "#3B6FA0", bg: "#EBF3FA", icon: <PawPrint size={18} /> },
    ],
  },
  "/dashboard/settings": {
    title: "Settings",
    description: "Planned module for barangay profile details, module controls, and reporting preferences.",
    cards: [
      { label: "Barangay Profile", value: "San Isidro", copy: "Preview profile for office identity and registry context.", color: "#7C4F2F", bg: "#F7EDE0", icon: <Settings size={18} /> },
      { label: "Modules", value: "6", copy: "Available modules for stakeholder review.", color: "#3B6FA0", bg: "#EBF3FA", icon: <LayoutDashboard size={18} /> },
      { label: "Reports", value: "Planned", copy: "Coming in next phase for exports and compliance summaries.", color: "#5C8A64", bg: "#EDF4EE", icon: <ClipboardList size={18} /> },
    ],
  },
};

const quickActions = [
  { label: "New Pet Record", icon: <Plus size={16} />, color: "#7C4F2F", bg: "#F7EDE0", href: "/register-pet" },
  { label: "View Pet Profiles", icon: <Search size={16} />, color: "#3B6FA0", bg: "#EBF3FA", href: "/pet-profile" },
  { label: "Open Recovery Board", icon: <AlertTriangle size={16} />, color: "#C0601A", bg: "#FDF0E6", href: "/lost-found" },
  { label: "QR Module Preview", icon: <QrCode size={16} />, color: "#5C8A64", bg: "#EDF4EE", href: "/dashboard/qr-generator" },
];

const notifications = [
  {
    title: "New pet registration pending review",
    detail: "Luna is waiting for barangay validation.",
    time: "5 min ago",
    unread: true,
  },
  {
    title: "Lost pet report submitted",
    detail: "Max was reported missing near Sampaguita St.",
    time: "18 min ago",
    unread: true,
  },
  {
    title: "QR profile verification needed",
    detail: "Brownie's owner contact details need review.",
    time: "Today",
    unread: true,
  },
  {
    title: "Vaccination record update planned",
    detail: "Vaccination tracking is queued for a future release.",
    time: "This week",
    unread: false,
  },
];

const settingsPreviewSections = [
  {
    title: "Barangay Profile",
    label: "Registry Preview",
    description: "Brgy. San Isidro, Quezon City. Official registry name, public contact line, and office location will be managed here.",
  },
  {
    title: "Registry Preferences",
    label: "Preview",
    description: "Set preferred record fields, review status labels, and staff validation steps for pet registrations.",
  },
  {
    title: "QR ID Display Settings",
    label: "Planned module",
    description: "Control what appears on public QR profiles, including owner contact visibility and barangay help text.",
  },
  {
    title: "Notification Preferences",
    label: "Registry Preview",
    description: "Choose which alerts matter most: pending registrations, lost-pet reports, QR profile reviews, and vaccination updates.",
  },
  {
    title: "Account Access",
    label: "Planned module",
    description: "Prepare staff roles for barangay administrators, encoders, and reviewers without enabling authentication yet.",
  },
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
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const activeSection = dashboardSections[location.pathname];
  const isActiveRoute = (href: string) => location.pathname === href;
  const unreadCount = notifications.filter((item) => item.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (notificationRef.current && !notificationRef.current.contains(target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showDashboardNotice = (message: string) => {
    setProfileMessage(message);
    window.setTimeout(() => setProfileMessage(""), 4500);
  };

  const handlePreviewLogout = () => {
    showDashboardNotice("Account sign-out is not connected in this preview.");
    setProfileOpen(false);
  };

  const handlePreviewAction = (message: string) => {
    showDashboardNotice(message);
    setNotificationsOpen(false);
    setProfileOpen(false);
  };

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
                Monitor pet records, QR identity previews, owner accountability, and lost-and-found activity across the barangay.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {profileMessage && (
              <span
                className="inline-flex px-3 py-2 rounded-xl"
                style={{ backgroundColor: "#EDF4EE", color: "#3D6B45", fontSize: "0.75rem", fontWeight: 700 }}
              >
                {profileMessage}
              </span>
            )}
            <div className="relative" ref={notificationRef}>
              <button
                type="button"
                className="relative p-2 rounded-xl"
                style={{ backgroundColor: "#F7EDE0", color: "#7C4F2F" }}
                aria-label="Open notifications"
                aria-expanded={notificationsOpen}
                onClick={() => {
                  setNotificationsOpen((open) => !open);
                  setProfileOpen(false);
                }}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#C0601A", color: "#fff", fontSize: "0.68rem", fontWeight: 800 }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="dashboard-dropdown dashboard-dropdown--right">
                  <div className="dashboard-dropdown__header">
                    <div>
                      <p className="dashboard-dropdown__title">Notifications</p>
                      <p className="dashboard-dropdown__subtitle">{unreadCount} items need review</p>
                    </div>
                    <span className="dashboard-badge dashboard-badge--planned">Preview</span>
                  </div>
                  <div className="dashboard-dropdown__list">
                    {notifications.map((item) => (
                      <button
                        key={item.title}
                        type="button"
                        className="dashboard-dropdown__item"
                        onClick={() => setNotificationsOpen(false)}
                      >
                        <span
                          className="dashboard-dropdown__dot"
                          style={{ backgroundColor: item.unread ? "#C0601A" : "#D8CABC" }}
                        />
                        <span>
                          <span className="dashboard-dropdown__item-title">{item.title}</span>
                          <span className="dashboard-dropdown__item-copy">{item.detail}</span>
                          <span className="dashboard-dropdown__time">{item.time}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer"
                style={{ backgroundColor: "#F7F2EA", border: "1.5px solid #E8DDD0" }}
                aria-label="Open user menu"
                aria-expanded={profileOpen}
                onClick={() => {
                  setProfileOpen((open) => !open);
                  setNotificationsOpen(false);
                  setProfileMessage("");
                }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#7C4F2F" }}
                >
                  <span style={{ color: "#FFFCF7", fontWeight: 700, fontSize: "0.7rem" }}>KA</span>
                </span>
                <span style={{ fontWeight: 600, color: "#2E2A27", fontSize: "0.82rem" }}>Kgd. Abad</span>
                <ChevronDown size={14} color="#8C7B6B" />
              </button>

              {profileOpen && (
                <div className="dashboard-dropdown dashboard-dropdown--right dashboard-dropdown--compact">
                  <div className="dashboard-dropdown__header">
                    <div>
                      <p className="dashboard-dropdown__title">Kgd. Abad</p>
                      <p className="dashboard-dropdown__subtitle">Barangay account preview</p>
                    </div>
                  </div>
                  <Link className="dashboard-menu-link" to="/dashboard" onClick={() => setProfileOpen(false)}>
                    View Profile
                  </Link>
                  <Link className="dashboard-menu-link" to="/dashboard/settings" onClick={() => setProfileOpen(false)}>
                    Barangay Account
                  </Link>
                  <Link className="dashboard-menu-link" to="/dashboard/settings" onClick={() => setProfileOpen(false)}>
                    Settings
                  </Link>
                  <button type="button" className="dashboard-menu-link dashboard-menu-link--danger" onClick={handlePreviewLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="dashboard-content flex-1 overflow-y-auto p-6 space-y-6">
          {activeSection ? (
            <section className="space-y-5">
              <div className="dashboard-panel p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <span className="dashboard-badge dashboard-badge--planned">Planned</span>
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

              {location.pathname === "/dashboard/all-pets" && (
                <div className="dashboard-panel p-5">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 style={{ color: "#2E2A27", fontSize: "1rem", fontWeight: 800 }}>Pet Registry Preview</h3>
                      <p style={{ color: "#8C7B6B", fontSize: "0.8rem" }}>
                        Registry preview list using shared pet records.
                      </p>
                    </div>
                    <span className="dashboard-badge dashboard-badge--planned">Preview</span>
                  </div>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {mockPets.map((pet) => (
                      <div key={pet.slug} className="dashboard-placeholder-card">
                        <div className="flex gap-3">
                          <img
                            src={pet.image}
                            alt={pet.name}
                            className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                            style={{ border: "2px solid #E8DDD0" }}
                          />
                          <div className="min-w-0">
                            <p style={{ color: "#2E2A27", fontWeight: 800, fontSize: "0.92rem" }}>{pet.name}</p>
                            <p style={{ color: "#8C7B6B", fontSize: "0.76rem" }}>
                              {pet.species} - {pet.breed}
                            </p>
                            <p style={{ color: "#7C4F2F", fontFamily: "monospace", fontSize: "0.72rem", fontWeight: 800, marginTop: "0.25rem" }}>
                              {pet.qrId}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-3 mt-4">
                          <span
                            className="dashboard-badge"
                            style={{
                              backgroundColor: pet.status === "Lost" ? "#FDF0E6" : pet.status === "Pending" ? "#FFF7E6" : "#EDF4EE",
                              color: pet.status === "Lost" ? "#C0601A" : pet.status === "Pending" ? "#A0680E" : "#3D6B45",
                            }}
                          >
                            {pet.status}
                          </span>
                          <Link
                            to={`/pet-profile/${pet.slug}`}
                            style={{ color: "#7C4F2F", fontSize: "0.8rem", fontWeight: 800, textDecoration: "none" }}
                          >
                            View Profile
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {location.pathname === "/dashboard/settings" && (
                <div className="grid lg:grid-cols-2 gap-4">
                  {settingsPreviewSections.map((section) => (
                    <div key={section.title} className="dashboard-placeholder-card">
                      <div className="flex items-start justify-between gap-3">
                        <h3 style={{ color: "#2E2A27", fontSize: "0.95rem", fontWeight: 800 }}>{section.title}</h3>
                        <span className="dashboard-badge dashboard-badge--planned">{section.label}</span>
                      </div>
                      <p className="dashboard-placeholder-card__copy">{section.description}</p>
                    </div>
                  ))}
                </div>
              )}
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
              type="button"
              className="dashboard-button"
              onClick={() => handlePreviewAction("Export downloads are not connected in this preview.")}
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
                  Recent Pet Records
                </h3>
                <p style={{ color: "#8C7B6B", fontSize: "0.78rem", marginTop: "0.1rem" }}>
                  Latest records prepared for barangay review
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePreviewAction("Table filtering is represented by the Lost & Found search tools in this preview.")}
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
                  Add Record
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
                          {reg.type} - {reg.breed}
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
                          to={`/pet-profile/${reg.slug}`}
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
                Showing 5 of 842 pet records
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
                View All Pet Records <ChevronRight size={13} />
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
                Vaccination Readiness
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
                Lost-and-Found Recovery
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
