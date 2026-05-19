import type { MockPet } from "./mockPets";

export const PAWPATROL_PETS_KEY = "pawpatrol_pets";

export type StoredPetRecord = MockPet & { isLocal?: boolean };

function readRaw(): StoredPetRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PAWPATROL_PETS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as StoredPetRecord[]) : [];
  } catch {
    return [];
  }
}

export function getStoredPets(): StoredPetRecord[] {
  return readRaw();
}

export function saveStoredPet(pet: StoredPetRecord): void {
  const existing = readRaw();
  window.localStorage.setItem(PAWPATROL_PETS_KEY, JSON.stringify([...existing, { ...pet, isLocal: true }]));
}

function writeAll(pets: StoredPetRecord[]): void {
  window.localStorage.setItem(PAWPATROL_PETS_KEY, JSON.stringify(pets));
}

export function updateStoredPet(slug: string, updates: Partial<StoredPetRecord>): StoredPetRecord | null {
  const pets = readRaw();
  const index = pets.findIndex((pet) => pet.slug === slug);
  if (index === -1) return null;
  const updated = { ...pets[index], ...updates, isLocal: true };
  pets[index] = updated;
  writeAll(pets);
  return updated;
}

export function approveStoredPet(slug: string): StoredPetRecord | null {
  return updateStoredPet(slug, {
    status: "Active",
    reviewStatus: "Approved",
  });
}

export function rejectStoredPet(slug: string): StoredPetRecord | null {
  return updateStoredPet(slug, {
    status: "Rejected",
    reviewStatus: "Rejected",
  });
}

export function getPendingStoredPets(): StoredPetRecord[] {
  return getStoredPets().filter(
    (pet) => pet.status === "Pending" || pet.reviewStatus === "Pending Review"
  );
}

export function getApprovedStoredPets(): StoredPetRecord[] {
  return getStoredPets().filter(
    (pet) => pet.status === "Active" && pet.reviewStatus === "Approved"
  );
}

export function findStoredPetByReferenceId(referenceId: string): StoredPetRecord | undefined {
  const normalized = referenceId.trim().toUpperCase();
  if (!normalized) return undefined;
  return getStoredPets().find((pet) => pet.qrId.toUpperCase() === normalized);
}

export function markStoredPetAsLost(slug: string): StoredPetRecord | null {
  return updateStoredPet(slug, { status: "Lost", reviewStatus: "Approved" });
}

export function markStoredPetAsFound(slug: string): StoredPetRecord | null {
  return updateStoredPet(slug, { status: "Active", reviewStatus: "Approved" });
}

export function getOwnerStatusLabel(pet: StoredPetRecord): string {
  if (pet.status === "Rejected" || pet.reviewStatus === "Rejected") {
    return "Rejected Submission";
  }
  if (pet.status === "Lost" && pet.reviewStatus === "Approved") {
    return "Reported Lost (Approved Record)";
  }
  if (pet.status === "Active" || pet.reviewStatus === "Approved") {
    return "Approved Barangay Record";
  }
  return "Pending Barangay Review";
}

export function generatePetId(existing: StoredPetRecord[]): string {
  const year = new Date().getFullYear();
  const prefix = `PPID-${year}-`;
  const maxSeq = existing.reduce((max, pet) => {
    const match = pet.qrId.match(/^PPID-\d{4}-(\d+)$/);
    if (!match) return max;
    return Math.max(max, parseInt(match[1], 10));
  }, 0);
  const next = maxSeq + 1;
  if (next <= 9999) {
    return `${prefix}${String(next).padStart(4, "0")}`;
  }
  return `PPID-${year}-${Date.now()}`;
}

export function generatePetSlug(petName: string, qrId: string): string {
  const base = petName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const suffix = qrId.split("-").pop()?.toLowerCase() ?? String(Date.now());
  return base ? `${base}-${suffix}` : `pet-${suffix}`;
}

export function formatRegisteredDate(date: Date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatVaxDate(isoDate: string): string {
  if (!isoDate) return "";
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const DEFAULT_PET_IMAGE =
  "https://images.unsplash.com/photo-1583511655857-d19b40a7a54d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

export function buildVaccinationsFromForm(form: {
  rabiesDate: string;
  distemperDate: string;
  otherVax: string;
}): MockPet["vaccinations"] {
  const vaccinations: MockPet["vaccinations"] = [];
  if (form.rabiesDate) {
    vaccinations.push({
      name: "Anti-Rabies",
      date: formatVaxDate(form.rabiesDate),
      status: "For Review",
      nextDue: "Pending barangay validation",
    });
  }
  if (form.distemperDate) {
    vaccinations.push({
      name: "DHPP (Distemper)",
      date: formatVaxDate(form.distemperDate),
      status: "For Review",
      nextDue: "Pending barangay validation",
    });
  }
  if (form.otherVax.trim()) {
    vaccinations.push({
      name: "Other Vaccinations",
      date: form.otherVax.trim(),
      status: "For Review",
      nextDue: "Pending barangay validation",
    });
  }
  if (vaccinations.length === 0) {
    vaccinations.push({
      name: "Anti-Rabies",
      date: "Pending upload",
      status: "For Review",
      nextDue: "Barangay follow-up",
    });
  }
  return vaccinations;
}

export function buildPetFromRegistration(
  form: {
    ownerName: string;
    email: string;
    phone: string;
    address: string;
    barangay: string;
    petName: string;
    species: string;
    breed: string;
    color: string;
    sex: string;
    age: string;
    weight: string;
    photoPreview: string;
    rabiesDate: string;
    distemperDate: string;
    otherVax: string;
    isNeutered: boolean;
    hasMicrochip: boolean;
  },
  imageOverride?: string
): StoredPetRecord {
  const stored = getStoredPets();
  const qrId = generatePetId(stored);
  const slug = generatePetSlug(form.petName || "pet", qrId);
  const barangayLabel = form.barangay.startsWith("Brgy.")
    ? form.barangay
    : `Brgy. ${form.barangay}, Quezon City`;

  return {
    slug,
    name: form.petName.trim() || "Unnamed Pet",
    qrId,
    species: form.species,
    breed: form.breed.trim() || "Mixed / Aspin",
    sex: form.sex,
    age: form.age.trim() || "Not specified",
    color: form.color.trim() || "Not specified",
    weight: form.weight.trim() ? `${form.weight.trim()} kg` : "Not specified",
    isNeutered: form.isNeutered,
    hasMicrochip: form.hasMicrochip,
    status: "Pending",
    reviewStatus: "Pending Review",
    barangay: barangayLabel,
    registeredDate: formatRegisteredDate(),
    owner: {
      name: form.ownerName.trim() || "Not provided",
      phone: form.phone.trim() || "Not provided",
      email: form.email.trim() || "Not provided",
      address: form.address.trim() || "Not provided",
    },
    image: imageOverride || form.photoPreview || DEFAULT_PET_IMAGE,
    vaccinations: buildVaccinationsFromForm(form),
    isLocal: true,
  };
}

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
