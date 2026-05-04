import { useState } from "react";
import { Link } from "react-router";
import {
  PawPrint,
  Upload,
  QrCode,
  ChevronRight,
  CheckCircle2,
  User,
  Phone,
  MapPin,
  Mail,
  Camera,
  Syringe,
  Info,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

function QRMock({ id }: { id: string }) {
  const cells: boolean[][] = [];
  const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  for (let r = 0; r < 7; r++) {
    cells.push([]);
    for (let c = 0; c < 7; c++) {
      const corner =
        (r < 2 && c < 2) ||
        (r < 2 && c > 4) ||
        (r > 4 && c < 2);
      cells[r].push(corner || ((seed * (r + 1) * (c + 1)) % 3 === 0));
    }
  }
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "2px",
        padding: "10px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        width: "80px",
        height: "80px",
      }}
    >
      {cells.flat().map((filled, i) => (
        <div
          key={i}
          style={{
            backgroundColor: filled ? "#2E2A27" : "#fff",
            borderRadius: "1px",
          }}
        />
      ))}
    </div>
  );
}

const steps = [
  { id: 1, label: "Owner Info" },
  { id: 2, label: "Pet Details" },
  { id: 3, label: "Health Records" },
  { id: 4, label: "Generate QR" },
];

export function PetRegistrationPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    barangay: "San Isidro",
    petName: "",
    species: "Dog",
    breed: "",
    color: "",
    sex: "Male",
    age: "",
    weight: "",
    photo: null as File | null,
    photoPreview: "",
    rabiesDate: "",
    distemperDate: "",
    otherVax: "",
    isNeutered: false,
    hasMicrochip: false,
  });

  const qrId = "PPB-2026-00843";

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((f) => ({
        ...f,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      }));
    }
  };

  const update = (key: string, val: string | boolean) =>
    setForm((f) => ({ ...f, [key]: val }));

  const inputStyle = {
    width: "100%",
    padding: "0.625rem 0.875rem",
    borderRadius: "0.625rem",
    border: "1.5px solid #E0D4C4",
    backgroundColor: "#FFFCF7",
    color: "#2E2A27",
    fontSize: "0.875rem",
    outline: "none",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    transition: "border 0.15s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 700,
    color: "#5C4E45",
    marginBottom: "0.35rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.04em",
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: "#F7F2EA", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <div
          className="max-w-lg w-full text-center p-10 rounded-3xl"
          style={{
            backgroundColor: "#FFFCF7",
            border: "1.5px solid #E8DDD0",
            boxShadow: "0 20px 60px rgba(124,79,47,0.15)",
          }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "#EDF4EE" }}
          >
            <CheckCircle2 size={40} color="#3D6B45" />
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#2E2A27",
              marginBottom: "0.75rem",
            }}
          >
            Registration Successful!
          </h2>
          <p style={{ color: "#5C4E45", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <strong>{form.petName || "Your pet"}</strong> has been registered under Barangay San Isidro. Your QR ID has been generated.
          </p>
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl mx-auto"
            style={{ backgroundColor: "#F7EDE0", border: "1.5px solid #C4956A" }}
          >
            <QRMock id={qrId} />
            <div className="text-left">
              <p style={{ fontWeight: 800, color: "#7C4F2F", fontSize: "0.95rem" }}>{qrId}</p>
              <p style={{ color: "#8C7B6B", fontSize: "0.78rem" }}>QR Pet ID · Print & Attach to Collar</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
            <Link
              to="/pet-profile"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.7rem 1.25rem",
                borderRadius: "0.75rem",
                backgroundColor: "#7C4F2F",
                color: "#FFFCF7",
                fontWeight: 700,
                fontSize: "0.875rem",
                textDecoration: "none",
              }}
            >
              View Pet Profile <ChevronRight size={15} />
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setForm({
                  ownerName: "", email: "", phone: "", address: "", barangay: "San Isidro",
                  petName: "", species: "Dog", breed: "", color: "", sex: "Male",
                  age: "", weight: "", photo: null, photoPreview: "",
                  rabiesDate: "", distemperDate: "", otherVax: "",
                  isNeutered: false, hasMicrochip: false,
                });
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.7rem 1.25rem",
                borderRadius: "0.75rem",
                backgroundColor: "#F7F2EA",
                color: "#5C4E45",
                fontWeight: 700,
                fontSize: "0.875rem",
                border: "1.5px solid #E8DDD0",
                cursor: "pointer",
              }}
            >
              Register Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ backgroundColor: "#F7F2EA", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="max-w-3xl mx-auto">
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#7C4F2F" }}
            >
              <PawPrint size={20} color="#FFFCF7" />
            </div>
            <div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "#2E2A27",
                  lineHeight: 1.2,
                }}
              >
                Pet Registration Form
              </h1>
              <p style={{ color: "#8C7B6B", fontSize: "0.82rem" }}>
                Brgy. San Isidro, Quezon City · Official QR ID Registration
              </p>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => step > s.id && setStep(s.id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.3rem",
                  cursor: step > s.id ? "pointer" : "default",
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    backgroundColor:
                      step > s.id ? "#7C4F2F" : step === s.id ? "#F7EDE0" : "#E8DDD0",
                    color:
                      step > s.id ? "#FFFCF7" : step === s.id ? "#7C4F2F" : "#8C7B6B",
                    border: step === s.id ? "2px solid #7C4F2F" : "2px solid transparent",
                    transition: "all 0.2s",
                  }}
                >
                  {step > s.id ? <CheckCircle2 size={16} /> : s.id}
                </div>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: step === s.id ? 700 : 500,
                    color: step === s.id ? "#7C4F2F" : "#8C7B6B",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className="flex-1 h-0.5 mx-2 mb-5"
                  style={{ backgroundColor: step > s.id ? "#7C4F2F" : "#E8DDD0" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div
          style={{
            backgroundColor: "#FFFCF7",
            border: "1.5px solid #E8DDD0",
            borderRadius: "1.5rem",
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(124,79,47,0.08)",
          }}
        >
          {/* Step 1: Owner Information */}
          {step === 1 && (
            <div>
              <div
                className="px-7 py-5 flex items-center gap-3"
                style={{ borderBottom: "1.5px solid #E8DDD0", backgroundColor: "#F7EDE0" }}
              >
                <User size={20} color="#7C4F2F" />
                <div>
                  <h2 style={{ fontWeight: 700, color: "#2E2A27", fontSize: "1rem" }}>Owner Information</h2>
                  <p style={{ color: "#8C7B6B", fontSize: "0.78rem" }}>Step 1 of 4 — Pet owner's contact details</p>
                </div>
              </div>
              <div className="p-7 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      style={inputStyle}
                      placeholder="e.g. Maria Santos"
                      value={form.ownerName}
                      onChange={(e) => update("ownerName", e.target.value)}
                      onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      style={inputStyle}
                      type="email"
                      placeholder="owner@email.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Mobile Number *</label>
                    <div className="relative">
                      <Phone size={15} color="#8C7B6B" style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
                      <input
                        style={{ ...inputStyle, paddingLeft: "2.25rem" }}
                        placeholder="09XX XXX XXXX"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                        onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Barangay</label>
                    <select
                      style={{ ...inputStyle, cursor: "pointer" }}
                      value={form.barangay}
                      onChange={(e) => update("barangay", e.target.value)}
                    >
                      {["San Isidro", "Bagumbuhay", "Poblacion", "Santa Cruz", "Pasig Central"].map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Complete Home Address *</label>
                  <div className="relative">
                    <MapPin size={15} color="#8C7B6B" style={{ position: "absolute", left: "0.75rem", top: "0.75rem" }} />
                    <textarea
                      style={{ ...inputStyle, paddingLeft: "2.25rem", minHeight: "70px", resize: "vertical" }}
                      placeholder="House No., Street, Barangay, City"
                      value={form.address}
                      onChange={(e) => update("address", e.target.value)}
                      onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                    />
                  </div>
                </div>
                <div
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ backgroundColor: "#EBF3FA", border: "1px solid #B8D4EA" }}
                >
                  <Info size={16} color="#3B6FA0" style={{ flexShrink: 0, marginTop: "0.1rem" }} />
                  <p style={{ color: "#2A4F6F", fontSize: "0.8rem", lineHeight: 1.6 }}>
                    Your contact information is used only by the barangay office and will remain confidential. It will be displayed on your pet's QR profile for lost pet recovery.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Pet Information */}
          {step === 2 && (
            <div>
              <div
                className="px-7 py-5 flex items-center gap-3"
                style={{ borderBottom: "1.5px solid #E8DDD0", backgroundColor: "#F7EDE0" }}
              >
                <PawPrint size={20} color="#7C4F2F" />
                <div>
                  <h2 style={{ fontWeight: 700, color: "#2E2A27", fontSize: "1rem" }}>Pet Information</h2>
                  <p style={{ color: "#8C7B6B", fontSize: "0.78rem" }}>Step 2 of 4 — Details about your pet</p>
                </div>
              </div>
              <div className="p-7 space-y-5">
                {/* Photo Upload */}
                <div>
                  <label style={labelStyle}>Pet Photo *</label>
                  <div
                    className="relative flex flex-col items-center justify-center rounded-2xl cursor-pointer transition-all"
                    style={{
                      border: "2px dashed #C4956A",
                      backgroundColor: form.photoPreview ? "transparent" : "#FDF8F0",
                      minHeight: "160px",
                      overflow: "hidden",
                    }}
                    onClick={() => document.getElementById("petPhoto")?.click()}
                  >
                    {form.photoPreview ? (
                      <img
                        src={form.photoPreview}
                        alt="Preview"
                        style={{ width: "100%", height: "160px", objectFit: "cover" }}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 py-8">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: "#F7EDE0" }}
                        >
                          <Camera size={22} color="#7C4F2F" />
                        </div>
                        <p style={{ fontWeight: 700, color: "#7C4F2F", fontSize: "0.875rem" }}>Upload Pet Photo</p>
                        <p style={{ color: "#8C7B6B", fontSize: "0.775rem" }}>PNG, JPG up to 5MB</p>
                      </div>
                    )}
                    <input
                      id="petPhoto"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Pet Name *</label>
                    <input
                      style={inputStyle}
                      placeholder="e.g. Brownie"
                      value={form.petName}
                      onChange={(e) => update("petName", e.target.value)}
                      onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Species *</label>
                    <select
                      style={{ ...inputStyle, cursor: "pointer" }}
                      value={form.species}
                      onChange={(e) => update("species", e.target.value)}
                    >
                      {["Dog", "Cat", "Rabbit", "Bird", "Other"].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Breed</label>
                    <input
                      style={inputStyle}
                      placeholder="e.g. Aspin / Mixed"
                      value={form.breed}
                      onChange={(e) => update("breed", e.target.value)}
                      onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Primary Color</label>
                    <input
                      style={inputStyle}
                      placeholder="e.g. Brown and White"
                      value={form.color}
                      onChange={(e) => update("color", e.target.value)}
                      onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label style={labelStyle}>Sex</label>
                    <select
                      style={{ ...inputStyle, cursor: "pointer" }}
                      value={form.sex}
                      onChange={(e) => update("sex", e.target.value)}
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Age</label>
                    <input
                      style={inputStyle}
                      placeholder="e.g. 2 years"
                      value={form.age}
                      onChange={(e) => update("age", e.target.value)}
                      onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Weight (kg)</label>
                    <input
                      style={inputStyle}
                      placeholder="e.g. 4.5"
                      value={form.weight}
                      onChange={(e) => update("weight", e.target.value)}
                      onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  {[
                    { key: "isNeutered", label: "Neutered / Spayed" },
                    { key: "hasMicrochip", label: "Has Microchip" },
                  ].map((toggle) => (
                    <label
                      key={toggle.key}
                      className="flex items-center gap-2 cursor-pointer"
                      style={{ fontSize: "0.875rem", color: "#3D3530", fontWeight: 500 }}
                    >
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "5px",
                          border: `2px solid ${form[toggle.key as keyof typeof form] ? "#7C4F2F" : "#C4956A"}`,
                          backgroundColor: form[toggle.key as keyof typeof form] ? "#7C4F2F" : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => update(toggle.key, !form[toggle.key as keyof typeof form])}
                      >
                        {form[toggle.key as keyof typeof form] && (
                          <CheckCircle2 size={12} color="#FFFCF7" />
                        )}
                      </div>
                      {toggle.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Vaccination */}
          {step === 3 && (
            <div>
              <div
                className="px-7 py-5 flex items-center gap-3"
                style={{ borderBottom: "1.5px solid #E8DDD0", backgroundColor: "#F7EDE0" }}
              >
                <Syringe size={20} color="#7C4F2F" />
                <div>
                  <h2 style={{ fontWeight: 700, color: "#2E2A27", fontSize: "1rem" }}>Vaccination & Health Records</h2>
                  <p style={{ color: "#8C7B6B", fontSize: "0.78rem" }}>Step 3 of 4 — Immunization history</p>
                </div>
              </div>
              <div className="p-7 space-y-5">
                <div
                  className="p-4 rounded-xl flex items-start gap-3"
                  style={{ backgroundColor: "#EDF4EE", border: "1px solid #A8C9AE" }}
                >
                  <CheckCircle2 size={16} color="#3D6B45" style={{ flexShrink: 0, marginTop: "0.1rem" }} />
                  <p style={{ color: "#2A4F2E", fontSize: "0.8rem", lineHeight: 1.6 }}>
                    Vaccination records help barangay health teams track compliance and schedule immunization drives. All fields are optional but highly encouraged.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label style={labelStyle}>Anti-Rabies Vaccination Date</label>
                    <input
                      type="date"
                      style={inputStyle}
                      value={form.rabiesDate}
                      onChange={(e) => update("rabiesDate", e.target.value)}
                      onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Distemper / DHPP Date</label>
                    <input
                      type="date"
                      style={inputStyle}
                      value={form.distemperDate}
                      onChange={(e) => update("distemperDate", e.target.value)}
                      onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                      onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Other Vaccinations</label>
                  <input
                    style={inputStyle}
                    placeholder="e.g. Bordetella (Apr 2026), Leptospirosis (Jan 2026)"
                    value={form.otherVax}
                    onChange={(e) => update("otherVax", e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = "#7C4F2F")}
                    onBlur={(e) => (e.target.style.borderColor = "#E0D4C4")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Upload Vaccination Certificate (Optional)</label>
                  <div
                    className="flex flex-col items-center justify-center rounded-xl py-8 cursor-pointer"
                    style={{
                      border: "2px dashed #C4956A",
                      backgroundColor: "#FDF8F0",
                    }}
                    onClick={() => document.getElementById("vaxFile")?.click()}
                  >
                    <Upload size={22} color="#C4956A" />
                    <p style={{ fontWeight: 600, color: "#7C4F2F", fontSize: "0.82rem", marginTop: "0.5rem" }}>
                      Click to upload
                    </p>
                    <p style={{ color: "#8C7B6B", fontSize: "0.75rem" }}>PDF or Image · Max 5MB</p>
                    <input id="vaxFile" type="file" accept=".pdf,image/*" className="hidden" />
                  </div>
                </div>
                <div
                  className="p-4 rounded-xl flex items-start gap-3"
                  style={{ backgroundColor: "#FDF0E6", border: "1px solid #E8B88A" }}
                >
                  <AlertCircle size={16} color="#C0601A" style={{ flexShrink: 0, marginTop: "0.1rem" }} />
                  <p style={{ color: "#7A3A12", fontSize: "0.8rem", lineHeight: 1.6 }}>
                    <strong>Reminder:</strong> Pets without an anti-rabies vaccination record will be flagged for follow-up by the barangay health team.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Generate QR */}
          {step === 4 && (
            <div>
              <div
                className="px-7 py-5 flex items-center gap-3"
                style={{ borderBottom: "1.5px solid #E8DDD0", backgroundColor: "#F7EDE0" }}
              >
                <QrCode size={20} color="#7C4F2F" />
                <div>
                  <h2 style={{ fontWeight: 700, color: "#2E2A27", fontSize: "1rem" }}>Review & Generate QR ID</h2>
                  <p style={{ color: "#8C7B6B", fontSize: "0.78rem" }}>Step 4 of 4 — Confirm and generate your pet's QR identification</p>
                </div>
              </div>
              <div className="p-7 space-y-5">
                {/* Summary */}
                <div
                  className="p-5 rounded-2xl"
                  style={{ backgroundColor: "#F7F2EA", border: "1.5px solid #E8DDD0" }}
                >
                  <h3 style={{ fontWeight: 700, color: "#2E2A27", fontSize: "0.9rem", marginBottom: "1rem" }}>
                    Registration Summary
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: "Owner Name", value: form.ownerName || "—" },
                      { label: "Mobile", value: form.phone || "—" },
                      { label: "Barangay", value: form.barangay },
                      { label: "Pet Name", value: form.petName || "—" },
                      { label: "Species", value: form.species },
                      { label: "Breed", value: form.breed || "Mixed / Aspin" },
                      { label: "Sex", value: form.sex },
                      { label: "Age", value: form.age || "—" },
                      { label: "Vaccinated", value: form.rabiesDate ? "Yes (Rabies)" : "Not recorded" },
                      { label: "Neutered", value: form.isNeutered ? "Yes" : "No" },
                    ].map((row) => (
                      <div key={row.label}>
                        <p style={{ fontSize: "0.72rem", color: "#8C7B6B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                          {row.label}
                        </p>
                        <p style={{ fontSize: "0.875rem", color: "#2E2A27", fontWeight: 600, marginTop: "0.1rem" }}>
                          {row.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* QR Preview */}
                <div
                  className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl"
                  style={{ backgroundColor: "#FFFCF7", border: "1.5px solid #C4956A" }}
                >
                  <div
                    className="rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ padding: "6px", backgroundColor: "#fff", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}
                  >
                    <QRMock id={qrId} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.72rem", color: "#8C7B6B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      Your QR Pet ID
                    </p>
                    <p style={{ fontFamily: "monospace", fontWeight: 800, color: "#7C4F2F", fontSize: "1.15rem", marginTop: "0.2rem" }}>
                      {qrId}
                    </p>
                    <p style={{ color: "#5C4E45", fontSize: "0.8rem", marginTop: "0.25rem" }}>
                      Brgy. San Isidro, Quezon City
                    </p>
                    <p style={{ color: "#8C7B6B", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                      Print and attach to your pet's collar or tag. Anyone who finds your pet can scan this to contact you instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Footer */}
          <div
            className="px-7 py-5 flex items-center justify-between"
            style={{ borderTop: "1.5px solid #E8DDD0", backgroundColor: "#FDFAF6" }}
          >
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.65rem 1.25rem",
                borderRadius: "0.625rem",
                border: "1.5px solid #E8DDD0",
                backgroundColor: "#FFFCF7",
                color: step === 1 ? "#C4B4A4" : "#5C4E45",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: step === 1 ? "not-allowed" : "pointer",
              }}
            >
              <ArrowLeft size={15} /> Previous
            </button>
            <div className="flex items-center gap-2">
              {steps.map((s) => (
                <div
                  key={s.id}
                  style={{
                    width: step === s.id ? "20px" : "7px",
                    height: "7px",
                    borderRadius: "999px",
                    backgroundColor: step >= s.id ? "#7C4F2F" : "#E8DDD0",
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </div>
            {step < 4 ? (
              <button
                onClick={() => setStep(Math.min(4, step + 1))}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.65rem 1.25rem",
                  borderRadius: "0.625rem",
                  backgroundColor: "#7C4F2F",
                  color: "#FFFCF7",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(124,79,47,0.25)",
                }}
              >
                Continue <ChevronRight size={15} />
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.65rem 1.5rem",
                  borderRadius: "0.625rem",
                  backgroundColor: "#5C8A64",
                  color: "#FFFCF7",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(92,138,100,0.3)",
                }}
              >
                <QrCode size={16} /> Generate QR ID & Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
