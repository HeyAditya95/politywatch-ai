// Seeded demo dataset for 15 prominent Indian MPs.
// Asset values are in INR Crore (₹). LAD = MPLADS spend in ₹ Lakh.
// NOTE: Numbers are illustrative for demo; not authoritative.

export type Party =
  | "BJP"
  | "INC"
  | "TMC"
  | "DMK"
  | "AAP"
  | "SP"
  | "SS-UBT"
  | "NCP-SP"
  | "JD(U)"
  | "AIMIM"
  | "CPI(M)"
  | "NCP"
  | "SHS"
  | "RJD"
  | "LJP-RV"
  | "SAD"
  | "BJD"
  | "VCK"
  | "IND";

export type PromiseStatus = "fulfilled" | "in-progress" | "broken";

export interface LandParcel {
  location: string;
  owner: "Self" | "Spouse" | "HUF";
  type: "Agricultural" | "Residential" | "Commercial" | "Orchard";
  acres: number;
  value: number; // ₹ Crore declared
}

export interface LandHoldingYear {
  year: number;
  parcels: LandParcel[];
  total_acres: number;
  total_value: number; // ₹ Crore
}

export interface AssetYear {
  year: number;
  movable: number; // ₹ Crore
  immovable: number; // ₹ Crore
  liabilities: number; // ₹ Crore
}

export interface Promise {
  id: string;
  text: string;
  category: "Infrastructure" | "Education" | "Health" | "Employment" | "Welfare" | "Environment";
  status: PromiseStatus;
  year: number;
}

export interface LadCategory {
  category:
    | "Roads & Bridges"
    | "Education"
    | "Health"
    | "Drinking Water"
    | "Sanitation"
    | "Sports & Culture"
    | "Electrification"
    | "Other";
  amount: number; // ₹ Lakh
}

export interface LadYear {
  year: number;
  allocated: number; // ₹ Lakh
  spent: number; // ₹ Lakh
  works_completed: number;
}

export interface MP {
  id: string;
  name: string;
  party: Party;
  state: string;
  constituency: string;
  age: number;
  education: string;
  criminalCases: number;
  attendance: number; // %
  questionsAsked: number;
  debatesParticipated: number;
  termsServed: number;
  photo: string; // initials avatar fallback
  bio: string;
  assets: AssetYear[]; // 4 declarations
  promises: Promise[];
  ladByYear: LadYear[];
  ladByCategory: LadCategory[];
  landHoldings: LandHoldingYear[];
  aiSummary: string;
}

const partyColor: Record<Party, string> = {
  BJP: "#FF9933",
  INC: "#19AAED",
  TMC: "#20603D",
  DMK: "#E60012",
  AAP: "#0072BC",
  SP: "#C80000",
  "SS-UBT": "#F47216",
  "NCP-SP": "#0F8A3D",
  "JD(U)": "#16A34A",
  AIMIM: "#0E7B3B",
  "CPI(M)": "#D81F26",
  NCP: "#00A551",
  SHS: "#F47216",
  RJD: "#138808",
  "LJP-RV": "#9333EA",
  SAD: "#1E40AF",
  BJD: "#16A34A",
  VCK: "#1F2937",
  IND: "#6B7280",
};

export const getPartyColor = (p: Party) => partyColor[p];

import { LAND_FOR_EXISTING, NEW_MPS_RAW } from "./mps_appendix";

const mk = (
  id: string,
  data: Omit<MP, "id" | "photo" | "landHoldings"> & { landHoldings?: LandHoldingYear[] },
): MP => {
  const { landHoldings, ...rest } = data;
  return {
    id,
    photo: rest.name
      .split(" ")
      .map((s) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase(),
    landHoldings: landHoldings ?? LAND_FOR_EXISTING[id] ?? [],
    ...rest,
  };
};

export const MPS: MP[] = [
  mk("narendra-modi", {
    name: "Narendra Modi",
    party: "BJP",
    state: "Uttar Pradesh",
    constituency: "Varanasi",
    age: 75,
    education: "MA, Political Science",
    criminalCases: 0,
    attendance: 96,
    questionsAsked: 0,
    debatesParticipated: 14,
    termsServed: 3,
    bio: "Prime Minister of India and MP from Varanasi since 2014.",
    assets: [
      { year: 2014, movable: 0.65, immovable: 0.85, liabilities: 0 },
      { year: 2019, movable: 1.41, immovable: 1.1, liabilities: 0 },
      { year: 2022, movable: 1.74, immovable: 1.1, liabilities: 0 },
      { year: 2024, movable: 3.02, immovable: 0, liabilities: 0 },
    ],
    promises: [
      { id: "p1", text: "Bullet train Mumbai–Ahmedabad operational", category: "Infrastructure", status: "in-progress", year: 2019 },
      { id: "p2", text: "Doubling farmer income by 2022", category: "Welfare", status: "broken", year: 2019 },
      { id: "p3", text: "Ayushman Bharat health coverage rollout", category: "Health", status: "fulfilled", year: 2019 },
      { id: "p4", text: "Ganga river cleanup (Namami Gange)", category: "Environment", status: "in-progress", year: 2014 },
      { id: "p5", text: "Make in India manufacturing share to 25%", category: "Employment", status: "in-progress", year: 2014 },
      { id: "p6", text: "Triple talaq abolition", category: "Welfare", status: "fulfilled", year: 2019 },
    ],
    ladByYear: [
      { year: 2019, allocated: 500, spent: 478, works_completed: 142 },
      { year: 2020, allocated: 250, spent: 230, works_completed: 86 },
      { year: 2021, allocated: 250, spent: 240, works_completed: 91 },
      { year: 2022, allocated: 500, spent: 488, works_completed: 156 },
      { year: 2023, allocated: 500, spent: 472, works_completed: 148 },
    ],
    ladByCategory: [
      { category: "Roads & Bridges", amount: 612 },
      { category: "Drinking Water", amount: 412 },
      { category: "Education", amount: 388 },
      { category: "Health", amount: 290 },
      { category: "Sanitation", amount: 186 },
      { category: "Electrification", amount: 152 },
      { category: "Sports & Culture", amount: 110 },
    ],
    aiSummary:
      "PM Modi's declared assets grew ~360% from ₹1.5 Cr (2014) to ₹3.0 Cr (2024), with no liabilities reported. Ghats and roadworks dominate Varanasi's MPLADS spend. Of 6 tracked manifesto promises, 2 are fulfilled, 3 in progress, and 1 (doubling farmer income) is unmet.",
  }),

  mk("rahul-gandhi", {
    name: "Rahul Gandhi",
    party: "INC",
    state: "Kerala",
    constituency: "Wayanad",
    age: 55,
    education: "MPhil, Cambridge",
    criminalCases: 18,
    attendance: 52,
    questionsAsked: 5,
    debatesParticipated: 9,
    termsServed: 4,
    bio: "Leader of Opposition. MP from Rae Bareli; previously Wayanad.",
    assets: [
      { year: 2009, movable: 1.8, immovable: 0, liabilities: 0 },
      { year: 2014, movable: 9.4, immovable: 0, liabilities: 0 },
      { year: 2019, movable: 15.88, immovable: 0, liabilities: 0.72 },
      { year: 2024, movable: 20.39, immovable: 11.15, liabilities: 0.49 },
    ],
    promises: [
      { id: "p1", text: "NYAY income-support scheme", category: "Welfare", status: "broken", year: 2019 },
      { id: "p2", text: "MGNREGA expansion to 150 days", category: "Employment", status: "in-progress", year: 2019 },
      { id: "p3", text: "Farmer loan waiver advocacy", category: "Welfare", status: "in-progress", year: 2019 },
      { id: "p4", text: "Bharat Jodo Yatra completion", category: "Welfare", status: "fulfilled", year: 2022 },
      { id: "p5", text: "Caste census push", category: "Welfare", status: "in-progress", year: 2024 },
    ],
    ladByYear: [
      { year: 2019, allocated: 500, spent: 411, works_completed: 118 },
      { year: 2020, allocated: 250, spent: 198, works_completed: 64 },
      { year: 2021, allocated: 250, spent: 215, works_completed: 71 },
      { year: 2022, allocated: 500, spent: 442, works_completed: 132 },
      { year: 2023, allocated: 500, spent: 421, works_completed: 128 },
    ],
    ladByCategory: [
      { category: "Education", amount: 488 },
      { category: "Drinking Water", amount: 354 },
      { category: "Roads & Bridges", amount: 312 },
      { category: "Health", amount: 268 },
      { category: "Sports & Culture", amount: 124 },
      { category: "Sanitation", amount: 98 },
      { category: "Other", amount: 142 },
    ],
    aiSummary:
      "Rahul Gandhi's assets grew ~17x since 2009, driven mostly by inherited mutual funds and a 2024 Delhi property declaration. LAD spend leans heavily into Wayanad's tribal education and water infrastructure. Attendance (52%) is well below the Lok Sabha average of ~79%.",
  }),

  mk("shashi-tharoor", {
    name: "Shashi Tharoor",
    party: "INC",
    state: "Kerala",
    constituency: "Thiruvananthapuram",
    age: 69,
    education: "PhD, Tufts (Fletcher School)",
    criminalCases: 1,
    attendance: 88,
    questionsAsked: 312,
    debatesParticipated: 168,
    termsServed: 4,
    bio: "Author, diplomat, and four-time MP from Thiruvananthapuram.",
    assets: [
      { year: 2009, movable: 26.4, immovable: 25.8, liabilities: 1.2 },
      { year: 2014, movable: 12.7, immovable: 11.8, liabilities: 0.9 },
      { year: 2019, movable: 18.2, immovable: 16.4, liabilities: 1.1 },
      { year: 2024, movable: 24.6, immovable: 30.1, liabilities: 1.8 },
    ],
    promises: [
      { id: "p1", text: "Vizhinjam port operationalisation", category: "Infrastructure", status: "fulfilled", year: 2019 },
      { id: "p2", text: "Light Metro for Thiruvananthapuram", category: "Infrastructure", status: "in-progress", year: 2014 },
      { id: "p3", text: "Coastal erosion mitigation", category: "Environment", status: "in-progress", year: 2019 },
      { id: "p4", text: "AIIMS-equivalent facility for capital", category: "Health", status: "broken", year: 2014 },
      { id: "p5", text: "IT corridor expansion to Technopark Phase IV", category: "Employment", status: "fulfilled", year: 2019 },
    ],
    ladByYear: [
      { year: 2019, allocated: 500, spent: 489, works_completed: 184 },
      { year: 2020, allocated: 250, spent: 247, works_completed: 96 },
      { year: 2021, allocated: 250, spent: 248, works_completed: 102 },
      { year: 2022, allocated: 500, spent: 496, works_completed: 192 },
      { year: 2023, allocated: 500, spent: 491, works_completed: 188 },
    ],
    ladByCategory: [
      { category: "Education", amount: 542 },
      { category: "Health", amount: 488 },
      { category: "Drinking Water", amount: 312 },
      { category: "Sanitation", amount: 286 },
      { category: "Roads & Bridges", amount: 244 },
      { category: "Sports & Culture", amount: 102 },
    ],
    aiSummary:
      "One of the most active MPs by parliamentary participation — top quartile on questions and debates. Assets are stable to mildly growing, with ~98% MPLADS utilisation. Education and health dominate constituency spend.",
  }),

  mk("amit-shah", {
    name: "Amit Shah",
    party: "BJP",
    state: "Gujarat",
    constituency: "Gandhinagar",
    age: 61,
    education: "BSc, Biochemistry",
    criminalCases: 3,
    attendance: 78,
    questionsAsked: 0,
    debatesParticipated: 22,
    termsServed: 2,
    bio: "Union Home Minister and MP from Gandhinagar.",
    assets: [
      { year: 2014, movable: 21.8, immovable: 12.4, liabilities: 2.8 },
      { year: 2019, movable: 28.6, immovable: 11.2, liabilities: 0.9 },
      { year: 2024, movable: 41.2, immovable: 24.6, liabilities: 0 },
    ],
    promises: [
      { id: "p1", text: "Abrogation of Article 370", category: "Welfare", status: "fulfilled", year: 2019 },
      { id: "p2", text: "Citizenship Amendment Act rollout", category: "Welfare", status: "fulfilled", year: 2019 },
      { id: "p3", text: "All-India NRC", category: "Welfare", status: "broken", year: 2019 },
      { id: "p4", text: "Cooperative ministry formation", category: "Employment", status: "fulfilled", year: 2019 },
    ],
    ladByYear: [
      { year: 2019, allocated: 500, spent: 488, works_completed: 162 },
      { year: 2020, allocated: 250, spent: 241, works_completed: 79 },
      { year: 2021, allocated: 250, spent: 246, works_completed: 84 },
      { year: 2022, allocated: 500, spent: 492, works_completed: 158 },
      { year: 2023, allocated: 500, spent: 484, works_completed: 154 },
    ],
    ladByCategory: [
      { category: "Roads & Bridges", amount: 588 },
      { category: "Drinking Water", amount: 412 },
      { category: "Education", amount: 318 },
      { category: "Sanitation", amount: 246 },
      { category: "Health", amount: 224 },
      { category: "Electrification", amount: 162 },
    ],
    aiSummary:
      "Assets nearly doubled across two terms with liabilities cleared by 2024. Of 4 high-profile promises tracked, 3 are fulfilled and 1 (NRC) remains unimplemented. MPLADS utilisation is consistently above 96%.",
  }),

  mk("smriti-irani", {
    name: "Smriti Irani",
    party: "BJP",
    state: "Uttar Pradesh",
    constituency: "Amethi",
    age: 49,
    education: "Class XII",
    criminalCases: 0,
    attendance: 81,
    questionsAsked: 0,
    debatesParticipated: 18,
    termsServed: 1,
    bio: "Former Union Minister; MP from Amethi 2019–2024.",
    assets: [
      { year: 2014, movable: 4.6, immovable: 3.2, liabilities: 0.6 },
      { year: 2019, movable: 6.1, immovable: 4.4, liabilities: 0.4 },
      { year: 2024, movable: 8.8, immovable: 6.9, liabilities: 0.2 },
    ],
    promises: [
      { id: "p1", text: "AIIMS for Amethi", category: "Health", status: "in-progress", year: 2019 },
      { id: "p2", text: "Rifle factory revival", category: "Employment", status: "fulfilled", year: 2019 },
      { id: "p3", text: "Highway widening NH-731", category: "Infrastructure", status: "fulfilled", year: 2019 },
      { id: "p4", text: "Women's skill centres in every block", category: "Welfare", status: "in-progress", year: 2019 },
    ],
    ladByYear: [
      { year: 2019, allocated: 500, spent: 462, works_completed: 138 },
      { year: 2020, allocated: 250, spent: 228, works_completed: 71 },
      { year: 2021, allocated: 250, spent: 235, works_completed: 78 },
      { year: 2022, allocated: 500, spent: 478, works_completed: 144 },
      { year: 2023, allocated: 500, spent: 466, works_completed: 138 },
    ],
    ladByCategory: [
      { category: "Roads & Bridges", amount: 521 },
      { category: "Drinking Water", amount: 388 },
      { category: "Health", amount: 312 },
      { category: "Education", amount: 268 },
      { category: "Electrification", amount: 188 },
      { category: "Sanitation", amount: 154 },
    ],
    aiSummary:
      "Assets grew steadily with declining liabilities. MPLADS funds were heavily directed to roads and water infrastructure in rural Amethi. Two of four flagship promises delivered; AIIMS still under construction.",
  }),

  mk("mahua-moitra", {
    name: "Mahua Moitra",
    party: "TMC",
    state: "West Bengal",
    constituency: "Krishnanagar",
    age: 51,
    education: "BA, Mount Holyoke",
    criminalCases: 2,
    attendance: 92,
    questionsAsked: 471,
    debatesParticipated: 79,
    termsServed: 2,
    bio: "Former investment banker; outspoken parliamentarian from Krishnanagar.",
    assets: [
      { year: 2019, movable: 2.1, immovable: 0.8, liabilities: 0.2 },
      { year: 2024, movable: 3.4, immovable: 0.8, liabilities: 0.1 },
    ],
    promises: [
      { id: "p1", text: "Krishnanagar railway upgrade", category: "Infrastructure", status: "in-progress", year: 2019 },
      { id: "p2", text: "Block-level cold storage for farmers", category: "Welfare", status: "fulfilled", year: 2019 },
      { id: "p3", text: "Riverbank erosion plan for Bhagirathi", category: "Environment", status: "in-progress", year: 2019 },
    ],
    ladByYear: [
      { year: 2019, allocated: 500, spent: 458, works_completed: 154 },
      { year: 2020, allocated: 250, spent: 232, works_completed: 81 },
      { year: 2021, allocated: 250, spent: 244, works_completed: 88 },
      { year: 2022, allocated: 500, spent: 488, works_completed: 162 },
      { year: 2023, allocated: 500, spent: 471, works_completed: 156 },
    ],
    ladByCategory: [
      { category: "Drinking Water", amount: 488 },
      { category: "Roads & Bridges", amount: 412 },
      { category: "Education", amount: 322 },
      { category: "Health", amount: 268 },
      { category: "Sanitation", amount: 196 },
      { category: "Sports & Culture", amount: 108 },
    ],
    aiSummary:
      "Among the highest question-askers in the 17th Lok Sabha. Modest asset growth and consistently high MPLADS utilisation. Constituency spend skews towards rural water and roads.",
  }),

  mk("asaduddin-owaisi", {
    name: "Asaduddin Owaisi",
    party: "AIMIM",
    state: "Telangana",
    constituency: "Hyderabad",
    age: 56,
    education: "Barrister, Lincoln's Inn",
    criminalCases: 6,
    attendance: 95,
    questionsAsked: 415,
    debatesParticipated: 142,
    termsServed: 5,
    bio: "Five-term MP from Hyderabad and AIMIM president.",
    assets: [
      { year: 2009, movable: 5.2, immovable: 3.4, liabilities: 0.8 },
      { year: 2014, movable: 8.1, immovable: 4.2, liabilities: 0.6 },
      { year: 2019, movable: 11.4, immovable: 5.8, liabilities: 0.4 },
      { year: 2024, movable: 16.8, immovable: 7.2, liabilities: 0.3 },
    ],
    promises: [
      { id: "p1", text: "Old City Hyderabad metro extension", category: "Infrastructure", status: "in-progress", year: 2019 },
      { id: "p2", text: "Urdu-medium school upgrades", category: "Education", status: "fulfilled", year: 2019 },
      { id: "p3", text: "Musi river cleanup", category: "Environment", status: "broken", year: 2014 },
      { id: "p4", text: "OBC sub-categorisation push", category: "Welfare", status: "in-progress", year: 2019 },
    ],
    ladByYear: [
      { year: 2019, allocated: 500, spent: 495, works_completed: 198 },
      { year: 2020, allocated: 250, spent: 248, works_completed: 102 },
      { year: 2021, allocated: 250, spent: 249, works_completed: 108 },
      { year: 2022, allocated: 500, spent: 498, works_completed: 204 },
      { year: 2023, allocated: 500, spent: 494, works_completed: 196 },
    ],
    ladByCategory: [
      { category: "Education", amount: 612 },
      { category: "Health", amount: 488 },
      { category: "Drinking Water", amount: 322 },
      { category: "Sanitation", amount: 286 },
      { category: "Roads & Bridges", amount: 244 },
      { category: "Sports & Culture", amount: 138 },
    ],
    aiSummary:
      "Top decile on attendance, debates, and questions. MPLADS utilisation is essentially 99%, focused on Old City education and primary health centres. Assets tripled across four terms with falling liabilities.",
  }),

  mk("supriya-sule", {
    name: "Supriya Sule",
    party: "NCP-SP",
    state: "Maharashtra",
    constituency: "Baramati",
    age: 56,
    education: "BSc, Microbiology",
    criminalCases: 0,
    attendance: 94,
    questionsAsked: 304,
    debatesParticipated: 114,
    termsServed: 4,
    bio: "Four-term MP from Baramati and NCP (SP) working president.",
    assets: [
      { year: 2009, movable: 24.8, immovable: 18.1, liabilities: 2.4 },
      { year: 2014, movable: 38.4, immovable: 22.6, liabilities: 1.8 },
      { year: 2019, movable: 61.4, immovable: 28.9, liabilities: 1.1 },
      { year: 2024, movable: 102.3, immovable: 38.6, liabilities: 0.7 },
    ],
    promises: [
      { id: "p1", text: "Drought-proofing micro-irrigation", category: "Welfare", status: "fulfilled", year: 2019 },
      { id: "p2", text: "Pune-Baramati semi-high-speed rail", category: "Infrastructure", status: "in-progress", year: 2019 },
      { id: "p3", text: "Rural sanitation 100% coverage", category: "Health", status: "fulfilled", year: 2014 },
      { id: "p4", text: "Sugar cooperative reforms", category: "Employment", status: "in-progress", year: 2019 },
    ],
    ladByYear: [
      { year: 2019, allocated: 500, spent: 487, works_completed: 172 },
      { year: 2020, allocated: 250, spent: 244, works_completed: 88 },
      { year: 2021, allocated: 250, spent: 247, works_completed: 92 },
      { year: 2022, allocated: 500, spent: 493, works_completed: 174 },
      { year: 2023, allocated: 500, spent: 489, works_completed: 168 },
    ],
    ladByCategory: [
      { category: "Drinking Water", amount: 588 },
      { category: "Roads & Bridges", amount: 488 },
      { category: "Education", amount: 322 },
      { category: "Sanitation", amount: 268 },
      { category: "Health", amount: 246 },
      { category: "Electrification", amount: 168 },
    ],
    aiSummary:
      "Assets grew ~5x in 15 years, dominated by family agribusiness and equity holdings. Among the most parliamentary-active MPs by attendance and debate participation. MPLADS spend skews to rural water in drought-prone Baramati.",
  }),

  mk("kanimozhi", {
    name: "Kanimozhi Karunanidhi",
    party: "DMK",
    state: "Tamil Nadu",
    constituency: "Thoothukkudi",
    age: 57,
    education: "MA, English Literature",
    criminalCases: 1,
    attendance: 89,
    questionsAsked: 248,
    debatesParticipated: 96,
    termsServed: 2,
    bio: "Two-term Lok Sabha MP and DMK parliamentary deputy leader.",
    assets: [
      { year: 2019, movable: 25.4, immovable: 8.6, liabilities: 0.6 },
      { year: 2024, movable: 38.7, immovable: 12.1, liabilities: 0.3 },
    ],
    promises: [
      { id: "p1", text: "Sterlite plant permanent closure", category: "Environment", status: "fulfilled", year: 2019 },
      { id: "p2", text: "Tamil official language status push", category: "Welfare", status: "in-progress", year: 2019 },
      { id: "p3", text: "Fishermen welfare board upgrade", category: "Welfare", status: "fulfilled", year: 2019 },
    ],
    ladByYear: [
      { year: 2019, allocated: 500, spent: 478, works_completed: 156 },
      { year: 2020, allocated: 250, spent: 238, works_completed: 82 },
      { year: 2021, allocated: 250, spent: 246, works_completed: 89 },
      { year: 2022, allocated: 500, spent: 484, works_completed: 162 },
      { year: 2023, allocated: 500, spent: 472, works_completed: 154 },
    ],
    ladByCategory: [
      { category: "Health", amount: 488 },
      { category: "Drinking Water", amount: 412 },
      { category: "Education", amount: 388 },
      { category: "Roads & Bridges", amount: 286 },
      { category: "Sanitation", amount: 196 },
      { category: "Sports & Culture", amount: 124 },
    ],
    aiSummary:
      "Strong parliamentary record with ~96% MPLADS utilisation. Coastal Thoothukkudi spend prioritises health and water; Sterlite closure remains the headline fulfilled promise.",
  }),

  mk("akhilesh-yadav", {
    name: "Akhilesh Yadav",
    party: "SP",
    state: "Uttar Pradesh",
    constituency: "Kannauj",
    age: 53,
    education: "M.Eng, University of Sydney",
    criminalCases: 4,
    attendance: 64,
    questionsAsked: 18,
    debatesParticipated: 28,
    termsServed: 3,
    bio: "Former CM of Uttar Pradesh and SP president.",
    assets: [
      { year: 2009, movable: 12.4, immovable: 8.2, liabilities: 1.2 },
      { year: 2014, movable: 21.8, immovable: 14.6, liabilities: 0.8 },
      { year: 2019, movable: 22.4, immovable: 16.2, liabilities: 0.4 },
      { year: 2024, movable: 28.1, immovable: 21.4, liabilities: 0.2 },
    ],
    promises: [
      { id: "p1", text: "PDA (Pichhda-Dalit-Alpsankhyak) job quota", category: "Welfare", status: "in-progress", year: 2024 },
      { id: "p2", text: "Caste census in UP", category: "Welfare", status: "in-progress", year: 2024 },
      { id: "p3", text: "Lucknow metro Phase II support", category: "Infrastructure", status: "broken", year: 2019 },
    ],
    ladByYear: [
      { year: 2019, allocated: 500, spent: 388, works_completed: 102 },
      { year: 2020, allocated: 250, spent: 196, works_completed: 58 },
      { year: 2021, allocated: 250, spent: 211, works_completed: 64 },
      { year: 2022, allocated: 500, spent: 412, works_completed: 118 },
      { year: 2023, allocated: 500, spent: 394, works_completed: 108 },
    ],
    ladByCategory: [
      { category: "Roads & Bridges", amount: 488 },
      { category: "Education", amount: 388 },
      { category: "Drinking Water", amount: 312 },
      { category: "Electrification", amount: 224 },
      { category: "Health", amount: 168 },
      { category: "Sanitation", amount: 142 },
    ],
    aiSummary:
      "Below-average attendance and the lowest MPLADS utilisation in this cohort (~80%). Asset growth has slowed since 2019. Recent campaign promises around caste census and PDA quotas remain in early phases.",
  }),

  mk("tejasvi-surya", {
    name: "Tejasvi Surya",
    party: "BJP",
    state: "Karnataka",
    constituency: "Bangalore South",
    age: 35,
    education: "LLB, Bangalore",
    criminalCases: 1,
    attendance: 91,
    questionsAsked: 198,
    debatesParticipated: 64,
    termsServed: 2,
    bio: "Youngest BJP MP from Karnataka; second term from Bangalore South.",
    assets: [
      { year: 2019, movable: 0.42, immovable: 0, liabilities: 0.04 },
      { year: 2024, movable: 4.18, immovable: 0, liabilities: 0.18 },
    ],
    promises: [
      { id: "p1", text: "Bangalore suburban rail kickoff", category: "Infrastructure", status: "in-progress", year: 2019 },
      { id: "p2", text: "Lake rejuvenation in South Bangalore", category: "Environment", status: "in-progress", year: 2019 },
      { id: "p3", text: "Startup incubation in every ward", category: "Employment", status: "fulfilled", year: 2019 },
    ],
    ladByYear: [
      { year: 2019, allocated: 500, spent: 462, works_completed: 144 },
      { year: 2020, allocated: 250, spent: 234, works_completed: 76 },
      { year: 2021, allocated: 250, spent: 241, works_completed: 82 },
      { year: 2022, allocated: 500, spent: 478, works_completed: 152 },
      { year: 2023, allocated: 500, spent: 471, works_completed: 148 },
    ],
    ladByCategory: [
      { category: "Education", amount: 412 },
      { category: "Roads & Bridges", amount: 388 },
      { category: "Drinking Water", amount: 322 },
      { category: "Sanitation", amount: 286 },
      { category: "Sports & Culture", amount: 198 },
      { category: "Health", amount: 168 },
    ],
    aiSummary:
      "Assets jumped ~10x in one term, declared largely as professional income and equity. High parliamentary participation. Constituency spend tilts to urban education and roads.",
  }),

  mk("priyanka-chaturvedi", {
    name: "Priyanka Chaturvedi",
    party: "SS-UBT",
    state: "Maharashtra",
    constituency: "Mumbai (RS)",
    age: 46,
    education: "BCom, Mumbai",
    criminalCases: 0,
    attendance: 87,
    questionsAsked: 156,
    debatesParticipated: 88,
    termsServed: 1,
    bio: "Rajya Sabha MP and Shiv Sena (UBT) deputy leader.",
    assets: [
      { year: 2020, movable: 3.2, immovable: 4.6, liabilities: 0.4 },
      { year: 2024, movable: 5.8, immovable: 6.9, liabilities: 0.2 },
    ],
    promises: [
      { id: "p1", text: "Coastal road environmental review", category: "Environment", status: "in-progress", year: 2020 },
      { id: "p2", text: "Women's safety helpline expansion", category: "Welfare", status: "fulfilled", year: 2020 },
    ],
    ladByYear: [
      { year: 2020, allocated: 250, spent: 232, works_completed: 64 },
      { year: 2021, allocated: 250, spent: 244, works_completed: 71 },
      { year: 2022, allocated: 500, spent: 478, works_completed: 132 },
      { year: 2023, allocated: 500, spent: 471, works_completed: 128 },
    ],
    ladByCategory: [
      { category: "Education", amount: 388 },
      { category: "Health", amount: 322 },
      { category: "Sanitation", amount: 248 },
      { category: "Drinking Water", amount: 198 },
      { category: "Sports & Culture", amount: 142 },
      { category: "Other", amount: 124 },
    ],
    aiSummary:
      "Active first-term Rajya Sabha MP with focus on women's safety and coastal urban issues. MPLADS deployed largely on Mumbai municipal-school upgrades and primary health centres.",
  }),

  mk("manish-tewari", {
    name: "Manish Tewari",
    party: "INC",
    state: "Punjab",
    constituency: "Chandigarh",
    age: 60,
    education: "LLM, Punjab University",
    criminalCases: 2,
    attendance: 86,
    questionsAsked: 184,
    debatesParticipated: 102,
    termsServed: 3,
    bio: "Lawyer, former I&B Minister; current MP from Chandigarh.",
    assets: [
      { year: 2009, movable: 4.2, immovable: 6.4, liabilities: 0.4 },
      { year: 2014, movable: 6.8, immovable: 8.2, liabilities: 0.2 },
      { year: 2019, movable: 9.4, immovable: 11.6, liabilities: 0.1 },
      { year: 2024, movable: 14.2, immovable: 14.8, liabilities: 0 },
    ],
    promises: [
      { id: "p1", text: "Chandigarh statehood debate", category: "Welfare", status: "in-progress", year: 2024 },
      { id: "p2", text: "Heritage zoning for Sector 17", category: "Infrastructure", status: "fulfilled", year: 2024 },
    ],
    ladByYear: [
      { year: 2024, allocated: 500, spent: 248, works_completed: 72 },
    ],
    ladByCategory: [
      { category: "Roads & Bridges", amount: 88 },
      { category: "Education", amount: 64 },
      { category: "Health", amount: 48 },
      { category: "Drinking Water", amount: 42 },
      { category: "Sanitation", amount: 28 },
    ],
    aiSummary:
      "Returning MP with strong parliamentary participation. Asset growth steady and liabilities cleared. Current term still early — only one cycle of MPLADS spend recorded.",
  }),

  mk("dimple-yadav", {
    name: "Dimple Yadav",
    party: "SP",
    state: "Uttar Pradesh",
    constituency: "Mainpuri",
    age: 47,
    education: "BCom, Lucknow",
    criminalCases: 0,
    attendance: 76,
    questionsAsked: 88,
    debatesParticipated: 24,
    termsServed: 3,
    bio: "MP from Mainpuri; succeeded Mulayam Singh Yadav.",
    assets: [
      { year: 2014, movable: 8.1, immovable: 4.8, liabilities: 0.4 },
      { year: 2019, movable: 12.6, immovable: 6.4, liabilities: 0.2 },
      { year: 2024, movable: 18.2, immovable: 9.1, liabilities: 0.1 },
    ],
    promises: [
      { id: "p1", text: "Etawah lion safari expansion", category: "Welfare", status: "fulfilled", year: 2019 },
      { id: "p2", text: "Mainpuri district hospital upgrade", category: "Health", status: "in-progress", year: 2019 },
    ],
    ladByYear: [
      { year: 2019, allocated: 500, spent: 412, works_completed: 116 },
      { year: 2020, allocated: 250, spent: 198, works_completed: 58 },
      { year: 2021, allocated: 250, spent: 218, works_completed: 64 },
      { year: 2022, allocated: 500, spent: 422, works_completed: 124 },
      { year: 2023, allocated: 500, spent: 408, works_completed: 118 },
    ],
    ladByCategory: [
      { category: "Roads & Bridges", amount: 412 },
      { category: "Education", amount: 312 },
      { category: "Drinking Water", amount: 268 },
      { category: "Health", amount: 198 },
      { category: "Electrification", amount: 142 },
      { category: "Sanitation", amount: 124 },
    ],
    aiSummary:
      "Steady asset growth with minimal liabilities. Below-average parliamentary participation but reasonable MPLADS utilisation (~83%). Spend prioritises rural roads and primary education.",
  }),

  mk("sanjay-singh", {
    name: "Sanjay Singh",
    party: "AAP",
    state: "Delhi",
    constituency: "Delhi (RS)",
    age: 53,
    education: "BSc",
    criminalCases: 8,
    attendance: 68,
    questionsAsked: 142,
    debatesParticipated: 78,
    termsServed: 1,
    bio: "AAP Rajya Sabha MP and party national spokesperson.",
    assets: [
      { year: 2018, movable: 0.94, immovable: 0.42, liabilities: 0.18 },
      { year: 2024, movable: 1.86, immovable: 0.42, liabilities: 0.08 },
    ],
    promises: [
      { id: "p1", text: "Delhi statehood bill push", category: "Welfare", status: "in-progress", year: 2018 },
      { id: "p2", text: "Yamuna cleanup pressure", category: "Environment", status: "broken", year: 2018 },
    ],
    ladByYear: [
      { year: 2019, allocated: 500, spent: 422, works_completed: 132 },
      { year: 2020, allocated: 250, spent: 218, works_completed: 68 },
      { year: 2021, allocated: 250, spent: 232, works_completed: 74 },
      { year: 2022, allocated: 500, spent: 444, works_completed: 138 },
      { year: 2023, allocated: 500, spent: 388, works_completed: 124 },
    ],
    ladByCategory: [
      { category: "Education", amount: 488 },
      { category: "Health", amount: 388 },
      { category: "Sanitation", amount: 268 },
      { category: "Drinking Water", amount: 224 },
      { category: "Roads & Bridges", amount: 168 },
      { category: "Other", amount: 142 },
    ],
    aiSummary:
      "Modest declared assets relative to peers. Activity dipped in 2023 during incarceration; MPLADS utilisation fell to ~78%. Spend heavily skews to government school upgrades.",
  }),
  ...NEW_MPS_RAW.map((m) => mk(m.id, m as Omit<MP, "id" | "photo">)),
];

export const findMP = (id: string) => MPS.find((m) => m.id === id);

export const ALL_PARTIES = Array.from(new Set(MPS.map((m) => m.party))).sort();
export const ALL_STATES = Array.from(new Set(MPS.map((m) => m.state))).sort();

export const totalAssets = (a: AssetYear) => a.movable + a.immovable - a.liabilities;

export const assetGrowthPct = (mp: MP) => {
  if (mp.assets.length < 2) return 0;
  const first = totalAssets(mp.assets[0]);
  const last = totalAssets(mp.assets[mp.assets.length - 1]);
  if (first <= 0) return 0;
  return Math.round(((last - first) / first) * 100);
};

export const promiseStats = (mp: MP) => {
  const total = mp.promises.length || 1;
  const fulfilled = mp.promises.filter((p) => p.status === "fulfilled").length;
  const inProgress = mp.promises.filter((p) => p.status === "in-progress").length;
  const broken = mp.promises.filter((p) => p.status === "broken").length;
  return {
    total: mp.promises.length,
    fulfilled,
    inProgress,
    broken,
    fulfilledPct: Math.round((fulfilled / total) * 100),
  };
};

export const ladStats = (mp: MP) => {
  const allocated = mp.ladByYear.reduce((s, y) => s + y.allocated, 0);
  const spent = mp.ladByYear.reduce((s, y) => s + y.spent, 0);
  const works = mp.ladByYear.reduce((s, y) => s + y.works_completed, 0);
  return {
    allocated,
    spent,
    works,
    utilisation: allocated ? Math.round((spent / allocated) * 100) : 0,
  };
};
