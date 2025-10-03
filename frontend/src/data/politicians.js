// ALL your politician data goes here
export const politicians = [
  {
    name: "Narendra Modi",
    party: "BJP",
    constituency: "Varanasi, UP",
    education: "Post Graduate",
    photo: "https://via.placeholder.com/120",
    totalAssets: 2.51, 
    liabilities: 0.0,
    casesPending: 0,
    timeline: [
      { year: 2007, netWorth: 0.43 },
      { year: 2012, netWorth: 1.33 },
      { year: 2014, netWorth: 1.66 },
      { year: 2019, netWorth: 2.51 },
    ],
    assetDistribution: [
      { name: "Immovable", value: 40 }, 
      { name: "Deposits/Cash", value: 50 }, 
      { name: "Bonds/NSS", value: 10 },
    ],
  },
  {
    name: "Sanjay Prasad Yadav",
    party: "RJD",
    constituency: "Godda, Jharkhand",
    education: "12th Pass",
    photo: "https://via.placeholder.com/120",
    totalAssets: 29.60,
    liabilities: 9.68,
    casesPending: 6,
    timeline: [
      { year: 2009, netWorth: 1.47 },
      { year: 2014, netWorth: 5.84 },
      { year: 2019, netWorth: 14.68 },
      { year: 2024, netWorth: 29.60 },
    ],
    assetDistribution: [
      { name: "Vehicles/Machinery", value: 45 },
      { name: "Immovable", value: 30 },
      { name: "Deposits/Cash", value: 25 },
    ],
  },
  // ... ADD ALL YOUR OTHER POLITICIANS HERE
];

export const parties = ["All", "BJP", "INC", "RJD", "AAP", "SP", "JMM", "YSRCP", "NCP"];