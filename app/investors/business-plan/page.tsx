'use client';

import Link from 'next/link';
import './print.css';

import {
  ASPIRATIONAL_COMPS,
  DIRECT_COMPS,
  BUDGET_TOTAL,
  BUDGET_SHORTHAND,
  EQUITY_RAISE,
  TAX_CREDIT,
  ENTITY_NAME,
  BUDGET_TOP_SHEET,
  SCENARIOS,
  SENSITIVITY_MATRIX,
  WATERFALL_TIERS,
  INVESTMENT_TERMS,
  CAST,
  DISTRIBUTION_PHASES,
  REVENUE_WINDOWS,
  PRODUCTION_PHASES,
  CAPITAL_STACK,
  TEAM_MEMBERS,
  RISK_FACTORS,
} from '../data';

/* ─── Types ─── */

type ScenarioKey = 'conservative' | 'moderate' | 'optimistic';

/* ─── Helper: format scenario waterfall rows ─── */

function WaterfallTableConservative() {
  const w = SCENARIOS.conservative.waterfall;
  return (
    <table className="bp-table avoid-break">
      <thead>
        <tr>
          <th>Waterfall Step</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Exhibitor / Platform Retention</td><td>{w.exhibitorShare}</td></tr>
        <tr><td>Distributor Gross</td><td>{w.distributorGross}</td></tr>
        <tr><td>Distribution Fee (30%)</td><td>({w.distributionFee})</td></tr>
        <tr><td>P&amp;A / Marketing</td><td>({w.pAndA})</td></tr>
        <tr><td>Sales Agent Commission</td><td>({w.salesAgent})</td></tr>
        <tr><td>CAM Fees</td><td>({w.camFees})</td></tr>
        <tr className="bold-row"><td>Net to Production</td><td>{w.netToProduction}</td></tr>
        <tr><td>PA Film Tax Credit</td><td>+ {w.taxCredit}</td></tr>
        <tr className="bold-row"><td>Available for Recoupment</td><td>{w.availableForRecoupment}</td></tr>
        <tr><td>Recoupment Needed (120%)</td><td>{w.recoupmentNeeded}</td></tr>
        <tr className="bold-row"><td>Investor Return</td><td>{w.investorReturn}</td></tr>
      </tbody>
    </table>
  );
}

function WaterfallTableModerate() {
  const w = SCENARIOS.moderate.waterfall;
  return (
    <table className="bp-table avoid-break">
      <thead>
        <tr>
          <th>Waterfall Step</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Exhibitor / Platform Retention</td><td>{w.exhibitorShare}</td></tr>
        <tr><td>Distributor Gross</td><td>{w.distributorGross}</td></tr>
        <tr><td>Distribution Fee (30%)</td><td>({w.distributionFee})</td></tr>
        <tr><td>P&amp;A / Marketing</td><td>({w.pAndA})</td></tr>
        <tr><td>Sales Agent Commission</td><td>({w.salesAgent})</td></tr>
        <tr><td>CAM Fees</td><td>({w.camFees})</td></tr>
        <tr className="bold-row"><td>Net to Production</td><td>{w.netToProduction}</td></tr>
        <tr><td>PA Film Tax Credit</td><td>+ {w.taxCredit}</td></tr>
        <tr className="bold-row"><td>Available for Recoupment</td><td>{w.availableForRecoupment}</td></tr>
        <tr><td>Investor Recoupment (120%)</td><td>{w.recoupmentNeeded}</td></tr>
        <tr><td>Deferred Compensation</td><td>({w.deferredComp})</td></tr>
        <tr><td>Net Profits</td><td>{w.netProfits}</td></tr>
        <tr><td>Investor Profit Share (50%)</td><td>{w.investorProfitShare}</td></tr>
        <tr><td>Producer Profit Share (50%)</td><td>{w.producerProfitShare}</td></tr>
        <tr className="bold-row"><td>Total Investor Return</td><td>{w.totalInvestorReturn} ({w.investorROI})</td></tr>
      </tbody>
    </table>
  );
}

function WaterfallTableOptimistic() {
  const w = SCENARIOS.optimistic.waterfall;
  return (
    <table className="bp-table avoid-break">
      <thead>
        <tr>
          <th>Waterfall Step</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Exhibitor / Platform Retention</td><td>{w.exhibitorShare}</td></tr>
        <tr><td>Distributor Gross</td><td>{w.distributorGross}</td></tr>
        <tr><td>Distribution Fee (30%)</td><td>({w.distributionFee})</td></tr>
        <tr><td>P&amp;A / Marketing</td><td>({w.pAndA})</td></tr>
        <tr><td>Sales Agent Commission</td><td>({w.salesAgent})</td></tr>
        <tr><td>CAM Fees</td><td>({w.camFees})</td></tr>
        <tr className="bold-row"><td>Net to Production</td><td>{w.netToProduction}</td></tr>
        <tr><td>PA Film Tax Credit</td><td>+ {w.taxCredit}</td></tr>
        <tr className="bold-row"><td>Available for Recoupment</td><td>{w.availableForRecoupment}</td></tr>
        <tr><td>Investor Recoupment (120%)</td><td>{w.recoupmentNeeded}</td></tr>
        <tr><td>Deferred Compensation</td><td>({w.deferredComp})</td></tr>
        <tr><td>Net Profits</td><td>{w.netProfits}</td></tr>
        <tr><td>Investor Profit Share (50%)</td><td>{w.investorProfitShare}</td></tr>
        <tr><td>Producer Profit Share (50%)</td><td>{w.producerProfitShare}</td></tr>
        <tr className="bold-row"><td>Total Investor Return</td><td>{w.totalInvestorReturn} ({w.investorROI})</td></tr>
      </tbody>
    </table>
  );
}

/* ─── Main Component ─── */

export default function BusinessPlanPage() {
  return (
    <div className="bp-page">

      {/* Print / Nav bar */}
      <div className="bp-print-bar no-print">
        <Link href="/investors" className="bp-back-link">
          &larr; Back to Investor Page
        </Link>
        <button
          className="bp-print-btn"
          onClick={() => window.print()}
        >
          Print / Save as PDF
        </button>
      </div>

      {/* ─── SECTION 1: COVER PAGE ─── */}
      <div className="bp-section bp-cover avoid-break">
        <div className="bp-h1">ALLENTOWN</div>
        <div className="bp-divider"></div>
        <div className="bp-cover-subtitle">A Business Plan for Investors</div>
        <div className="bp-cover-entity">{ENTITY_NAME}</div>
        <div className="bp-cover-entity">info@allentownfilm.com</div>
        <div className="bp-cover-confidential">Confidential</div>
        <div className="bp-cover-date">Prepared: March 2026</div>
      </div>

      <div className="page-break"></div>

      {/* ─── SECTION 2: TABLE OF CONTENTS ─── */}
      <div className="bp-section">
        <div className="bp-section-header">
          <div className="bp-h2">Table of Contents</div>
        </div>
        <ul className="bp-toc-list">
          {[
            { num: '01', title: 'Executive Summary', desc: 'The ask, the opportunity, projected returns' },
            { num: '02', title: 'The Film', desc: 'Logline, synopsis, genre positioning' },
            { num: '03', title: 'Cast', desc: 'Attached talent and market value' },
            { num: '04', title: 'The Filmmakers', desc: 'Producer, director, writers, EPs' },
            { num: '05', title: 'Comparable Films', desc: 'Aspirational and direct budget comps' },
            { num: '06', title: 'Market Analysis', desc: 'Genre trends, streaming appetite, audience' },
            { num: '07', title: 'Distribution Strategy', desc: 'Festival, theatrical, streaming, international' },
            { num: '08', title: 'Production Plan', desc: 'Timeline, PA advantages, shoot details' },
            { num: '09', title: 'Budget Top Sheet', desc: 'Line item summary - $2.3M total' },
            { num: '10', title: 'Financing Structure', desc: 'Capital stack, equity raise, tax credit' },
            { num: '11', title: 'Investment Terms', desc: 'LLC structure, 120% preferred return, profit split' },
            { num: '12', title: 'Financial Projections', desc: 'Conservative, moderate, and optimistic scenarios' },
            { num: '13', title: 'Sensitivity and Break-Even', desc: 'Revenue sensitivity matrix' },
            { num: '14', title: 'Waterfall Structure', desc: 'Full recoupment waterfall, all 10 tiers' },
            { num: '15', title: 'Completion and Insurance', desc: 'Contingency, E&O, production insurance' },
            { num: '16', title: 'Risk Factors', desc: 'Material risks for prospective investors' },
          ].map((item) => (
            <li key={item.num} className="bp-toc-item">
              <span className="bp-toc-num">{item.num}</span>
              <span className="bp-toc-title">{item.title}</span>
              <span className="bp-toc-desc">{item.desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="page-break"></div>

      {/* ─── SECTION 3: EXECUTIVE SUMMARY ─── */}
      <div className="bp-section">
        <div className="bp-section-header">
          <div className="bp-h2">01 - Executive Summary</div>
        </div>

        <div className="bp-callout">
          <p>
            <strong>ALLENTOWN</strong> is a {BUDGET_SHORTHAND} dramatic feature film based on the true story of the Allentown billboard sitters - three unemployed steelworkers who climbed a billboard in 1982 and refused to come down until they had jobs. The film stars <strong>Dane DeHaan</strong> (<em>Chronicle</em>, <em>Valerian</em>) and is produced by <strong>Gary Foster</strong>, whose recent credits include <em>Bedford Park</em> (2026 Sundance, Special Jury Award, acquired by Sony Pictures Classics) and the Oscar-nominated <em>Sleepless in Seattle</em> ($300M+ worldwide).
          </p>
        </div>

        <div className="bp-h3">The Opportunity</div>
        <p>
          <strong>{ENTITY_NAME}</strong> is seeking <span className="bp-accent">{EQUITY_RAISE}</span> in equity investment to complete financing of a {BUDGET_SHORTHAND} dramatic feature film. The balance of the budget is covered by a Pennsylvania Film Tax Credit of approximately <span className="bp-accent">{TAX_CREDIT}</span> (25-30% of qualified spend, applied directly to accelerate investor recoupment) and deferred compensation from key talent.
        </p>

        <div className="bp-h3">The Ask</div>
        <table className="bp-table avoid-break">
          <thead>
            <tr>
              <th>Component</th>
              <th>Amount</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Total Production Budget</td><td>{BUDGET_TOTAL}</td><td>Fully budgeted with 10% contingency</td></tr>
            <tr><td>PA Film Tax Credit</td><td>~{TAX_CREDIT}</td><td>Applied to reduce investor recoupment threshold</td></tr>
            <tr><td>Deferred Compensation</td><td>~$85K+</td><td>EP fees and partial writer/director deferrals</td></tr>
            <tr className="bold-row"><td>Equity Raise Required</td><td>{EQUITY_RAISE}</td><td>This offering</td></tr>
          </tbody>
        </table>

        <div className="bp-h3">Projected Returns</div>
        <p>
          Investors receive <span className="bp-accent">120% recoupment</span> (principal plus 20% preferred return) before any profit participation. After recoupment, net profits are split 50% to investors and 50% to {ENTITY_NAME}.
        </p>
        <table className="bp-table avoid-break">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Total Gross</th>
              <th>Investor Return</th>
              <th>ROI on {EQUITY_RAISE}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Conservative</td>
              <td>{SCENARIOS.conservative.totalGross}</td>
              <td>~{SCENARIOS.conservative.waterfall.investorReturn}</td>
              <td>Near breakeven</td>
            </tr>
            <tr>
              <td>Moderate</td>
              <td>{SCENARIOS.moderate.totalGross}</td>
              <td>{SCENARIOS.moderate.waterfall.totalInvestorReturn}</td>
              <td>{SCENARIOS.moderate.waterfall.investorROI}</td>
            </tr>
            <tr className="bold-row">
              <td>Optimistic</td>
              <td>{SCENARIOS.optimistic.totalGross}</td>
              <td>{SCENARIOS.optimistic.waterfall.totalInvestorReturn}</td>
              <td>{SCENARIOS.optimistic.waterfall.investorROI}</td>
            </tr>
          </tbody>
        </table>

        <div className="bp-h3">Why Now</div>
        <p>
          The story of workers climbing a billboard during America's steel collapse resonates with a contemporary audience grappling with economic displacement, housing costs, and the decline of manufacturing. Set in 1982 with a timeless working-class voice, <em>Allentown</em> follows the playbook of breakout genre dramas - <em>I, Tonya</em>, <em>The Florida Project</em>, <em>Three Billboards</em> - that deliver outsized returns at the indie budget level when paired with a recognizable lead and a strong festival strategy.
        </p>
        <p>
          Gary Foster's producing track record and Dane DeHaan's international Q-score make this a commercially positioned film, not a vanity production. The PA Film Tax Credit provides meaningful downside protection, reducing the effective equity exposure at risk.
        </p>
      </div>

      <div className="page-break"></div>

      {/* ─── SECTION 4: THE FILM ─── */}
      <div className="bp-section">
        <div className="bp-section-header">
          <div className="bp-h2">02 - The Film</div>
        </div>

        <div className="bp-h3">Logline</div>
        <div className="bp-callout">
          <p style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: '17px', fontStyle: 'italic', margin: 0 }}>
            Three unemployed steelworkers climb a Allentown billboard in 1982 and refuse to come down until someone gives them a job - triggering a national media frenzy and forcing a town to reckon with the human cost of deindustrialization.
          </p>
        </div>

        <div className="bp-h3">Synopsis</div>
        <p>
          [Synopsis to be finalized - contact info@allentownfilm.com for the full screenplay and extended treatment.]
        </p>
        <p>
          The film is a character-driven drama set against the backdrop of America's steel industry collapse. Three men - Ron Kistler, Mike Mackay, and Dalton Young - find themselves unemployed as Bethlehem Steel shutters operations in Allentown, Pennsylvania. Desperate and out of options, they make a decision that will change their lives: they climb a highway billboard and refuse to descend until someone offers them work. What begins as a local curiosity becomes a national media event, drawing journalists, politicians, and corporate executives to the foot of the billboard.
        </p>

        <div className="bp-h3">Genre Positioning</div>
        <p>
          Dramatic feature with comedic undertones. Think <em>I, Tonya</em> meets <em>The Full Monty</em> - grounded, character-driven storytelling with genuine emotional stakes and a crowd-pleasing premise. Rating target: R (language, adult themes).
        </p>

        <div className="bp-h3">Director's Vision</div>
        <p>
          "This is a story about dignity. Three men who refused to be invisible. The billboard isn't just a stunt - it's the only podium they had left. I want to make an American film that's as funny as it is heartbreaking, shot with the visual language of the great working-class films of the '70s and '80s. Gritty, warm, and true."
        </p>
        <p className="bp-muted">- Ze'ev Waismann, Director</p>
      </div>

      {/* ─── SECTION 5: CAST ─── */}
      <div className="bp-section page-break">
        <div className="bp-section-header">
          <div className="bp-h2">03 - Cast</div>
        </div>

        <table className="bp-table avoid-break">
          <thead>
            <tr>
              <th>Actor</th>
              <th>Role</th>
              <th>Status</th>
              <th>Selected Credits</th>
            </tr>
          </thead>
          <tbody>
            {CAST.map((member) => (
              <tr key={member.name}>
                <td><strong>{member.name}</strong></td>
                <td>{member.role}</td>
                <td>{member.status}</td>
                <td className="bp-small">{member.credits || 'Credits TBD'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bp-h3">Dane DeHaan - Market Value Analysis</div>
        <div className="bp-callout">
          <p>
            DeHaan's international recognition significantly elevates the film's distribution value. His attachment enables stronger international pre-sales, increases the likelihood of a streaming platform acquisition, and reduces distribution risk. Key value drivers:
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '14px', margin: '8px 0 0' }}>
            <li>Strong European and Asian fan base from <em>Valerian</em> and <em>Chronicle</em></li>
            <li>Streaming platform recognition from <em>ZeroZeroZero</em> (Amazon)</li>
            <li>Indie film credibility with <em>A Cure for Wellness</em> and <em>In Treatment</em></li>
            <li>At a {BUDGET_SHORTHAND} budget, his Q-score is proportionally outsized vs. production cost</li>
          </ul>
        </div>

        <div className="bp-h3">Remaining Cast</div>
        <p>
          Matt Woods is attached as Mike Mackay. The role of Dalton Young is currently in casting. Final cast will be announced prior to production start (Q4 2026).
        </p>
      </div>

      {/* ─── SECTION 6: FILMMAKERS ─── */}
      <div className="bp-section page-break">
        <div className="bp-section-header">
          <div className="bp-h2">04 - The Filmmakers</div>
        </div>

        <div className="bp-bio-grid">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="bp-bio-block avoid-break">
              <div className="bp-bio-role">{member.role}</div>
              <div className="bp-bio-name">{member.name}</div>
              <p className="bp-bio-text">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 7: COMPARABLE FILMS ─── */}
      <div className="bp-section page-break">
        <div className="bp-section-header">
          <div className="bp-h2">05 - Comparable Films</div>
        </div>

        <div className="bp-h3">Aspirational Comps</div>
        <p className="bp-small">
          These films share tonal and thematic DNA with Allentown and represent upside benchmarks. At their respective budgets, each delivered exceptional returns driven by strong performances, word-of-mouth, and awards traction.
        </p>
        <table className="bp-table avoid-break">
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Budget</th>
              <th>Domestic</th>
              <th>Worldwide</th>
              <th>ROI</th>
            </tr>
          </thead>
          <tbody>
            {ASPIRATIONAL_COMPS.map((film) => (
              <tr key={film.title}>
                <td><strong>{film.title}</strong></td>
                <td>{film.year}</td>
                <td>{film.budget}</td>
                <td>{film.domestic}</td>
                <td>{film.worldwide}</td>
                <td><span className="bp-accent">{film.roi}</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bp-h3">Direct Budget Comps</div>
        <p className="bp-small">
          Films produced at or near the {BUDGET_SHORTHAND} budget range. These represent realistic distribution outcomes and demonstrate that films at this scale can achieve meaningful returns when backed by the right talent and marketing strategy.
        </p>
        <table className="bp-table avoid-break">
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Budget</th>
              <th>Domestic</th>
              <th>Worldwide</th>
              <th>ROI</th>
            </tr>
          </thead>
          <tbody>
            {DIRECT_COMPS.map((film) => (
              <tr key={film.title}>
                <td><strong>{film.title}</strong></td>
                <td>{film.year}</td>
                <td>{film.budget}</td>
                <td>{film.domestic}</td>
                <td>{film.worldwide}</td>
                <td><span className="bp-accent">{film.roi}</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bp-callout">
          <p>
            <strong>Key takeaway:</strong> Indie dramas with recognizable casts, strong festival runs, and emotionally resonant subject matter consistently deliver 250-1000%+ ROI at the $1-5M budget level. Allentown's combination of a true story, an international star, and an experienced producer positions it at the higher end of this range.
          </p>
        </div>
      </div>

      {/* ─── SECTION 8: MARKET ANALYSIS ─── */}
      <div className="bp-section page-break">
        <div className="bp-section-header">
          <div className="bp-h2">06 - Market Analysis</div>
        </div>

        <div className="bp-h3">Why This Film, Why Now</div>
        <p>
          The themes of <em>Allentown</em> are universal, and in many ways more applicable and relevant today than they were in 1982. The American Dream of homeownership, the struggle of the working class, the desperation that drives people to extreme lengths - these are not period-piece concerns. They are today's headlines.
        </p>
        <p>
          Homeownership rates among Americans under 35 have fallen to historic lows. The median home price has outpaced wage growth by over 3x in the past decade. A generation of young Americans faces the same impossible math the billboard sitters faced in 1982: work hard, play by the rules, and still not be able to afford a home. Allentown's story is not nostalgia - it is a mirror.
        </p>

        <div className="bp-h3">Genre Trends</div>
        <p>
          Character-driven working-class dramas have experienced a sustained resurgence driven by streaming platform investment and audience appetite for authentic stories. After years of franchise dominance in theatrical exhibition, the awards circuit and streaming landscape reward films with emotional specificity - exactly what <em>Allentown</em> delivers. This is a human interest story at its core - three ordinary men pushed to extraordinary circumstances by an economy that left them behind.
        </p>

        <div className="bp-h3">Streaming Platform Appetite</div>
        <p>
          Netflix, Amazon Prime Video, and Apple TV+ are aggressively acquiring narrative features with prestige-adjacent casting and festival pedigree. The {BUDGET_SHORTHAND} budget positions <em>Allentown</em> as an attractive acquisition target: low enough that a platform deal at $3-6M represents meaningful ROI, high enough to deliver production values that warrant a platform premiere.
        </p>
        <p>
          The streaming model increasingly favors acquisitions over slate deals. A single Sundance acquisition can generate a $2-8M deal for a film at this budget level, as evidenced by recent acquisitions of similar-profile films.
        </p>

        <div className="bp-h3">Target Audience</div>
        <table className="bp-table avoid-break">
          <thead>
            <tr>
              <th>Segment</th>
              <th>Profile</th>
              <th>Reach</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Primary</strong></td>
              <td>Working and middle-class Americans, ages 25-65. Younger viewers (25-40) connect through today's housing crisis. Older audiences (45-65) bring nostalgia for 1980s Allentown and Billy Joel's anthem.</td>
              <td>Theatrical + streaming</td>
            </tr>
            <tr>
              <td><strong>Secondary</strong></td>
              <td>Dane DeHaan fan base, international audiences</td>
              <td>Streaming + international sales</td>
            </tr>
            <tr>
              <td><strong>Tertiary</strong></td>
              <td>Awards-season audiences, prestige drama followers</td>
              <td>Festival + limited theatrical</td>
            </tr>
            <tr>
              <td><strong>International</strong></td>
              <td>European and Asian markets with DeHaan recognition</td>
              <td>International pre-sales</td>
            </tr>
          </tbody>
        </table>

        <div className="bp-h3">Festival Landscape</div>
        <p>
          Sundance and TIFF remain the highest-value acquisition festivals for American indie dramas. A premiere at either creates immediate distributor attention and often triggers competitive acquisition bidding. Secondary targets include SXSW, Tribeca, and LA Film Festival. The film's true-story hook and recognizable cast are strong programming assets for festival programmers.
        </p>
      </div>

      {/* ─── SECTION 9: DISTRIBUTION STRATEGY ─── */}
      <div className="bp-section page-break">
        <div className="bp-section-header">
          <div className="bp-h2">07 - Distribution Strategy</div>
        </div>

        <div className="bp-h3">Phase Plan</div>
        <table className="bp-table avoid-break">
          <thead>
            <tr>
              <th>Phase</th>
              <th>Timeline</th>
              <th>Strategy</th>
            </tr>
          </thead>
          <tbody>
            {DISTRIBUTION_PHASES.map((phase) => (
              <tr key={phase.phase}>
                <td><strong>{phase.phase}: {phase.title}</strong></td>
                <td>{phase.timeline}</td>
                <td className="bp-small">{phase.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bp-h3">Revenue Windows</div>
        <table className="bp-table avoid-break">
          <thead>
            <tr>
              <th>Period</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {REVENUE_WINDOWS.map((window) => (
              <tr key={window.period}>
                <td>{window.period}</td>
                <td>{window.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bp-h3">International Strategy</div>
        <p>
          Pilar de Posadas (EP, Scenic Rights) leads international sales strategy with established relationships across European, Asian, and Latin American markets. Dane DeHaan's <em>Valerian</em> performance has a meaningful footprint in French, German, and Japanese markets. International pre-sales will be pursued in parallel with domestic festival strategy.
        </p>
      </div>

      {/* ─── SECTION 10: PRODUCTION PLAN ─── */}
      <div className="bp-section page-break">
        <div className="bp-section-header">
          <div className="bp-h2">08 - Production Plan</div>
        </div>

        <table className="bp-table avoid-break">
          <thead>
            <tr>
              <th>Phase</th>
              <th>Timeline</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTION_PHASES.map((phase) => (
              <tr key={phase.phase}>
                <td><strong>{phase.phase}</strong></td>
                <td>{phase.timeline}</td>
                <td className="bp-small">{phase.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bp-h3">Pennsylvania Advantages</div>
        <div className="bp-callout">
          <ul style={{ paddingLeft: '20px', fontSize: '14px', margin: 0 }}>
            <li><strong>Tax Credit:</strong> 25-30% of qualified Pennsylvania production spend - approximately {TAX_CREDIT} transferable credit</li>
            <li><strong>Authentic locations:</strong> Allentown, PA provides period-accurate 1982 industrial settings, reducing location design costs</li>
            <li><strong>Crew:</strong> Central PA Film Commission connects productions with experienced regional crew at below-LA rates</li>
            <li><strong>Story authenticity:</strong> Filming on location in Allentown is a marketing asset for press, documentary materials, and audience connection</li>
          </ul>
        </div>

        <div className="bp-h3">Shoot Details</div>
        <p>
          26-day principal photography. SAG Ultra Low Budget agreement (currently $933/day scale). IATSE low-budget crew rates. The billboard set is a practical centerpiece built on location. 25+ locations across Allentown and surrounding Lehigh Valley. 1982 period setting requires wardrobe, prop, and vehicle departments but no significant VFX work.
        </p>
      </div>

      {/* ─── SECTION 11: BUDGET TOP SHEET ─── */}
      <div className="bp-section page-break">
        <div className="bp-section-header">
          <div className="bp-h2">09 - Budget Top Sheet</div>
        </div>

        <table className="bp-table avoid-break">
          <thead>
            <tr>
              <th>Category</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {BUDGET_TOP_SHEET.map((line) => (
              <tr key={line.category} className={line.bold ? 'bold-row' : ''}>
                <td>{line.category}</td>
                <td>{line.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bp-h3">Budget Notes</div>
        <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8' }}>
          <li>Above-the-line includes deferred compensation elements for director and writer, reducing cash outlay</li>
          <li>10% contingency ($212,698) is fully funded within the {BUDGET_TOTAL} total</li>
          <li>Production budget was prepared with direct input from Pennsylvania Film Commission schedules</li>
          <li>Full budget with assumptions available at: <em>info@allentownfilm.com</em></li>
          <li>SAG Ultra Low Budget agreement applies (rates confirmed with SAG-AFTRA)</li>
        </ul>
      </div>

      {/* ─── SECTION 12: FINANCING STRUCTURE ─── */}
      <div className="bp-section page-break">
        <div className="bp-section-header">
          <div className="bp-h2">10 - Financing Structure</div>
        </div>

        <table className="bp-table avoid-break">
          <thead>
            <tr>
              <th>Source</th>
              <th>Amount</th>
              <th>% of Budget</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {CAPITAL_STACK.map((item) => (
              <tr key={item.source}>
                <td><strong>{item.source}</strong></td>
                <td>{item.amount}</td>
                <td>{item.percent}</td>
                <td className="bp-small">{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bp-h3">PA Film Tax Credit - Treatment</div>
        <p>
          The Pennsylvania Film Tax Credit (25-30% of qualified in-state production spend) is the most investor-favorable element of the financing structure. Unlike a standard incentive that flows through the distribution waterfall, this credit is applied directly to reduce the recoupment threshold - meaning investors recover approximately {TAX_CREDIT} before a single dollar of distribution revenue is received.
        </p>
        <div className="bp-callout">
          <p>
            <strong>Mechanics:</strong> The credit is issued to the production entity after completion and is transferable. The production sells the credit (typically at $0.85-0.92 on the dollar) and applies the proceeds directly to investor recoupment. This effectively reduces the {EQUITY_RAISE} equity raise to a ~$1.1M effective risk exposure in the moderate scenario.
          </p>
        </div>
        <p>
          The credit is subject to annual state funding caps and legislative approval. See Risk Factors for full disclosure.
        </p>
      </div>

      {/* ─── SECTION 13: INVESTMENT TERMS ─── */}
      <div className="bp-section page-break">
        <div className="bp-section-header">
          <div className="bp-h2">11 - Investment Terms</div>
        </div>

        <div className="bp-def-list avoid-break">
          <div className="bp-def-label">Legal Entity</div>
          <div className="bp-def-value">{INVESTMENT_TERMS.entity}</div>

          <div className="bp-def-label">Structure</div>
          <div className="bp-def-value">{INVESTMENT_TERMS.structure}</div>

          <div className="bp-def-label">Preferred Return</div>
          <div className="bp-def-value">
            <span className="bp-accent">{INVESTMENT_TERMS.preferredReturn}</span> of invested capital (pari passu among all investors)
          </div>

          <div className="bp-def-label">Profit Split</div>
          <div className="bp-def-value">{INVESTMENT_TERMS.profitSplit} after 120% recoupment</div>

          <div className="bp-def-label">Tax Credit</div>
          <div className="bp-def-value">{INVESTMENT_TERMS.taxCreditTreatment}</div>

          <div className="bp-def-label">Revenue Timeline</div>
          <div className="bp-def-value">{INVESTMENT_TERMS.revenueTimeline}</div>

          <div className="bp-def-label">Investor Type</div>
          <div className="bp-def-value">Accredited investors only (Rule 506(b) or 506(c) offering)</div>

          <div className="bp-def-label">Minimum Investment</div>
          <div className="bp-def-value">To be confirmed - contact info@allentownfilm.com</div>
        </div>

        <div className="bp-h3">120% Recoupment - Worked Example</div>
        <div className="bp-callout avoid-break">
          <p>
            <strong>Assume:</strong> An investor contributes $100,000.
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8' }}>
            <li>120% recoupment threshold = <strong>$120,000</strong></li>
            <li>Tax credit is applied proportionally to all investors' recoupment pool</li>
            <li>Under the moderate scenario ($5M gross), available for recoupment = $3.24M</li>
            <li>Recoupment pool needed = $2.04M (all investors at 120%)</li>
            <li>Full 120% recoupment is achieved: investor receives <strong>$120,000</strong></li>
            <li>Remaining $1.115M in net profits splits 50/50</li>
            <li>Investor's 50% profit share on $100K investment = approximately <strong>+$32,700</strong></li>
            <li>Total return on $100,000 investment: approximately <strong>$152,700 (53% ROI)</strong></li>
          </ul>
        </div>
      </div>

      {/* ─── SECTION 14: FINANCIAL PROJECTIONS ─── */}
      <div className="bp-section page-break">
        <div className="bp-section-header">
          <div className="bp-h2">12 - Financial Projections</div>
        </div>

        <p>
          Three scenarios are modeled below. Each reflects a realistic range of distribution outcomes. Revenue figures represent gross receipts before any fees or expenses.
        </p>

        {/* Conservative */}
        <div className="bp-scenario-block avoid-break">
          <div className="bp-scenario-title">Scenario A: {SCENARIOS.conservative.label}</div>
          <div className="bp-scenario-premise">{SCENARIOS.conservative.premise}</div>

          <div className="bp-h3" style={{ marginTop: 0 }}>Revenue</div>
          <table className="bp-table">
            <thead>
              <tr>
                <th>Revenue Source</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {SCENARIOS.conservative.revenue.map((row) => (
                <tr key={row.source}>
                  <td>{row.source}</td>
                  <td>{row.amount}</td>
                </tr>
              ))}
              <tr className="bold-row">
                <td>Total Gross Revenue</td>
                <td>{SCENARIOS.conservative.totalGross}</td>
              </tr>
            </tbody>
          </table>

          <div className="bp-h3">Waterfall</div>
          <WaterfallTableConservative />

          <div className="bp-scenario-outcome">
            Outcome: {SCENARIOS.conservative.outcome}
          </div>
        </div>

        {/* Moderate */}
        <div className="bp-scenario-block amber-top avoid-break">
          <div className="bp-scenario-title">Scenario B: {SCENARIOS.moderate.label}</div>
          <div className="bp-scenario-premise">{SCENARIOS.moderate.premise}</div>

          <div className="bp-h3" style={{ marginTop: 0 }}>Revenue</div>
          <table className="bp-table">
            <thead>
              <tr>
                <th>Revenue Source</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {SCENARIOS.moderate.revenue.map((row) => (
                <tr key={row.source}>
                  <td>{row.source}</td>
                  <td>{row.amount}</td>
                </tr>
              ))}
              <tr className="bold-row">
                <td>Total Gross Revenue</td>
                <td>{SCENARIOS.moderate.totalGross}</td>
              </tr>
            </tbody>
          </table>

          <div className="bp-h3">Waterfall</div>
          <WaterfallTableModerate />

          <div className="bp-scenario-outcome">
            Outcome: {SCENARIOS.moderate.outcome}
          </div>
        </div>

        {/* Optimistic */}
        <div className="bp-scenario-block avoid-break">
          <div className="bp-scenario-title">Scenario C: {SCENARIOS.optimistic.label}</div>
          <div className="bp-scenario-premise">{SCENARIOS.optimistic.premise}</div>

          <div className="bp-h3" style={{ marginTop: 0 }}>Revenue</div>
          <table className="bp-table">
            <thead>
              <tr>
                <th>Revenue Source</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {SCENARIOS.optimistic.revenue.map((row) => (
                <tr key={row.source}>
                  <td>{row.source}</td>
                  <td>{row.amount}</td>
                </tr>
              ))}
              <tr className="bold-row">
                <td>Total Gross Revenue</td>
                <td>{SCENARIOS.optimistic.totalGross}</td>
              </tr>
            </tbody>
          </table>

          <div className="bp-h3">Waterfall</div>
          <WaterfallTableOptimistic />

          <div className="bp-scenario-outcome">
            Outcome: {SCENARIOS.optimistic.outcome}
          </div>
        </div>
      </div>

      {/* ─── SECTION 15: SENSITIVITY AND BREAK-EVEN ─── */}
      <div className="bp-section page-break">
        <div className="bp-section-header">
          <div className="bp-h2">13 - Sensitivity and Break-Even</div>
        </div>

        <div className="bp-h3">Sensitivity Matrix</div>
        <table className="bp-table avoid-break">
          <thead>
            <tr>
              <th>Gross Revenue</th>
              <th>Net + Tax Credit</th>
              <th>Investor Return</th>
              <th>Investor ROI</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {SENSITIVITY_MATRIX.map((row) => (
              <tr key={row.grossRevenue}>
                <td>{row.grossRevenue}</td>
                <td>{row.netPlusTaxCredit}</td>
                <td>{row.investorReturn}</td>
                <td><span className="bp-accent">{row.investorROI}</span></td>
                <td className="bp-small">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bp-h3">Break-Even Analysis</div>
        <div className="bp-callout avoid-break">
          <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8' }}>
            <li><strong>Principal recovery break-even:</strong> Approximately $2.0M gross revenue</li>
            <li><strong>120% recoupment threshold:</strong> Approximately $3.0M gross revenue</li>
            <li><strong>Full 120% recoupment + profit share begins:</strong> Above $3.0M gross</li>
            <li><strong>Tax credit contribution:</strong> {TAX_CREDIT} applied to recoupment pool, reducing revenue-dependent breakeven by approximately 30%</li>
          </ul>
        </div>

        <div className="bp-h3">IRR Estimates</div>
        <table className="bp-table avoid-break">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Estimated IRR</th>
              <th>Assumptions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Conservative</td>
              <td>Near 0%</td>
              <td>18-month recoupment window, near-full principal return</td>
            </tr>
            <tr>
              <td>Moderate</td>
              <td>25-35%</td>
              <td>24-month recoupment, 153% total return</td>
            </tr>
            <tr className="bold-row">
              <td>Optimistic</td>
              <td>60-80%</td>
              <td>18-month recoupment, 364% total return</td>
            </tr>
          </tbody>
        </table>
        <p className="bp-muted">
          IRR estimates are illustrative. Actual returns depend on distribution timing, deal structure, and revenue realization. These figures are not guarantees.
        </p>
      </div>

      {/* ─── SECTION 16: WATERFALL STRUCTURE ─── */}
      <div className="bp-section page-break">
        <div className="bp-section-header">
          <div className="bp-h2">14 - Waterfall Structure</div>
        </div>

        <p>
          Revenue flows through the following waterfall in strict priority order. Tiers 8 and 10 (highlighted in amber) represent direct investor benefit.
        </p>

        {WATERFALL_TIERS.map((tier) => {
          const isInvestorTier = tier.tier === 8 || tier.tier === 10;
          return (
            <div key={tier.tier} className="bp-waterfall-tier avoid-break">
              <div className={`bp-tier-number${isInvestorTier ? ' amber' : ''}`}>
                {tier.tier}
              </div>
              <div>
                <div className="bp-tier-label">{tier.label}</div>
                <div className="bp-tier-desc">{tier.description}</div>
              </div>
            </div>
          );
        })}

        <div className="bp-callout" style={{ marginTop: '24px' }}>
          <p>
            <strong>Investor advantage:</strong> The PA Film Tax Credit (Tier 7) is applied directly to accelerate investor recoupment at Tier 8, bypassing normal distribution expenses. This means investors benefit from the {TAX_CREDIT} credit before standard waterfall deductions reduce it.
          </p>
        </div>
      </div>

      {/* ─── SECTION 17: COMPLETION AND INSURANCE ─── */}
      <div className="bp-section page-break">
        <div className="bp-section-header">
          <div className="bp-h2">15 - Completion and Insurance</div>
        </div>

        <div className="bp-h3">Contingency</div>
        <p>
          A 10% contingency ($212,698) is budgeted within the {BUDGET_TOTAL} total. This is the industry-standard buffer for unforeseen production costs and is fully funded within the current capital raise.
        </p>

        <div className="bp-h3">Completion Bond</div>
        <p>
          A traditional completion bond is not in place for this production. At {BUDGET_SHORTHAND} with an experienced producer of record, the production operates within standard independent film financing conventions where completion bonds are not typically required below $5M. Investor protection is provided through the 10% contingency, the PA tax credit downside floor, and Gary Foster's track record delivering productions on budget.
        </p>

        <div className="bp-h3">Production Insurance</div>
        <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8' }}>
          <li><strong>Cast insurance:</strong> Covers the cost of production delays or shutdowns caused by principal cast illness or injury</li>
          <li><strong>Extra expense coverage:</strong> Covers additional costs from covered production interruptions</li>
          <li><strong>General liability:</strong> Standard production liability coverage for all locations and crew</li>
          <li><strong>Workers compensation:</strong> Required for all Pennsylvania production employees</li>
          <li><strong>Equipment / props / wardrobe:</strong> All production assets insured for replacement value</li>
          <li><strong>E&amp;O (Errors and Omissions):</strong> Required for distribution; covers intellectual property, defamation, and privacy claims. Policy will be in place prior to distribution</li>
        </ul>

        <div className="bp-h3">Gary Foster's Track Record</div>
        <div className="bp-callout">
          <p>
            Gary Foster, President of Krasnoff/Foster Entertainment, has over 40 years of experience producing films and television totaling hundreds of millions in global gross receipts. Most recently he produced <em>Bedford Park</em> (2026 Sundance, Special Jury Award, acquired by Sony Pictures Classics) and <em>Finestkind</em> (2023, Paramount+, starring Jenna Ortega and Tommy Lee Jones). Earlier credits include <em>Denial</em> (2016, BAFTA nominated, starring Rachel Weisz), <em>Community</em> (TV series), Marvel's <em>Daredevil</em>, <em>Elektra</em>, and <em>Ghost Rider</em>, and the Oscar-nominated <em>Sleepless in Seattle</em> ($300M+ worldwide).
          </p>
        </div>
      </div>

      {/* ─── SECTION 18: RISK FACTORS ─── */}
      <div className="bp-section page-break">
        <div className="bp-section-header">
          <div className="bp-h2">16 - Risk Factors</div>
        </div>

        <p>
          Prospective investors should carefully consider the following risk factors before making an investment decision. This is not an exhaustive list. Investing in independent film is speculative and involves a high degree of risk.
        </p>

        {RISK_FACTORS.map((risk) => (
          <div key={risk.title} className="avoid-break" style={{ marginBottom: '20px' }}>
            <div className="bp-h3" style={{ margin: '0 0 6px' }}>{risk.title}</div>
            <p style={{ margin: 0, fontSize: '14px', color: '#333', lineHeight: '1.7' }}>
              {risk.description}
            </p>
          </div>
        ))}

        <div className="bp-disclaimer">
          <p>
            <strong>IMPORTANT NOTICE:</strong> This business plan has been prepared by {ENTITY_NAME} for informational purposes only and constitutes a marketing document, not a securities offering. It does not constitute an offer to sell, or a solicitation of an offer to buy, any securities. Any offer or solicitation will be made only by means of a formal Private Placement Memorandum (PPM) delivered to qualified accredited investors. This document contains forward-looking statements and financial projections that are inherently uncertain. Actual results may differ materially from those projected. Past performance of comparable films does not guarantee future results. All investments involve risk. Film investments are illiquid, speculative, and suitable only for investors who can afford the total loss of their investment. This document is strictly confidential and intended solely for the individual or entity to whom it has been provided.
          </p>
          <p>
            For information regarding a formal investment offer, contact: <strong>info@allentownfilm.com</strong>
          </p>
          <p>
            {ENTITY_NAME} - {new Date().getFullYear()}
          </p>
        </div>
      </div>

    </div>
  );
}
