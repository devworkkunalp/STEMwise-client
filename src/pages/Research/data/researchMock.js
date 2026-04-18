/**
 * STEMwise Research Hub Mock Data
 * Values extracted from STEMwise_Research_Hub_Complete.html
 */

export const FUNDING_SOURCES = [
  {
    type: 'Non-Collateral (Private)',
    lenders: 'Prodigy, MPOWER, Discover',
    rate: '11.5% - 14.5%',
    pros: 'No assets required, Fast processing',
    cons: 'High interest, Higher processing fees'
  },
  {
    type: 'Collateral (Public)',
    lenders: 'SBI, BOB, PNB',
    rate: '9.2% - 10.5%',
    pros: 'Lowest interest rates, Tax benefits',
    cons: 'Property required, Long lead time (4-6 weeks)'
  },
  {
    type: 'Family/Savings',
    lenders: 'Self-Funded',
    rate: '0%',
    pros: 'Zero interest, No debt burden',
    cons: 'Opportunity cost of capital, Currency risk'
  }
];

export const FAILURE_SCENARIOS = [
  {
    id: 'job-delay',
    title: 'The 6-Month Hiring Lag',
    impact: '-$58,000 ROI Impact',
    desc: 'Average tech hiring cycles can take 4-6 months. During this gap, your loan interest accrues daily while you burn personal savings on rent.',
    stat: '42% of 2023 grads took >5 months to land a role.',
    color: 'var(--amber)'
  },
  {
    id: 'h1b-fail',
    title: 'Lottery Rejection (The Exit)',
    impact: 'Mandatory Departure',
    desc: 'If your H-1B isn\'t picked within 3 years, you must leave the USA. You will be paying back a USD loan with home-country currency (e.g. INR), which is 5x harder.',
    stat: 'H-1B selection rate was ~25% in the last cycle.',
    color: 'var(--coral)'
  },
  {
    id: 'market-drop',
    title: 'Market Salary Correction',
    impact: '-20% Monthly Cashflow',
    desc: 'Recessions or AI automation can suppress entry-level wages. A $10,000 drop in starting salary increases your payback time by 2.4 years.',
    stat: 'Entry level software wages fell 7% in early 2024.',
    color: 'var(--white)'
  }
];

export const STEM_SECTORS = [
  {
    id: 'cs',
    name: 'Computer Science / AI',
    subTitle: 'SWE · ML · Systems · Distributed Computing',
    icon: '💻',
    medianSalary: 118000,
    bottom25Salary: 82000,
    employmentRate: 87,
    h1bSuccess: 48,
    loanDefault: 3.1,
    roiScore: 82,
    badges: ['STEM OPT ✓', 'High Demand', 'H-1B Risk'],
    color: 'sc1',
    outcomes: [
      { label: 'Employed in USA', value: 91, subLabel: 'Within 6 months of OPT', color: 'var(--teal)' },
      { label: 'H-1B Approved', value: 48, subLabel: 'Wage-based Level II+', color: 'var(--amber)' },
      { label: 'Returned Home', value: 9, subLabel: 'Voluntary or H-1B denied', color: 'var(--coral)' }
    ],
    salaryDistribution: [
      { tier: 'Top 10%', salary: 172000, percentage: 90 },
      { tier: 'Top 25%', salary: 142000, percentage: 75 },
      { tier: 'Median', salary: 118000, percentage: 50 },
      { tier: 'Bottom 25%', salary: 82000, percentage: 25 },
      { tier: 'Bottom 10%', salary: 64000, percentage: 10 }
    ],
    countryAlternatives: [
      { country: 'United States', flag: '🇺🇸', salary: 118000, prMetric: 'Hard (10+ yr)', visaEase: 'Difficult', score: 82 },
      { country: 'Germany', flag: '🇩🇪', salary: 72000, prMetric: 'Easy (21 mo)', visaEase: 'Smooth', score: 78 },
      { country: 'Canada', flag: '🇨🇦', salary: 84000, prMetric: 'Direct (PR)', visaEase: 'Moderate', score: 75 },
      { country: 'Australia', flag: '🇦🇺', salary: 88000, prMetric: 'Points Based', visaEase: 'Moderate', score: 72 },
      { country: 'United Kingdom', flag: '🇬🇧', salary: 68000, prMetric: '5 Year Path', visaEase: 'Difficult', score: 65 }
    ]
  },
  {
    id: 'cyber',
    name: 'Cybersecurity',
    subTitle: 'Network Sec · Cloud · Pen Testing · Compliance',
    icon: '🛡️',
    medianSalary: 115000,
    bottom25Salary: 87000,
    employmentRate: 91,
    h1bSuccess: 55,
    loanDefault: 2.8,
    roiScore: 79,
    badges: ['Lowest Default', 'Top Employment'],
    color: 'sc4',
    outcomes: [
      { label: 'Employed in USA', value: 94, subLabel: 'Within 6 months of OPT', color: 'var(--teal)' },
      { label: 'H-1B Approved', value: 55, subLabel: 'High eligibility for Level III', color: 'var(--amber)' },
      { label: 'Returned Home', value: 6, subLabel: 'Voluntary departure', color: 'var(--coral)' }
    ],
    salaryDistribution: [
      { tier: 'Top 10%', salary: 162000, percentage: 90 },
      { tier: 'Top 25%', salary: 138000, percentage: 75 },
      { tier: 'Median', salary: 115000, percentage: 50 },
      { tier: 'Bottom 25%', salary: 87000, percentage: 25 },
      { tier: 'Bottom 10%', salary: 72000, percentage: 10 }
    ],
    countryAlternatives: [
      { country: 'United States', flag: '🇺🇸', salary: 115000, prMetric: 'Hard (10+ yr)', visaEase: 'Difficult', score: 79 },
      { country: 'Netherlands', flag: '🇳🇱', salary: 78000, prMetric: 'Easy (5 yr)', visaEase: 'Smooth', score: 81 },
      { country: 'Israel', flag: '🇮🇱', salary: 92000, prMetric: 'Moderate', visaEase: 'Moderate', score: 76 }
    ]
  },
  {
    id: 'data',
    name: 'Data Science / Analytics',
    subTitle: 'Stats · BI · Data Engineering · MLOps',
    icon: '📊',
    medianSalary: 112000,
    bottom25Salary: 78000,
    employmentRate: 84,
    h1bSuccess: 45,
    loanDefault: 3.8,
    roiScore: 78,
    badges: ['Growing Fast', 'STEM OPT ✓'],
    color: 'sc2',
    outcomes: [
      { label: 'Employed in USA', value: 88, subLabel: 'Within 6 months of OPT', color: 'var(--teal)' },
      { label: 'H-1B Approved', value: 45, subLabel: 'High competition area', color: 'var(--amber)' },
      { label: 'Returned Home', value: 12, subLabel: 'Visa/Market expiry', color: 'var(--coral)' }
    ],
    salaryDistribution: [
      { tier: 'Top 10%', salary: 168000, percentage: 90 },
      { tier: 'Top 25%', salary: 135000, percentage: 75 },
      { tier: 'Median', salary: 112000, percentage: 50 },
      { tier: 'Bottom 25%', salary: 78000, percentage: 25 },
      { tier: 'Bottom 10%', salary: 62000, percentage: 10 }
    ],
    countryAlternatives: [
      { country: 'United States', flag: '🇺🇸', salary: 112000, prMetric: 'Hard (10+ yr)', visaEase: 'Difficult', score: 78 },
      { country: 'Switzerland', flag: '🇨🇭', salary: 105000, prMetric: 'Direct (B-Permit)', visaEase: 'Hard', score: 84 },
      { country: 'Singapore', flag: '🇸🇬', salary: 88000, prMetric: 'Easy (2 yr)', visaEase: 'Smooth', score: 80 }
    ]
  },
  {
    id: 'ee',
    name: 'Electrical Engineering',
    subTitle: 'Semiconductors · Embedded · Power · Circuits',
    icon: '⚡',
    medianSalary: 105000,
    bottom25Salary: 76000,
    employmentRate: 82,
    h1bSuccess: 52,
    loanDefault: 4.2,
    roiScore: 71,
    badges: ['Semi Boom ↑'],
    color: 'sc3',
    outcomes: [
      { label: 'Employed in USA', value: 85, subLabel: 'Hardware/Design roles', color: 'var(--teal)' },
      { label: 'H-1B Approved', value: 52, subLabel: 'O-1 potential in semis', color: 'var(--amber)' },
      { label: 'Returned Home', value: 15, subLabel: 'High manufacturing bar', color: 'var(--coral)' }
    ],
    salaryDistribution: [
      { tier: 'Top 10%', salary: 155000, percentage: 90 },
      { tier: 'Top 25%', salary: 128000, percentage: 75 },
      { tier: 'Median', salary: 105000, percentage: 50 },
      { tier: 'Bottom 25%', salary: 76000, percentage: 25 },
      { tier: 'Bottom 10%', salary: 58000, percentage: 10 }
    ],
    countryAlternatives: [
      { country: 'United States', flag: '🇺🇸', salary: 105000, prMetric: 'Hard (10+ yr)', visaEase: 'Difficult', score: 71 },
      { country: 'Taiwan', flag: '🇹🇼', salary: 65000, prMetric: 'Moderate', visaEase: 'Smooth', score: 88 },
      { country: 'Japan', flag: '🇯🇵', salary: 72000, prMetric: 'Fast Path (Points)', visaEase: 'Moderate', score: 75 }
    ]
  },
  {
    id: 'biomed',
    name: 'Biomedical Sciences',
    subTitle: 'Genomics · Medical Devices · Clinical Research',
    icon: '🧬',
    medianSalary: 88000,
    bottom25Salary: 58000,
    employmentRate: 72,
    h1bSuccess: 15,
    loanDefault: 7.2,
    roiScore: 52,
    badges: ['High H-1B Risk', 'Lower Salary'],
    color: 'sc5',
    outcomes: [
      { label: 'Employed in USA', value: 75, subLabel: 'Post-doc or Med-tech', color: 'var(--teal)' },
      { label: 'H-1B Approved', value: 15, subLabel: 'Cap-exempt potential', color: 'var(--amber)' },
      { label: 'Returned Home', value: 25, subLabel: 'High visa rejection', color: 'var(--coral)' }
    ],
    salaryDistribution: [
      { tier: 'Top 10%', salary: 132000, percentage: 90 },
      { tier: 'Top 25%', salary: 105000, percentage: 75 },
      { tier: 'Median', salary: 88000, percentage: 50 },
      { tier: 'Bottom 25%', salary: 58000, percentage: 25 },
      { tier: 'Bottom 10%', salary: 48000, percentage: 10 }
    ],
    countryAlternatives: [
      { country: 'United States', flag: '🇺🇸', salary: 88000, prMetric: 'Hard (10+ yr)', visaEase: 'Difficult', score: 52 },
      { country: 'Germany', flag: '🇩🇪', salary: 68000, prMetric: 'Easy (5 yr)', visaEase: 'Smooth', score: 72 },
      { country: 'UK', flag: '🇬🇧', salary: 62000, prMetric: 'Points (H&C)', visaEase: 'Moderate', score: 68 }
    ]
  },
  {
    id: 'mech',
    name: 'Mechanical Engineering',
    subTitle: 'Manufacturing · Robotics · Automotive · Aerospace',
    icon: '⚙️',
    medianSalary: 95000,
    bottom25Salary: 68000,
    employmentRate: 78,
    h1bSuccess: 42,
    loanDefault: 5.6,
    roiScore: 62,
    badges: ['Stable Demand'],
    color: 'sc6',
    outcomes: [
      { label: 'Employed in USA', value: 82, subLabel: 'Manufacturing/Automotive', color: 'var(--teal)' },
      { label: 'H-1B Approved', value: 42, subLabel: 'Direct-hire scarcity', color: 'var(--amber)' },
      { label: 'Returned Home', value: 18, subLabel: 'Market/Visa mismatch', color: 'var(--coral)' }
    ],
    salaryDistribution: [
      { tier: 'Top 10%', salary: 142000, percentage: 90 },
      { tier: 'Top 25%', salary: 118000, percentage: 75 },
      { tier: 'Median', salary: 95000, percentage: 50 },
      { tier: 'Bottom 25%', salary: 68000, percentage: 25 },
      { tier: 'Bottom 10%', salary: 56000, percentage: 10 }
    ],
    countryAlternatives: [
      { country: 'United States', flag: '🇺🇸', salary: 95000, prMetric: 'Hard (10+ yr)', visaEase: 'Difficult', score: 62 },
      { country: 'Germany', flag: '🇩🇪', salary: 76000, prMetric: 'Fast Path', visaEase: 'Smooth', score: 85 },
      { country: 'Australia', flag: '🇦🇺', salary: 92000, prMetric: 'PR Eligible', visaEase: 'Moderate', score: 78 }
    ]
  }
];

export const UNIVERSITIES = [
  {
    rank: 1,
    name: 'Carnegie Mellon University',
    location: 'Pittsburgh, PA',
    tuition: 58000,
    sectorId: 'cs',
    salary: 127000,
    h1bRate: 72,
    employment: 93,
    defaultRate: 2.1,
    payback: 2.9,
    score: 94,
    bestFor: 'Best Overall'
  },
  {
    rank: 2,
    name: 'Georgia Tech',
    location: 'Atlanta, GA',
    tuition: 29000,
    sectorId: 'cs',
    salary: 115000,
    h1bRate: 68,
    employment: 91,
    defaultRate: 2.4,
    payback: 2.1,
    score: 91,
    bestFor: 'Best Value'
  },
  {
    rank: 3,
    name: 'UIUC — University of Illinois',
    location: 'Urbana-Champaign, IL',
    tuition: 34000,
    sectorId: 'cs',
    salary: 118000,
    h1bRate: 63,
    employment: 88,
    defaultRate: 2.6,
    payback: 2.4,
    score: 86
  },
  {
    rank: 6,
    name: 'Columbia University',
    location: 'New York, NY',
    tuition: 64000,
    sectorId: 'cs',
    salary: 122000,
    h1bRate: 60,
    employment: 85,
    defaultRate: 5.2,
    payback: 3.8,
    score: 74,
    warning: 'High Default'
  },
  {
    rank: 8,
    name: 'NYU Tandon',
    location: 'Brooklyn, NY',
    tuition: 48000,
    sectorId: 'cs',
    salary: 98000,
    h1bRate: 44,
    employment: 78,
    defaultRate: 8.1,
    payback: 4.5,
    score: 58,
    warning: 'Risky ROI'
  }
];

export const PROGRAMS = [
  {
    id: 'mscs',
    universityId: 'cmu',
    name: 'MS Computer Science',
    duration: '2yr',
    salary: 127000,
    employment: 93,
    h1bRate: 72,
    tuition: 58000,
    payback: 2.9,
    defaultRate: 2.1,
    score: 82,
    badges: ['STEM OPT ✓', 'Top Demand', 'Best Default']
  },
  {
    id: 'msml',
    universityId: 'cmu',
    name: 'MS Machine Learning',
    duration: '1.5yr',
    salary: 145000,
    employment: 91,
    h1bRate: 68,
    tuition: 62000,
    payback: 2.4,
    defaultRate: 1.8,
    score: 85,
    badges: ['STEM OPT ✓', 'Specialized']
  },
  {
    id: 'msis',
    universityId: 'cmu',
    name: 'MS Information Systems',
    duration: '2yr',
    salary: 92000,
    employment: 81,
    h1bRate: 38,
    tuition: 54000,
    payback: 4.8,
    defaultRate: 7.8,
    score: 58,
    badges: ['Lower ROI', 'High Default 7.8%'],
    warning: 'High Default'
  }
];
