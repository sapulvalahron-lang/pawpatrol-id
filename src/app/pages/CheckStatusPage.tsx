import { FormEvent, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { ClipboardList, PawPrint, Search } from "lucide-react";
import { findStoredPetByReferenceId, getOwnerStatusLabel } from "../data/petStorage";
import type { StoredPetRecord } from "../data/petStorage";

function statusColors(pet: StoredPetRecord) {
  if (pet.status === "Rejected" || pet.reviewStatus === "Rejected") {
    return { bg: "#F7F2EA", color: "#8C7B6B", border: "#E1D1BE" };
  }
  if (pet.status === "Active" || pet.reviewStatus === "Approved") {
    return { bg: "#EDF4EE", color: "#5C8A64", border: "#A8C9AE" };
  }
  return { bg: "#FFF7E6", color: "#C0601A", border: "#E8B88A" };
}

export function CheckStatusPage() {
  const [searchParams] = useSearchParams();
  const initialRef = searchParams.get("ref") ?? "";
  const [referenceId, setReferenceId] = useState(initialRef);
  const [submittedId, setSubmittedId] = useState("");
  const [result, setResult] = useState<StoredPetRecord | null | undefined>(undefined);

  const runLookup = (query: string) => {
    const trimmed = query.trim();
    setSubmittedId(trimmed);
    if (!trimmed) {
      setResult(null);
      return;
    }
    setResult(findStoredPetByReferenceId(trimmed) ?? null);
  };

  useEffect(() => {
    if (initialRef.trim()) {
      runLookup(initialRef);
    }
  }, [initialRef]);

  const handleCheck = (event: FormEvent) => {
    event.preventDefault();
    runLookup(referenceId);
  };

  const colors = result ? statusColors(result) : null;

  return (
    <div
      className="min-h-[calc(100vh-4rem)] py-10 px-4"
      style={{ backgroundColor: "#F3E8D8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="max-w-xl mx-auto">
        <div
          className="rounded-3xl p-8"
          style={{
            backgroundColor: "#FFFCF7",
            border: "1.5px solid #E8DDD0",
            boxShadow: "0 12px 40px rgba(124,79,47,0.1)",
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#7C4F2F", color: "#FFFCF7" }}
            >
              <ClipboardList size={22} />
            </span>
            <div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  color: "#2E2A27",
                  lineHeight: 1.2,
                }}
              >
                Check Registration Status
              </h1>
              <p style={{ color: "#5C4E45", fontSize: "0.82rem", marginTop: "0.2rem" }}>
                Pet owner status lookup (MVP demo)
              </p>
            </div>
          </div>

          <p
            className="rounded-xl px-4 py-3 mb-6"
            style={{ backgroundColor: "#F7F2EA", border: "1px solid #E1D1BE", color: "#5C4E45", fontSize: "0.8rem", lineHeight: 1.6 }}
          >
            This is a frontend-only MVP status lookup. Records are saved locally in this browser.
          </p>

          <form onSubmit={handleCheck} className="space-y-4">
            <div>
              <label
                htmlFor="referenceId"
                style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#5C4E45", marginBottom: "0.35rem", textTransform: "uppercase", letterSpacing: "0.04em" }}
              >
                Enter Pet Reference ID
              </label>
              <input
                id="referenceId"
                type="text"
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
                placeholder="Example: PPID-2026-0001"
                style={{
                  width: "100%",
                  padding: "0.625rem 0.875rem",
                  borderRadius: "0.625rem",
                  border: "1.5px solid #E1D1BE",
                  backgroundColor: "#FFFCF7",
                  color: "#2E2A27",
                  fontSize: "0.875rem",
                  fontFamily: "monospace",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.7rem 1rem",
                borderRadius: "0.75rem",
                backgroundColor: "#7C4F2F",
                color: "#FFFCF7",
                fontWeight: 700,
                fontSize: "0.9rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Search size={16} />
              Check Status
            </button>
          </form>

          {result !== undefined && (
            <div className="mt-6">
              {result === null ? (
                <p style={{ color: "#C0601A", fontSize: "0.9rem", fontWeight: 700, lineHeight: 1.6 }}>
                  No submitted pet record found for this reference ID.
                  {submittedId ? (
                    <span style={{ display: "block", fontWeight: 500, color: "#5C4E45", marginTop: "0.35rem", fontFamily: "monospace", fontSize: "0.82rem" }}>
                      Searched: {submittedId.trim().toUpperCase()}
                    </span>
                  ) : null}
                </p>
              ) : (
                <div
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: "#F7F2EA", border: "1.5px solid #E8DDD0" }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      style={{ border: "2px solid #E8DDD0" }}
                    />
                    <div>
                      <p style={{ fontWeight: 800, color: "#2E2A27", fontSize: "1.05rem" }}>{result.name}</p>
                      <p style={{ color: "#5C4E45", fontSize: "0.82rem" }}>
                        {result.species} · {result.breed}
                      </p>
                      <p style={{ color: "#8C7B6B", fontSize: "0.78rem", marginTop: "0.2rem" }}>
                        Owner: {result.owner.name}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#8C7B6B", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        Reference ID
                      </p>
                      <p style={{ fontFamily: "monospace", fontWeight: 800, color: "#7C4F2F", fontSize: "0.95rem" }}>{result.qrId}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#8C7B6B", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        Status
                      </p>
                      <span
                        style={{
                          display: "inline-block",
                          marginTop: "0.25rem",
                          padding: "0.25rem 0.65rem",
                          borderRadius: "999px",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          backgroundColor: colors?.bg,
                          color: colors?.color,
                          border: `1px solid ${colors?.border}`,
                        }}
                      >
                        {getOwnerStatusLabel(result)}
                      </span>
                    </div>
                    {result.reviewStatus && (
                      <div>
                        <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#8C7B6B", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                          Review status
                        </p>
                        <p style={{ color: "#5C4E45", fontSize: "0.85rem", fontWeight: 600 }}>{result.reviewStatus}</p>
                      </div>
                    )}
                    <div>
                      <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#8C7B6B", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        Submitted
                      </p>
                      <p style={{ color: "#5C4E45", fontSize: "0.85rem", fontWeight: 600 }}>{result.registeredDate}</p>
                    </div>
                  </div>

                  <Link
                    to={`/pet-profile/${result.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      marginTop: "1rem",
                      color: "#7C4F2F",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      textDecoration: "none",
                    }}
                  >
                    <PawPrint size={14} />
                    View demo profile preview
                  </Link>
                </div>
              )}
            </div>
          )}

          <Link
            to="/register-pet"
            style={{
              display: "inline-block",
              marginTop: "1.5rem",
              color: "#7C4F2F",
              fontWeight: 700,
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            Register another pet
          </Link>
        </div>
      </div>
    </div>
  );
}
