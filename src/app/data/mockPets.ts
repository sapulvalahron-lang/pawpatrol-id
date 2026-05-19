import { getStoredPets, type StoredPetRecord } from "./petStorage";

export type MockPet = {
  slug: string;
  name: string;
  qrId: string;
  isLocal?: boolean;
  species: string;
  breed: string;
  sex: string;
  age: string;
  color: string;
  weight: string;
  isNeutered: boolean;
  hasMicrochip: boolean;
  status: "Active" | "Pending" | "Lost";
  barangay: string;
  registeredDate: string;
  owner: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  image: string;
  vaccinations: { name: string; date: string; status: string; nextDue: string }[];
};

export const mockPets: MockPet[] = [
  {
    slug: "brownie",
    name: "Brownie",
    qrId: "PPB-2026-00842",
    species: "Dog",
    breed: "Golden Retriever",
    sex: "Male",
    age: "2 years",
    color: "Golden",
    weight: "24 kg",
    isNeutered: true,
    hasMicrochip: false,
    status: "Active",
    barangay: "Brgy. San Isidro, Quezon City",
    registeredDate: "January 12, 2026",
    image:
      "https://images.unsplash.com/photo-1768676758480-44e11e5c164a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdCUyMG91dGRvb3JzfGVufDF8fHx8MTc3NzgxMDUyNHww&ixlib=rb-4.1.0&q=80&w=1080",
    owner: {
      name: "Maria Santos",
      phone: "0917-234-5678",
      email: "maria.santos@gmail.com",
      address: "123 Sampaguita St., Brgy. San Isidro, QC",
    },
    vaccinations: [
      { name: "Anti-Rabies", date: "February 10, 2026", status: "Completed", nextDue: "February 10, 2027" },
      { name: "DHPP (Distemper)", date: "January 15, 2026", status: "Completed", nextDue: "January 15, 2027" },
      { name: "Bordetella", date: "March 2, 2026", status: "Completed", nextDue: "March 2, 2027" },
    ],
  },
  {
    slug: "mochi",
    name: "Mochi",
    qrId: "PPB-2026-00841",
    species: "Cat",
    breed: "Domestic Shorthair",
    sex: "Female",
    age: "1 year",
    color: "Gray tabby",
    weight: "4.2 kg",
    isNeutered: true,
    hasMicrochip: true,
    status: "Active",
    barangay: "Brgy. San Isidro, Quezon City",
    registeredDate: "February 4, 2026",
    image:
      "https://images.unsplash.com/photo-1759687134753-3b5dc2e53c41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJieSUyMGNhdCUyMHNpdHRpbmclMjB3aW5kb3clMjBsaWdodHxlbnwxfHx8fDE3Nzc4MTA1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    owner: {
      name: "Juan Dela Cruz",
      phone: "0998-765-4321",
      email: "juan.delacruz@gmail.com",
      address: "45 Mabini Ave., Brgy. San Isidro, QC",
    },
    vaccinations: [
      { name: "Anti-Rabies", date: "March 8, 2026", status: "Completed", nextDue: "March 8, 2027" },
      { name: "FVRCP", date: "March 18, 2026", status: "Completed", nextDue: "March 18, 2027" },
    ],
  },
  {
    slug: "choco",
    name: "Choco",
    qrId: "PPB-2026-00840",
    species: "Dog",
    breed: "Beagle",
    sex: "Male",
    age: "3 years",
    color: "Tri-color",
    weight: "12 kg",
    isNeutered: false,
    hasMicrochip: false,
    status: "Pending",
    barangay: "Brgy. San Isidro, Quezon City",
    registeredDate: "March 21, 2026",
    image:
      "https://images.unsplash.com/photo-1559015307-e8e2c0e62223?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFnbGUlMjBwdXBweSUyMGN1dGUlMjBicm93biUyMHdoaXRlfGVufDF8fHx8MTc3NzgxMDUyNXww&ixlib=rb-4.1.0&q=80&w=1080",
    owner: {
      name: "Ana Reyes",
      phone: "0912-888-0011",
      email: "ana.reyes@gmail.com",
      address: "78 Narra St., Brgy. San Isidro, QC",
    },
    vaccinations: [
      { name: "Anti-Rabies", date: "January 20, 2026", status: "Completed", nextDue: "January 20, 2027" },
      { name: "DHPP (Distemper)", date: "Pending verification", status: "For Review", nextDue: "Barangay follow-up" },
    ],
  },
  {
    slug: "snowball",
    name: "Snowball",
    qrId: "PPB-2026-00839",
    species: "Dog",
    breed: "Shih Tzu",
    sex: "Female",
    age: "4 years",
    color: "White and cream",
    weight: "6 kg",
    isNeutered: true,
    hasMicrochip: false,
    status: "Active",
    barangay: "Brgy. San Isidro, Quezon City",
    registeredDate: "April 2, 2026",
    image:
      "https://images.unsplash.com/photo-1712742606909-c95e463539a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGloJTIwdHp1JTIwZG9nJTIwd2hpdGUlMjBmbHVmZnl8ZW58MXx8fHwxNzc3ODEwNTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    owner: {
      name: "Pedro Manalo",
      phone: "0920-111-7788",
      email: "pedro.manalo@gmail.com",
      address: "12 Acacia Lane, Brgy. San Isidro, QC",
    },
    vaccinations: [
      { name: "Anti-Rabies", date: "April 12, 2026", status: "Completed", nextDue: "April 12, 2027" },
    ],
  },
  {
    slug: "luna",
    name: "Luna",
    qrId: "PPB-2026-00838",
    species: "Dog",
    breed: "Aspin",
    sex: "Female",
    age: "8 months",
    color: "Brown and white",
    weight: "8 kg",
    isNeutered: false,
    hasMicrochip: false,
    status: "Pending",
    barangay: "Brgy. San Isidro, Quezon City",
    registeredDate: "April 15, 2026",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    owner: {
      name: "Rosa Lim",
      phone: "0933-555-1010",
      email: "rosa.lim@gmail.com",
      address: "9 Molave St., Brgy. San Isidro, QC",
    },
    vaccinations: [
      { name: "Anti-Rabies", date: "Pending upload", status: "For Review", nextDue: "Barangay follow-up" },
    ],
  },
  {
    slug: "max",
    name: "Max",
    qrId: "PPB-2026-00837",
    species: "Dog",
    breed: "Labrador Retriever",
    sex: "Male",
    age: "5 years",
    color: "Black",
    weight: "28 kg",
    isNeutered: true,
    hasMicrochip: true,
    status: "Lost",
    barangay: "Brgy. San Isidro, Quezon City",
    registeredDate: "April 20, 2026",
    image:
      "https://images.unsplash.com/photo-1763568890860-1793fced7249?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGxhYnJhZG9yJTIwZG9nJTIwc2l0dGluZyUyMHBhcmt8ZW58MXx8fHwxNzc3ODEwNTI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    owner: {
      name: "Carlo Mendoza",
      phone: "0919-444-2266",
      email: "carlo.mendoza@gmail.com",
      address: "33 Rizal Ext., Brgy. San Isidro, QC",
    },
    vaccinations: [
      { name: "Anti-Rabies", date: "February 18, 2026", status: "Completed", nextDue: "February 18, 2027" },
      { name: "DHPP (Distemper)", date: "March 4, 2026", status: "Completed", nextDue: "March 4, 2027" },
    ],
  },
];

export const mockPetsBySlug = mockPets.reduce<Record<string, MockPet>>((petsBySlug, pet) => {
  petsBySlug[pet.slug] = pet;
  return petsBySlug;
}, {});

/** Mock demo pets first, then locally saved registrations (newest last). */
export function getMergedPets(): MockPet[] {
  return [...mockPets, ...getStoredPets()];
}

export function getMergedPetsBySlug(): Record<string, MockPet> {
  return getMergedPets().reduce<Record<string, MockPet>>((petsBySlug, pet) => {
    petsBySlug[pet.slug] = pet;
    return petsBySlug;
  }, {});
}

export function getLocalPetsNewestFirst(): StoredPetRecord[] {
  return [...getStoredPets()].reverse();
}
