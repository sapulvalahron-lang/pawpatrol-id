import type { MockPet } from "./mockPets";
import { formatRegisteredDate, updateStoredPet } from "./petStorage";

export const PAWPATROL_REPORTS_KEY = "pawpatrol_reports";

export type StoredLostReport = {
  reportId: string;
  petId: string;
  qrId: string;
  petSlug: string;
  petName: string;
  species: string;
  breed: string;
  color?: string;
  sex?: string;
  ownerName: string;
  ownerContact?: string;
  image: string;
  reportType: "Lost";
  reportStatus: "Active" | "Resolved";
  lastSeenLocation: string;
  barangay?: string;
  description: string;
  reportedDate: string;
  source: "local";
};

function readRaw(): StoredLostReport[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PAWPATROL_REPORTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as StoredLostReport[]) : [];
  } catch {
    return [];
  }
}

function writeAll(reports: StoredLostReport[]): void {
  window.localStorage.setItem(PAWPATROL_REPORTS_KEY, JSON.stringify(reports));
}

export function getStoredReports(): StoredLostReport[] {
  return readRaw();
}

export function getActiveLostReports(): StoredLostReport[] {
  return readRaw().filter(
    (report) => report.reportType === "Lost" && report.reportStatus === "Active"
  );
}

function generateReportId(existing: StoredLostReport[]): string {
  const year = new Date().getFullYear();
  const prefix = `LFR-${year}-`;
  const maxSeq = existing.reduce((max, report) => {
    const match = report.reportId.match(/^LFR-\d{4}-(\d+)$/);
    if (!match) return max;
    return Math.max(max, parseInt(match[1], 10));
  }, 0);
  return `${prefix}${String(maxSeq + 1).padStart(4, "0")}`;
}

export function isPetApprovedForLostReport(pet: MockPet): boolean {
  if (pet.status === "Pending" || pet.status === "Rejected") return false;
  if (pet.reviewStatus === "Pending Review" || pet.reviewStatus === "Rejected") return false;
  if (pet.isLocal) {
    return pet.reviewStatus === "Approved";
  }
  return pet.status === "Active" || pet.status === "Lost";
}

export function canReportPetAsLost(pet: MockPet): boolean {
  return isPetApprovedForLostReport(pet) && pet.status === "Active";
}

export function buildLostReportFromPet(pet: MockPet, reportId: string): StoredLostReport {
  const lastSeen = pet.owner.address?.trim() || pet.barangay;
  return {
    reportId,
    petId: pet.qrId,
    qrId: pet.qrId,
    petSlug: pet.slug,
    petName: pet.name,
    species: pet.species,
    breed: pet.breed,
    color: pet.color,
    sex: pet.sex,
    ownerName: pet.owner.name,
    ownerContact: pet.owner.phone,
    image: pet.image,
    reportType: "Lost",
    reportStatus: "Active",
    lastSeenLocation: lastSeen,
    barangay: pet.barangay,
    description: `${pet.name} was reported missing near ${lastSeen}. Registered pet with PawPatrol ID reference ${pet.qrId}. Please contact the owner if found.`,
    reportedDate: formatRegisteredDate(),
    source: "local",
  };
}

/** Create or update an active Lost report for this pet (no duplicate active Lost rows). */
export function upsertActiveLostReport(pet: MockPet): StoredLostReport {
  const reports = readRaw();
  const existingIndex = reports.findIndex(
    (report) =>
      report.petSlug === pet.slug &&
      report.reportType === "Lost" &&
      report.reportStatus === "Active"
  );

  const reportId =
    existingIndex >= 0 ? reports[existingIndex].reportId : generateReportId(reports);
  const nextReport = buildLostReportFromPet(pet, reportId);

  if (existingIndex >= 0) {
    reports[existingIndex] = nextReport;
  } else {
    reports.push(nextReport);
  }

  writeAll(reports);
  return nextReport;
}

export function resolveActiveLostReport(petSlug: string): void {
  const reports = readRaw();
  const updated = reports.map((report) =>
    report.petSlug === petSlug && report.reportType === "Lost" && report.reportStatus === "Active"
      ? { ...report, reportStatus: "Resolved" as const }
      : report
  );
  writeAll(updated);
}

export function reportPetAsLost(pet: MockPet): StoredLostReport | null {
  if (!canReportPetAsLost(pet)) return null;

  if (pet.isLocal) {
    updateStoredPet(pet.slug, { status: "Lost", reviewStatus: "Approved" });
  }

  return upsertActiveLostReport({ ...pet, status: "Lost", reviewStatus: pet.reviewStatus ?? "Approved" });
}

export function reportPetAsFound(pet: MockPet): void {
  if (pet.isLocal) {
    updateStoredPet(pet.slug, { status: "Active", reviewStatus: "Approved" });
  }
  resolveActiveLostReport(pet.slug);
}
