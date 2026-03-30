// app/investors/data.ts
// Single source of truth for all investor page data.
// Shared between the web investor page and the print-ready business plan page.

/* ─── Comparable Films ─── */

export const ASPIRATIONAL_COMPS = [
  { title: 'I, TONYA', year: 2017, budget: '$11M', domestic: '$30M', worldwide: '$56M', roi: '408%' },
  { title: 'THREE BILLBOARDS', year: 2017, budget: '$15M', domestic: '$54M', worldwide: '$160M', roi: '967%' },
  { title: 'MONEYBALL', year: 2011, budget: '$50M', domestic: '$75.6M', worldwide: '$222.6M', roi: '345%' },
];

export const DIRECT_COMPS = [
  { title: 'THE FLORIDA PROJECT', year: 2017, budget: '$2M', domestic: '$5.9M', worldwide: '$10.8M', roi: '440%' },
  { title: 'THE BIG SICK', year: 2017, budget: '$5M', domestic: '$42.9M', worldwide: '$56.4M', roi: '1028%' },
  { title: 'CAPTAIN FANTASTIC', year: 2016, budget: '$5M', domestic: '$5.9M', worldwide: '$22.8M', roi: '356%' },
  { title: 'SHORT TERM 12', year: 2013, budget: '$1M', domestic: '$1.0M', worldwide: '$3.5M', roi: '250%' },
];

/* ─── Budget ─── */

export const BUDGET_TOTAL = '$2,339,676';
export const BUDGET_SHORTHAND = '$2.3M';
export const EQUITY_RAISE = '$1.7M';
export const TAX_CREDIT = '$600K';
export const ENTITY_NAME = 'Allentown Film Company';

export const BUDGET_BREAKDOWN = [
  { label: 'Above-The-Line (Script, Producers, Director, Cast)', amount: '$764K', detail: '$763,688' },
  { label: 'Production (Crew, Equipment, Locations)', amount: '$1.04M', detail: '$1,039,290' },
  { label: 'Post-Production (Editing, Sound, VFX, Music)', amount: '$268K', detail: '$268,000' },
  { label: 'Other (Insurance, Publicity, General)', amount: '$56K', detail: '$56,000' },
  { label: 'Contingency (10%)', amount: '$213K', detail: '$212,698' },
];

export const BUDGET_TOP_SHEET = [
  { category: 'Above-The-Line', total: '$763,688' },
  { category: 'Below-The-Line Production', total: '$1,039,290' },
  { category: 'Below-The-Line Post-Production', total: '$268,000' },
  { category: 'Below-The-Line Other', total: '$56,000' },
  { category: 'Total Above and Below-The-Line', total: '$2,126,978', bold: true },
  { category: 'Contingency (10%)', total: '$212,698' },
  { category: 'Grand Total', total: '$2,339,676', bold: true },
];

/* ─── Revenue / Scenarios ─── */

export const SCENARIOS = {
  conservative: {
    label: 'Conservative',
    premise: 'Film secures a modest streaming deal after limited festival play. No significant theatrical release. Moderate international sales.',
    revenue: [
      { source: 'Streaming Acquisition (Domestic)', amount: '$1.5M' },
      { source: 'Limited Theatrical', amount: '$0.3M' },
      { source: 'International Sales', amount: '$0.4M' },
      { source: 'VOD / Digital', amount: '$0.2M' },
      { source: 'Ancillary', amount: '$0.1M' },
    ],
    totalGross: '$2.5M',
    waterfall: {
      exhibitorShare: '$0.15M',
      distributorGross: '$2.35M',
      distributionFee: '$0.705M',
      pAndA: '$0.15M',
      salesAgent: '$0.048M',
      camFees: '$0.035M',
      netToProduction: '$1.41M',
      taxCredit: '$0.6M',
      availableForRecoupment: '$2.01M',
      recoupmentNeeded: '$2.04M',
      shortfall: '$0.03M',
      investorReturn: '~98.5% of 120% target',
    },
    outcome: 'Near-breakeven. Investor principal largely recovered.',
  },
  moderate: {
    label: 'Moderate',
    premise: 'Solid festival premiere (Sundance or TIFF), domestic all-rights deal with a mid-tier distributor, healthy international sales driven by Dane DeHaan\'s name recognition.',
    revenue: [
      { source: 'Domestic Distribution Deal', amount: '$3.0M' },
      { source: 'International Sales', amount: '$1.2M' },
      { source: 'VOD / Digital / TV Licensing', amount: '$0.5M' },
      { source: 'Ancillary', amount: '$0.3M' },
    ],
    totalGross: '$5.0M',
    waterfall: {
      exhibitorShare: '$0.5M',
      distributorGross: '$4.5M',
      distributionFee: '$1.35M',
      pAndA: '$0.3M',
      salesAgent: '$0.144M',
      camFees: '$0.068M',
      netToProduction: '$2.64M',
      taxCredit: '$0.6M',
      availableForRecoupment: '$3.24M',
      recoupmentNeeded: '$2.04M',
      deferredComp: '$0.085M',
      netProfits: '$1.115M',
      investorProfitShare: '$0.558M',
      producerProfitShare: '$0.558M',
      totalInvestorReturn: '$2.60M',
      investorROI: '~153%',
    },
    outcome: 'Strong return. Full 120% recoupment plus meaningful profit participation.',
  },
  optimistic: {
    label: 'Optimistic',
    premise: 'Festival breakout (Sundance premiere, acquisition bidding war), major platform deal, awards buzz, strong international sales.',
    revenue: [
      { source: 'Platform Acquisition / Domestic', amount: '$6.0M' },
      { source: 'International Sales', amount: '$2.5M' },
      { source: 'Limited Theatrical', amount: '$1.5M' },
      { source: 'VOD / Digital / TV', amount: '$0.8M' },
      { source: 'Ancillary', amount: '$0.5M' },
    ],
    totalGross: '$11.3M',
    waterfall: {
      exhibitorShare: '$0.75M',
      distributorGross: '$10.55M',
      distributionFee: '$3.165M',
      pAndA: '$0.5M',
      salesAgent: '$0.3M',
      camFees: '$0.158M',
      netToProduction: '$6.43M',
      taxCredit: '$0.6M',
      availableForRecoupment: '$7.03M',
      recoupmentNeeded: '$2.04M',
      deferredComp: '$0.085M',
      netProfits: '$4.9M',
      investorProfitShare: '$2.45M',
      producerProfitShare: '$2.45M',
      totalInvestorReturn: '$4.49M',
      investorROI: '~364%',
    },
    outcome: 'Exceptional return. Comparable to I, Tonya\'s investor performance at this budget level.',
  },
};

export const SENSITIVITY_MATRIX = [
  { grossRevenue: '$2.0M', netPlusTaxCredit: '~$1.8M', investorReturn: '~$1.7M', investorROI: '0%', note: 'Principal recovered' },
  { grossRevenue: '$3.0M', netPlusTaxCredit: '~$2.4M', investorReturn: '~$2.04M', investorROI: '20%', note: '120% recoupment hit' },
  { grossRevenue: '$5.0M', netPlusTaxCredit: '~$3.24M', investorReturn: '~$2.6M', investorROI: '53%', note: 'Moderate scenario' },
  { grossRevenue: '$8.0M', netPlusTaxCredit: '~$4.8M', investorReturn: '~$3.4M', investorROI: '100%', note: 'Strong performance' },
  { grossRevenue: '$11.3M', netPlusTaxCredit: '~$7.03M', investorReturn: '~$4.5M', investorROI: '164%', note: 'Optimistic scenario' },
];

export const WATERFALL_TIERS = [
  { tier: 1, label: 'Gross Receipts', description: 'All revenue from all sources (theatrical, streaming, VOD, international, ancillary)' },
  { tier: 2, label: 'Exhibitor / Platform Retention', description: 'Exhibitors retain ~50% of theatrical box office' },
  { tier: 3, label: 'Distribution Fees', description: '30% of distributor\'s gross' },
  { tier: 4, label: 'Distribution Expenses', description: 'P&A, marketing, deliverables, festival costs' },
  { tier: 5, label: 'Sales Agent Commission', description: '12% of international revenue' },
  { tier: 6, label: 'CAM Fees', description: '1.5% of gross receipts for independent revenue tracking' },
  { tier: 7, label: 'PA Tax Credit', description: '~$600K applied directly to accelerate investor recoupment' },
  { tier: 8, label: 'Investor Recoupment', description: '120% of invested capital returned (pari passu among investors)' },
  { tier: 9, label: 'Deferred Compensation', description: 'Producer and talent deferrals (~$85K+)' },
  { tier: 10, label: 'Net Profits Split', description: '50% investors / 50% Allentown Film Company' },
];

/* ─── Investment Terms ─── */

export const INVESTMENT_TERMS = {
  entity: 'Allentown Film Company, LLC',
  structure: 'Manager-managed LLC (producers retain creative and operational control)',
  preferredReturn: '120%',
  profitSplit: '50/50 (investors / production company)',
  taxCreditTreatment: 'Applied directly to accelerate investor recoupment (bypasses distribution waterfall)',
  revenueTimeline: '18-36 months post-delivery for full recoupment (moderate scenario)',
};

/* ─── Cast ─── */

export const CAST = [
  {
    name: 'Dane DeHaan',
    role: 'Ron Kistler',
    image: '/images/ron-kistler.webp',
    credits: 'Chronicle ($126M worldwide), The Amazing Spider-Man 2, Valerian and the City of a Thousand Planets, A Cure for Wellness, ZeroZeroZero',
    value: 'Internationally recognized name that elevates distribution value, drives streaming platform interest, and strengthens international pre-sale positioning.',
    status: 'Attached',
  },
  {
    name: 'Matt Wood',
    role: 'Mike Mackay',
    image: '/images/mike-mackay.webp',
    credits: 'Saturday Night (2024, directed by Jason Reitman, as John Belushi)',
    value: '',
    status: 'Attached',
  },
  {
    name: 'TBD',
    role: 'Dalton Young',
    image: '/images/dalton-young.webp',
    credits: '',
    value: '',
    status: 'Casting in progress',
  },
  {
    name: 'TBD',
    role: 'Harold Fulmer',
    image: '/images/harold-fulmer.webp',
    credits: '',
    value: '',
    status: 'Casting in progress',
  },
  {
    name: 'TBD',
    role: 'Matt Krasja',
    image: '/images/matt-krasja.webp',
    credits: '',
    value: '',
    status: 'Casting in progress',
  },
];

/* ─── Distribution ─── */

export const DISTRIBUTION_PHASES = [
  {
    phase: 'Phase 1',
    timeline: 'Q4 2027',
    title: 'Festival Premiere',
    description: 'Premiere at Sundance and TIFF, targeting awards buzz and acquisition deals, mirroring I, Tonya\'s path.',
  },
  {
    phase: 'Phase 2',
    timeline: 'Q2 2028',
    title: 'Limited Theatrical',
    description: 'Limited theatrical release (500 screens) in key markets (US, UK), leveraging housing crisis relevance.',
  },
  {
    phase: 'Phase 3',
    timeline: 'Q3 2028',
    title: 'Streaming & International',
    description: 'Streaming deals with Netflix/Amazon and international sales, capitalizing on the radio contest\'s global media frenzy.',
  },
];

export const REVENUE_WINDOWS = [
  { period: 'Months 1-6 post-completion', activity: 'Festival circuit' },
  { period: 'Months 6-12', activity: 'Theatrical release / platform acquisition' },
  { period: 'Months 12-18', activity: 'VOD/digital, international sales close' },
  { period: 'Months 18-36', activity: 'TV licensing, airline, ancillary' },
  { period: 'Ongoing', activity: 'Library / catalog streaming value' },
];

/* ─── Production Plan ─── */

export const PRODUCTION_PHASES = [
  {
    phase: 'Pre-Production',
    timeline: 'Q2-Q3 2026, 6 months',
    detail: 'Casting remaining roles, location scouting in Allentown, PA, securing Pennsylvania\'s 25-30% tax credit, crew hiring via Central PA Film Commission.',
  },
  {
    phase: 'Production',
    timeline: 'Q4 2026, 26-day shoot',
    detail: 'SAG Ultra Low Budget agreement, IATSE low-budget crew, billboard set as practical centerpiece, 1982 period setting across 25+ locations.',
  },
  {
    phase: 'Post-Production',
    timeline: 'Q1-Q2 2027, 6 months',
    detail: 'Editing, original score, sound design, visual effects, and festival submission preparation.',
  },
];

/* ─── Capital Stack ─── */

export const CAPITAL_STACK = [
  { source: 'Equity Investors', amount: '~$1.7M', percent: '~73%', notes: 'Accredited investors, LLC membership units' },
  { source: 'PA Film Tax Credit', amount: '~$600K', percent: '~26%', notes: '25-30% of qualified PA spend, transferable' },
  { source: 'Deferred Compensation', amount: '~$85K+', percent: '~4%', notes: 'EP fees + partial writer/director' },
];

/* ─── Team ─── */

export const TEAM_MEMBERS = [
  {
    role: 'PRODUCER',
    name: 'Gary Foster',
    image: '/images/gary-foster.webp',
    bio: 'President of Krasnoff/Foster Entertainment with 40+ years in the industry. Most recently produced Bedford Park (2026 Sundance, Special Jury Award, acquired by Sony Pictures Classics) and Finestkind (2023, Paramount+, starring Jenna Ortega and Tommy Lee Jones). Earlier credits include Denial (2016, BAFTA nominated, starring Rachel Weisz), Community (TV series), Daredevil, Elektra, and Ghost Rider for Marvel, and the Oscar-nominated Sleepless in Seattle ($300M+ worldwide).',
  },
  {
    role: 'DIRECTOR / CO-WRITER',
    name: 'Ze\'ev Waismann',
    image: '/images/zev-waismann.webp',
    bio: 'Accomplished commercial director with over a decade of expertise, delivering a bold vision blending gritty realism with heartfelt storytelling.',
  },
  {
    role: 'WRITER',
    name: 'Conrad Sylvia',
    image: '/images/conrad-sylvia.webp',
    bio: 'A TV veteran who crafts compelling, moving scripts.',
  },
  {
    role: 'WRITER',
    name: 'Pat Taggart',
    image: '/images/pat-taggart.webp',
    bio: 'An Allentown native, rooting the script in his hometown\'s authenticity.',
  },
  {
    role: 'EXECUTIVE PRODUCER',
    name: 'Roberto Alcazar',
    image: '/images/roberto-alcazar.webp',
    bio: 'International experience ensuring operational excellence, streamlining the $2.3M production.',
  },
  {
    role: 'EXECUTIVE PRODUCER',
    name: 'Pilar de Posadas',
    image: '/images/pilar-de-posadas.webp',
    bio: 'Global market expert, securing worldwide distribution and maximizing appeal for streaming and international sales.',
  },
];

/* ─── Downloads ─── */

export const DOCUMENTS = [
  {
    title: 'Business Plan',
    description: 'Full investor business plan - financial projections, waterfall, terms',
    href: '/investors/business-plan',
    type: 'LINK' as const,
  },
  {
    title: 'Screenplay',
    description: 'Revised draft by Pat Taggart, Conrad Sylvia, and Ze\'ev Waismann',
    href: '/docs/ALLENTOWN_Script.pdf',
    type: 'PDF' as const,
  },
  {
    title: 'Pitch Deck',
    description: 'Visual treatment, logline, story overview, and creative vision',
    href: 'https://indd.adobe.com/view/582021df-5e82-4974-98a7-f9d574890a39',
    type: 'LINK' as const,
  },
  {
    title: 'Billboard Boys Documentary',
    description: 'The original documentary on the Allentown billboard sitters',
    href: 'https://vimeo.com/user48884984/review/232709722/f0ab22adb9',
    type: 'LINK' as const,
  },
  {
    title: 'Budget Assumptions',
    description: 'Production budget preamble, assumptions, and methodology',
    href: '/docs/ALLENTOWN_Budget_Preamble.pdf',
    type: 'PDF' as const,
  },
  {
    title: 'Production Budget',
    description: 'Full production budget breakdown - $2.3M, 26 shoot days',
    href: '/docs/ALLENTOWN_Production_Budget.pdf',
    type: 'PDF' as const,
  },
];

export const CONTACTS = [
  { role: 'PRODUCER', name: 'Gary Foster', phone: '+1 (508) 292 5752', email: 'gsfhorse@mac.com' },
  { role: 'EXECUTIVE PRODUCER', name: 'Roberto Alcazar', phone: '+1 (646) 346 9213', email: 'alcazar@eointegration.com' },
  { role: 'EXECUTIVE PRODUCER', name: 'Pilar De Posadas', phone: '+1 (310) 740 5530', email: 'pposadas@scenicrights.com' },
];

/* ─── Risk Factors ─── */

export const RISK_FACTORS = [
  { title: 'Market Risk', description: 'The film industry is inherently speculative. There is no guarantee of commercial success regardless of the quality of the film, cast, or marketing.' },
  { title: 'Completion Risk', description: 'The film may exceed its budget or schedule. Mitigated by 10% contingency ($213K) and an experienced production team with a proven track record.' },
  { title: 'Distribution Risk', description: 'There is no distribution agreement in place. The film may not secure theatrical, streaming, or international distribution on favorable terms, or at all.' },
  { title: 'Cast Risk', description: 'Attached cast may become unavailable due to scheduling, health, or other factors. Replacement could affect the film\'s market value.' },
  { title: 'Tax Credit Risk', description: 'PA Film Tax Credit is subject to state legislative approval and annual funding caps. Credit may not be awarded, or may be awarded at a reduced rate.' },
  { title: 'Festival Risk', description: 'There is no guarantee of acceptance to any specific film festival. Festival strategy is aspirational, not confirmed.' },
  { title: 'Revenue Timing', description: 'Returns to investors are dependent on distribution timelines and may take 18-36+ months after the film\'s completion.' },
  { title: 'Illiquidity', description: 'LLC membership units are not publicly traded and cannot be easily sold or transferred. Investment should be considered long-term and illiquid.' },
  { title: 'Competition', description: 'The indie film market is highly competitive. Multiple films compete for limited festival slots, distribution deals, and audience attention.' },
];
