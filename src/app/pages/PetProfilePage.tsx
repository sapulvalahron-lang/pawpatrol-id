import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  PawPrint,
  Phone,
  MapPin,
  Syringe,
  QrCode,
  Share2,
  Flag,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Download,
  Mail,
  Shield,
  Calendar,
  Hash,
  Heart,
  ChevronRight,
  X,
} from "lucide-react";
import { mockPets, mockPetsBySlug } from "../data/mockPets";

function QRMock({ id, size = 100 }: { id: string; size?: number }) {
  const cells: boolean[][] = [];
  const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  for (let r = 0; r < 9; r++) {
    cells.push([]);
    for (let c = 0; c < 9; c++) {
      const corner =
        (r < 3 && c < 3) ||
        (r < 3 && c > 5) ||
        (r > 5 && c < 3);
      cells[r].push(corner || ((seed * (r + 1) * (c + 1)) % 3 === 0));
    }
  }
  const cellSize = Math.floor(size / 9) - 1;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(9, ${cellSize}px)`,
        gap: "1.5px",
        padding: "10px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        width: `${size + 20}px`,
        height: `${size + 20}px`,
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
      }}
    >
      {cells.flat().map((filled, i) => (
        <div
          key={i}
          style={{
            backgroundColor: filled ? "#2E2A27" : "#fff",
            borderRadius: "1.5px",
            width: `${cellSize}px`,
            height: `${cellSize}px`,
          }}
        />
      ))}
    </div>
  );
}

export function PetProfilePage() {
  const { petSlug } = useParams();
  const petData = petSlug ? mockPetsBySlug[petSlug] : undefined;
  const [lostStatus, setLostStatus] = useState(petData?.status === "Lost");
  const [showContactModal, setShowContactModal] = useState(false);
  const [profileNotice, setProfileNotice] = useState("");

  useEffect(() => {
    setLostStatus(petData?.status === "Lost");
    setShowContactModal(false);
    setProfileNotice("");
  }, [petData?.slug, petData?.status]);

  if (!petSlug) {
    return (
      <div
        className="min-h-screen py-8 px-4"
        style={{ backgroundColor: "#F7F2EA", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <div className="max-w-5xl mx-auto">
          <Link
            to="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              color: "#7C4F2F",
              fontWeight: 700,
              fontSize: "0.85rem",
              textDecoration: "none",
              marginBottom: "1.5rem",
            }}
          >
            <ArrowLeft size={15} /> Back to Dashboard
          </Link>

          <div
            className="rounded-3xl p-6 mb-5"
            style={{ backgroundColor: "#FFFCF7", border: "1.5px solid #E8DDD0", boxShadow: "0 8px 24px rgba(124,79,47,0.08)" }}
          >
            <span
              style={{
                backgroundColor: "#F7EDE0",
                color: "#7C4F2F",
                borderRadius: "999px",
                padding: "0.3rem 0.75rem",
                fontSize: "0.72rem",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              Switch Pet Profile
            </span>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2rem",
                color: "#2E2A27",
                fontWeight: 800,
                marginTop: "0.85rem",
              }}
            >
              Sample Barangay Pet Records
            </h1>
            <p style={{ color: "#5C4E45", fontSize: "0.92rem", lineHeight: 1.7, maxWidth: "44rem" }}>
              Select a sample record below to preview how official pet identity, QR details, and owner accountability are displayed.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPets.map((pet) => (
              <Link
                key={pet.slug}
                to={`/pet-profile/${pet.slug}`}
                className="dashboard-placeholder-card"
                style={{ textDecoration: "none" }}
              >
                <div className="flex gap-3">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    style={{ border: "2px solid #E8DDD0" }}
                  />
                  <div>
                    <p style={{ color: "#2E2A27", fontWeight: 800 }}>{pet.name}</p>
                    <p style={{ color: "#8C7B6B", fontSize: "0.78rem" }}>{pet.species} - {pet.breed}</p>
                    <p style={{ color: "#7C4F2F", fontFamily: "monospace", fontSize: "0.72rem", fontWeight: 800, marginTop: "0.25rem" }}>
                      {pet.qrId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span
                    style={{
                      color: pet.status === "Lost" ? "#C0601A" : pet.status === "Pending" ? "#A0680E" : "#3D6B45",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                    }}
                  >
                    {pet.status}
                  </span>
                  <span style={{ color: "#7C4F2F", fontSize: "0.8rem", fontWeight: 800 }}>View Profile</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!petData) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: "#F7F2EA", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <div
          className="max-w-md w-full rounded-3xl p-7 text-center"
          style={{ backgroundColor: "#FFFCF7", border: "1.5px solid #E8DDD0", boxShadow: "0 12px 32px rgba(124,79,47,0.1)" }}
        >
          <PawPrint size={34} color="#C4956A" style={{ margin: "0 auto 1rem" }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#2E2A27", fontSize: "1.6rem", fontWeight: 800 }}>
            Pet profile not found
          </h1>
          <p style={{ color: "#5C4E45", fontSize: "0.9rem", lineHeight: 1.7, marginTop: "0.5rem" }}>
            This sample record does not exist in the registry preview.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5">
            <Link to="/pet-profile" style={{ color: "#7C4F2F", fontWeight: 800, textDecoration: "none" }}>
              Select a pet
            </Link>
            <Link to="/dashboard/all-pets" style={{ color: "#5C4E45", fontWeight: 800, textDecoration: "none" }}>
              Back to All Pets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const ownerInitials = petData.owner.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  const showProfileNotice = (message: string) => {
    setProfileNotice(message);
    window.setTimeout(() => setProfileNotice(""), 4500);
  };

  const handleShareProfile = async () => {
    const profileUrl = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${petData.name} - PawPatrol ID`, url: profileUrl });
        return;
      }
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(profileUrl);
        showProfileNotice("Profile link copied.");
        return;
      }
    } catch {
      showProfileNotice("Sharing was canceled.");
      return;
    }
    showProfileNotice("Copy this page URL to share the profile.");
  };

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ backgroundColor: "#F7F2EA", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          to="/dashboard"
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
          <ArrowLeft size={15} /> Back to Dashboard
        </Link>

        <div className="flex flex-wrap gap-2 mb-5">
          {mockPets.map((pet) => (
            <Link
              key={pet.slug}
              to={`/pet-profile/${pet.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 0.85rem",
                borderRadius: "999px",
                backgroundColor: pet.slug === petData.slug ? "#7C4F2F" : "#FFFCF7",
                color: pet.slug === petData.slug ? "#FFFCF7" : "#5C4E45",
                border: "1.5px solid #E8DDD0",
                fontSize: "0.8rem",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <PawPrint size={13} />
              {pet.name}
            </Link>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-4">
            {/* Pet Photo & Identity */}
            <div
              style={{
                backgroundColor: "#FFFCF7",
                border: "1.5px solid #E8DDD0",
                borderRadius: "1.5rem",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(124,79,47,0.08)",
              }}
            >
              {/* Photo */}
              <div className="relative">
                <img
                  src={petData.image}
                  alt={petData.name}
                  style={{ width: "100%", height: "220px", objectFit: "cover" }}
                />
                {/* Status overlay */}
                <div className="absolute top-3 right-3">
                  <span
                    style={{
                      backgroundColor:
                        lostStatus
                          ? "rgba(192,96,26,0.92)"
                          : petData.status === "Pending"
                          ? "rgba(59,111,160,0.92)"
                          : "rgba(61,107,69,0.92)",
                      color: "#fff",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {lostStatus ? "LOST" : petData.status}
                  </span>
                </div>
              </div>

              {/* Identity */}
              <div className="p-5 text-center">
                <div style={{ color: "#3D6B45", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                  Official Barangay Pet Record
                </div>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "#2E2A27",
                    marginBottom: "0.25rem",
                  }}
                >
                  {petData.name}
                </h1>
                <p style={{ color: "#8C7B6B", fontSize: "0.82rem", marginBottom: "0.75rem" }}>
                  {petData.breed} - {petData.sex} - {petData.age}
                </p>
                <p style={{ color: "#5C4E45", fontSize: "0.8rem", lineHeight: 1.5, marginBottom: "1rem", backgroundColor: "#F7F2EA", padding: "0.5rem", borderRadius: "0.5rem" }}>
                  This profile helps identify a registered pet and support owner contact or barangay follow-up.
                </p>

                {/* QR Badge */}
                <div
                  className="flex items-center justify-center gap-2 p-2 rounded-xl mb-4 mx-auto"
                  style={{
                    backgroundColor: "#F7EDE0",
                    border: "1.5px solid #C4956A",
                    maxWidth: "220px",
                  }}
                >
                  <QrCode size={16} color="#7C4F2F" />
                  <span style={{ fontFamily: "monospace", fontWeight: 800, color: "#7C4F2F", fontSize: "0.85rem" }}>
                    {petData.qrId}
                  </span>
                </div>

                <p style={{ color: "#8C7B6B", fontSize: "0.78rem" }}>
                  <MapPin size={12} style={{ display: "inline", marginRight: "0.25rem" }} />
                  {petData.barangay}
                </p>
              </div>

              {/* Actions */}
              {profileNotice && (
                <div
                  className="mx-4 mt-4 rounded-xl px-3 py-2"
                  style={{ backgroundColor: "#EDF4EE", color: "#3D6B45", fontSize: "0.78rem", fontWeight: 700 }}
                >
                  {profileNotice}
                </div>
              )}
              <div
                className="grid grid-cols-2 gap-2 p-4"
                style={{ borderTop: "1.5px solid #E8DDD0" }}
              >
                <button
                  onClick={() => setShowContactModal(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    padding: "0.6rem",
                    borderRadius: "0.625rem",
                    backgroundColor: "#7C4F2F",
                    color: "#FFFCF7",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  <Phone size={14} /> Contact Owner
                </button>
                <button
                  onClick={() => setLostStatus(!lostStatus)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    padding: "0.6rem",
                    borderRadius: "0.625rem",
                    backgroundColor: lostStatus ? "#EDF4EE" : "#FDF0E6",
                    color: lostStatus ? "#3D6B45" : "#C0601A",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    border: `1.5px solid ${lostStatus ? "#A8C9AE" : "#E8B88A"}`,
                  }}
                >
                  {lostStatus ? <><CheckCircle2 size={14} /> Found!</> : <><AlertTriangle size={14} /> Report Lost</>}
                </button>
              </div>
              <div
                className="grid grid-cols-2 gap-2 px-4 pb-4"
              >
                <button
                  type="button"
                  onClick={handleShareProfile}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    padding: "0.55rem",
                    borderRadius: "0.625rem",
                    backgroundColor: "#F7F2EA",
                    color: "#5C4E45",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    border: "1.5px solid #E8DDD0",
                  }}
                >
                  <Share2 size={13} /> Share Profile
                </button>
                <button
                  type="button"
                  onClick={() => showProfileNotice("QR download is not connected in this preview.")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    padding: "0.55rem",
                    borderRadius: "0.625rem",
                    backgroundColor: "#F7F2EA",
                    color: "#5C4E45",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    border: "1.5px solid #E8DDD0",
                  }}
                >
                  <Download size={13} /> Download QR
                </button>
              </div>
            </div>

            {/* QR Code Card */}
            <div
              style={{
                backgroundColor: "#FFFCF7",
                border: "1.5px solid #E8DDD0",
                borderRadius: "1.25rem",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
                boxShadow: "0 4px 20px rgba(124,79,47,0.06)",
              }}
            >
              <p style={{ fontWeight: 700, color: "#2E2A27", fontSize: "0.875rem" }}>QR Identification Tag</p>
              <QRMock id={petData.qrId} size={100} />
              <p style={{ color: "#8C7B6B", fontSize: "0.72rem", textAlign: "center", maxWidth: "180px" }}>
                Scan this QR to view {petData.name}'s full profile and contact the owner
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Lost Alert Banner */}
            {lostStatus && (
              <div
                className="p-4 rounded-2xl flex items-start gap-3"
                style={{
                  backgroundColor: "#FDF0E6",
                  border: "2px solid #E8B88A",
                }}
              >
                <AlertTriangle size={20} color="#C0601A" style={{ flexShrink: 0, marginTop: "0.1rem" }} />
                <div>
                  <p style={{ fontWeight: 700, color: "#7A3A12", fontSize: "0.9rem", marginBottom: "0.2rem" }}>
                    {petData.name} is Reported Lost
                  </p>
                  <p style={{ color: "#7A3A12", fontSize: "0.82rem", lineHeight: 1.6 }}>
                    Last seen in {petData.barangay}. If you've found this pet, please contact the owner immediately using the button below, or report to the nearest barangay office.
                  </p>
                </div>
              </div>
            )}

            {/* Pet Details */}
            <div
              style={{
                backgroundColor: "#FFFCF7",
                border: "1.5px solid #E8DDD0",
                borderRadius: "1.25rem",
                padding: "1.5rem",
                boxShadow: "0 4px 20px rgba(124,79,47,0.06)",
              }}
            >
              <h2 style={{ fontWeight: 700, color: "#2E2A27", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
                Pet Details
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Species", value: petData.species, icon: <PawPrint size={14} /> },
                  { label: "Breed", value: petData.breed, icon: <Hash size={14} /> },
                  { label: "Sex", value: petData.sex, icon: <Heart size={14} /> },
                  { label: "Age", value: petData.age, icon: <Calendar size={14} /> },
                  { label: "Color", value: petData.color, icon: <PawPrint size={14} /> },
                  { label: "Weight", value: petData.weight, icon: <Shield size={14} /> },
                ].map((detail) => (
                  <div
                    key={detail.label}
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: "#F7F2EA" }}
                  >
                    <div className="flex items-center gap-1.5 mb-1" style={{ color: "#8C7B6B" }}>
                      {detail.icon}
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        {detail.label}
                      </span>
                    </div>
                    <p style={{ fontWeight: 700, color: "#2E2A27", fontSize: "0.875rem" }}>{detail.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-4 flex-wrap">
                {petData.isNeutered && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      backgroundColor: "#EDF4EE",
                      color: "#3D6B45",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    <CheckCircle2 size={13} /> Neutered/Spayed
                  </span>
                )}
                {!petData.hasMicrochip && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      backgroundColor: "#F7F2EA",
                      color: "#8C7B6B",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "999px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      border: "1px solid #E8DDD0",
                    }}
                  >
                    No Microchip
                  </span>
                )}
              </div>
            </div>

            {/* Vaccination Status */}
            <div
              style={{
                backgroundColor: "#FFFCF7",
                border: "1.5px solid #E8DDD0",
                borderRadius: "1.25rem",
                padding: "1.5rem",
                boxShadow: "0 4px 20px rgba(124,79,47,0.06)",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Syringe size={18} color="#7C4F2F" />
                <h2 style={{ fontWeight: 700, color: "#2E2A27", fontSize: "0.95rem" }}>
                  Vaccination Status
                </h2>
              </div>
              <p style={{ color: "#8C7B6B", fontSize: "0.78rem", marginBottom: "1.25rem" }}>
                All vaccinations on record
              </p>
              <div className="space-y-3">
                {petData.vaccinations.map((vax) => (
                  <div
                    key={vax.name}
                    className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ backgroundColor: "#EDF4EE", border: "1px solid #B8D8BC" }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#5C8A64" }}
                    >
                      <CheckCircle2 size={16} color="#fff" />
                    </div>
                    <div className="flex-1">
                      <p style={{ fontWeight: 700, color: "#2E2A27", fontSize: "0.875rem" }}>{vax.name}</p>
                      <p style={{ color: "#5C4E45", fontSize: "0.78rem", marginTop: "0.1rem" }}>
                        Given: {vax.date}
                      </p>
                      <p style={{ color: "#3D6B45", fontSize: "0.75rem", fontWeight: 600, marginTop: "0.1rem" }}>
                        Next due: {vax.nextDue}
                      </p>
                    </div>
                    <span
                      style={{
                        backgroundColor: "#3D6B45",
                        color: "#fff",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {vax.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner Info */}
            <div
              style={{
                backgroundColor: "#FFFCF7",
                border: "1.5px solid #E8DDD0",
                borderRadius: "1.25rem",
                padding: "1.5rem",
                boxShadow: "0 4px 20px rgba(124,79,47,0.06)",
              }}
            >
              <h2 style={{ fontWeight: 700, color: "#2E2A27", fontSize: "0.95rem", marginBottom: "1.25rem" }}>
                Owner Information
              </h2>
              <div className="space-y-3">
                {[
                  { icon: <Shield size={16} />, label: "Registered Owner", value: petData.owner.name },
                  { icon: <Phone size={16} />, label: "Mobile Number", value: petData.owner.phone },
                  { icon: <Mail size={16} />, label: "Email Address", value: petData.owner.email },
                  { icon: <MapPin size={16} />, label: "Home Address", value: petData.owner.address },
                ].map((info) => (
                  <div key={info.label} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#F7EDE0", color: "#7C4F2F" }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: "0.72rem", color: "#8C7B6B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        {info.label}
                      </p>
                      <p style={{ fontWeight: 600, color: "#2E2A27", fontSize: "0.875rem", marginTop: "0.1rem" }}>
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-5 flex-wrap">
                <button
                  onClick={() => setShowContactModal(true)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.6rem 1.25rem",
                    borderRadius: "0.625rem",
                    backgroundColor: "#7C4F2F",
                    color: "#FFFCF7",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Phone size={14} /> Call Owner
                </button>
                <Link
                  to="/lost-found"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.6rem 1.25rem",
                    borderRadius: "0.625rem",
                    backgroundColor: "#FDF0E6",
                    color: "#C0601A",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    textDecoration: "none",
                    border: "1.5px solid #E8B88A",
                  }}
                >
                  <Flag size={14} /> Report Found
                </Link>
              </div>
            </div>

            {/* Registration Info */}
            <div
              className="p-4 rounded-2xl flex items-center gap-3"
              style={{ backgroundColor: "#F7F2EA", border: "1.5px solid #E8DDD0" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#F0E4D4" }}
              >
                <Calendar size={18} color="#7C4F2F" />
              </div>
              <div>
                <p style={{ fontWeight: 600, color: "#2E2A27", fontSize: "0.82rem" }}>
                  Registered on {petData.registeredDate}
                </p>
                <p style={{ color: "#8C7B6B", fontSize: "0.76rem" }}>
                  Official Barangay Pet Record - {petData.barangay}
                </p>
              </div>
              <Link
                to="/dashboard"
                style={{
                  marginLeft: "auto",
                  color: "#7C4F2F",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.2rem",
                  flexShrink: 0,
                }}
              >
                View in Registry <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(46,42,39,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowContactModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl p-6"
            style={{ backgroundColor: "#FFFCF7", boxShadow: "0 24px 60px rgba(0,0,0,0.25)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ fontWeight: 700, color: "#2E2A27", fontSize: "1.05rem" }}>
                Contact Pet Owner
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#8C7B6B" }}
              >
                <X size={20} />
              </button>
            </div>
            <div
              className="flex items-center gap-3 p-4 rounded-2xl mb-4"
              style={{ backgroundColor: "#F7EDE0" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#7C4F2F" }}
              >
                <span style={{ color: "#FFFCF7", fontWeight: 700, fontSize: "1rem" }}>{ownerInitials}</span>
              </div>
              <div>
                <p style={{ fontWeight: 700, color: "#2E2A27", fontSize: "0.95rem" }}>{petData.owner.name}</p>
                <p style={{ color: "#8C7B6B", fontSize: "0.78rem" }}>Owner of {petData.name}</p>
              </div>
            </div>
            <div className="space-y-3">
              <a
                href={`tel:${petData.owner.phone}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.875rem 1rem",
                  borderRadius: "0.875rem",
                  backgroundColor: "#7C4F2F",
                  color: "#FFFCF7",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                }}
              >
                <Phone size={18} />
                {petData.owner.phone}
              </a>
              <a
                href={`mailto:${petData.owner.email}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.875rem 1rem",
                  borderRadius: "0.875rem",
                  backgroundColor: "#F7F2EA",
                  color: "#5C4E45",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  border: "1.5px solid #E8DDD0",
                }}
              >
                <Mail size={18} />
                {petData.owner.email}
              </a>
            </div>
            <p style={{ color: "#8C7B6B", fontSize: "0.75rem", textAlign: "center", marginTop: "1rem" }}>
              If you found this pet, please identify yourself and your location when calling.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
