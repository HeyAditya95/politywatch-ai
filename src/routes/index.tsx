import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Github, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-provider";
import { ALL_PARTIES, ALL_STATES, MPS, getPartyColor, ladStats, promiseStats, totalAssets } from "@/data/mps";

export const Route = createFileRoute("/")({
  component: HomePage,
});

/* ─────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────── */

const totalAssetsTracked = MPS.reduce((sum, m) => {
  const last = m.assets[m.assets.length - 1];
  return sum + totalAssets(last);
}, 0);
const totalLadSpent = MPS.reduce((s, m) => s + ladStats(m).spent, 0);
const totalWorks = MPS.reduce((s, m) => s + ladStats(m).works, 0);

function HomePage() {
  return (
    <div className="ns-grain min-h-screen">
      <Nav />
      <Hero />
      <StickyStatBar />
      <Ticker />
      <BigNumber />
      <CaseFiles />
      <Capabilities />
      <ScrollStrip />
      <CTA />
      <Footer />
      <FloatingSearch />
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAV
   ───────────────────────────────────────────── */
function Nav() {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between px-5 backdrop-blur-xl sm:px-10"
      style={{
        background: "color-mix(in oklab, var(--ink-bg) 88%, transparent)",
        borderBottom: "1px solid var(--ns-rule)",
      }}
    >
      <Link to="/" className="font-disp text-[1.35rem] tracking-wider" style={{ color: "var(--ns-w)" }}>
        Polity<span style={{ color: "var(--ns-saffron)" }}>Watch</span>
      </Link>
      <div className="absolute left-1/2 hidden -translate-x-1/2 md:flex">
        {[
          { label: "Search", to: "/" as const },
          { label: "Compare", to: "/compare" as const },
          { label: "About", to: "/about" as const },
        ].map((item, i) => (
          <Link
            key={item.label}
            to={item.to}
            search={item.to === "/compare" ? {} : undefined}
            className="font-mono px-4 py-2 text-[0.62rem] uppercase tracking-[0.08em] transition-colors hover:text-[var(--ns-saffron)]"
            style={{
              color: "var(--ns-w2)",
              borderRight: "1px solid var(--ns-rule)",
              borderLeft: i === 0 ? "1px solid var(--ns-rule)" : undefined,
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <a
          href="#cases"
          className="font-mono hidden text-[0.62rem] uppercase tracking-[0.08em] transition-colors hover:text-[var(--ns-saffron)] sm:inline"
          style={{ color: "var(--ns-w2)" }}
        >
          <Github className="mr-1 inline h-3 w-3" /> Demo
        </a>
        <ThemeToggle />
        <Link
          to="/compare"
          search={{}}
          className="font-mono px-4 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.08em] transition-opacity hover:opacity-85"
          style={{ background: "var(--ns-saffron)", color: "var(--ink-bg)" }}
        >
          Compare →
        </Link>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden px-5 pb-16 pt-32 sm:px-10 sm:pb-24">
      {/* Giant background number */}
      <div
        aria-hidden
        className="font-disp pointer-events-none absolute right-[-2vw] top-1/2 select-none leading-[0.85]"
        style={{
          fontSize: "clamp(18rem, 38vw, 54rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,122,26,0.07)",
          transform: "translateY(-52%)",
          letterSpacing: "-0.02em",
          zIndex: 1,
        }}
      >
        {MPS.length}
      </div>

      {/* Diagonal slash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px h-44"
        style={{
          background: "linear-gradient(to bottom right, transparent 49.5%, var(--ink-bg) 50%)",
          zIndex: 3,
        }}
      />

      <div className="relative z-[2] max-w-4xl">
        <div className="ns-fade-up font-mono mb-8 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.16em]" style={{ color: "var(--ns-saffron)", animationDelay: "0.2s" }}>
          <span className="inline-block h-px w-5" style={{ background: "var(--ns-saffron)" }} />
          Political Accountability · India · Demo Data
        </div>

        <h1
          className="ns-fade-up font-disp mb-10 text-white"
          style={{
            fontSize: "clamp(5rem, 13vw, 13rem)",
            lineHeight: 0.88,
            letterSpacing: "0.01em",
            animationDelay: "0.3s",
          }}
        >
          Political
          <span className="block" style={{ color: "var(--ns-saffron)" }}>
            Account&shy;ability
          </span>
          <span
            className="block"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(240,240,242,0.18)",
            }}
          >
            Intelligence
          </span>
        </h1>

        <div className="ns-fade-up flex flex-wrap items-end justify-between gap-8" style={{ animationDelay: "0.5s" }}>
          <p className="max-w-[480px] text-[0.95rem] font-light leading-[1.85]" style={{ color: "var(--ns-w2)" }}>
            <strong className="font-medium" style={{ color: "var(--ns-w)" }}>PolityWatch</strong> parses every Indian MP's
            financial affidavit, manifesto promises and MPLADS spend — surfacing wealth anomalies,
            tracking constituency works, and answering your questions in plain language. Always on.
          </p>
          <div className="flex flex-shrink-0 items-center gap-3">
            <a
              href="#cases"
              className="font-mono px-7 py-3 text-[0.7rem] font-medium uppercase tracking-[0.1em] transition-all hover:-translate-y-0.5"
              style={{
                background: "var(--ns-saffron)",
                color: "#0c0c0e",
                boxShadow: "0 0 0 0 rgba(255,122,26,0.4)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 0 8px rgba(255,122,26,0.15), 0 0 40px rgba(255,122,26,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 0 0 rgba(255,122,26,0.4)")}
            >
              Browse MPs →
            </a>
            <Link
              to="/compare"
              search={{}}
              className="font-mono px-6 py-3 text-[0.7rem] uppercase tracking-[0.1em] transition-all hover:text-white"
              style={{
                color: "var(--ns-w2)",
                border: "1px solid var(--ns-w3)",
              }}
            >
              Compare MPs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STICKY STAT BAR
   ───────────────────────────────────────────── */
function StickyStatBar() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const onScroll = () => setVis(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { v: `${MPS.length}+`, l: "MPs Analyzed" },
    { v: `₹${Math.round(totalAssetsTracked)}Cr`, l: "Assets Tracked" },
    { v: `₹${Math.round(totalLadSpent / 100)}Cr`, l: "MPLADS Spend" },
    { v: `${totalWorks}+`, l: "Works Completed" },
  ];

  return (
    <div
      className="sticky top-14 z-30 hidden grid-cols-4 backdrop-blur-xl transition-all duration-500 sm:grid"
      style={{
        background: "rgba(17,17,21,0.96)",
        borderBottom: "1px solid var(--ns-rule)",
        transform: vis ? "translateY(0)" : "translateY(-100%)",
        opacity: vis ? 1 : 0,
      }}
    >
      {items.map((it, i) => (
        <div
          key={it.l}
          className="flex items-center gap-3 px-6 py-3"
          style={{ borderRight: i < items.length - 1 ? "1px solid var(--ns-rule)" : undefined }}
        >
          <div className="font-disp text-2xl leading-none" style={{ color: "var(--ns-saffron)" }}>
            {it.v}
          </div>
          <div className="font-mono text-[0.55rem] uppercase tracking-[0.1em]" style={{ color: "var(--ns-w3)" }}>
            {it.l}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TICKER
   ───────────────────────────────────────────── */
function Ticker() {
  const items = MPS.slice(0, 10).map((m) => {
    const ps = promiseStats(m);
    return `${m.name} · ${m.party} · ${ps.fulfilledPct}% promises kept`;
  });
  const doubled = [...items, ...items];

  return (
    <div className="flex h-8 items-center overflow-hidden" style={{ background: "var(--ns-saffron)" }}>
      <div className="ns-ticker-run flex whitespace-nowrap">
        {doubled.map((t, i) => (
          <div key={i} className="font-mono flex items-center gap-3 px-8 text-[0.6rem] font-medium uppercase tracking-[0.06em]" style={{ color: "#0c0c0e" }}>
            <span>● {t}</span>
            <span className="opacity-40">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BIG NUMBER SECTION
   ───────────────────────────────────────────── */
function BigNumber() {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-2"
      style={{ background: "var(--ns-saffron)", borderBottom: "1px solid var(--ns-rule)" }}
    >
      <div className="px-5 py-20 sm:px-10" style={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}>
        <div
          className="font-disp leading-[0.85] text-[#0c0c0e]"
          style={{ fontSize: "clamp(6rem, 15vw, 14rem)", letterSpacing: "-0.02em" }}
        >
          ₹{Math.round(totalAssetsTracked)}
          <span className="block text-[0.18em] tracking-wider">Crore</span>
        </div>
        <div className="font-mono mt-6 text-[0.65rem] font-medium uppercase tracking-[0.18em]" style={{ color: "rgba(12,12,14,0.55)" }}>
          Total Declared Assets — Under Analysis
        </div>
      </div>
      <div className="flex flex-col justify-center px-5 py-20 sm:px-10">
        <h2 className="font-disp leading-none text-[#0c0c0e]" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
          Wealth that demands<br />an explanation.
        </h2>
        <p className="mt-6 max-w-md text-[0.9rem] font-light leading-[1.85]" style={{ color: "rgba(12,12,14,0.7)" }}>
          Across {MPS.length} prominent parliamentarians, hundreds of crores in declared assets —
          verified, charted, and cross-referenced. Anomalies surfaced automatically. Answers in
          under a second.
        </p>
        <Link
          to="/compare"
          search={{}}
          className="font-mono mt-8 inline-flex w-fit items-center gap-2 px-7 py-3 text-[0.7rem] font-medium uppercase tracking-[0.1em] transition-opacity hover:opacity-85"
          style={{ background: "#0c0c0e", color: "var(--ns-saffron)" }}
        >
          Explore Profiles <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CASE FILES — horizontal MP cards
   ───────────────────────────────────────────── */
function CaseFiles() {
  return (
    <section id="cases" className="overflow-hidden py-28" style={{ borderBottom: "1px solid var(--ns-rule)" }}>
      <div className="mb-12 px-5 sm:px-10">
        <SectionEyebrow>Subject Intelligence Files</SectionEyebrow>
        <h2 className="font-disp" style={{ fontSize: "clamp(3rem, 7vw, 7rem)", lineHeight: 0.9 }}>
          Case <span style={{ color: "var(--ns-saffron)" }}>Files.</span>
        </h2>
        <p className="mt-2 max-w-md text-[0.9rem] font-light leading-[1.85]" style={{ color: "var(--ns-w2)" }}>
          Drag to explore. Each file shows a risk score, asset growth, and red flags drawn from the
          MP's affidavits and parliamentary record.
        </p>
      </div>

      <div className="ns-no-scrollbar flex cursor-grab gap-0 overflow-x-auto px-5 sm:px-10" style={{ scrollSnapType: "x mandatory" }}>
        {MPS.map((mp, idx) => {
          const last = mp.assets[mp.assets.length - 1];
          const first = mp.assets[0];
          const growth = first
            ? Math.round(((totalAssets(last) - totalAssets(first)) / Math.max(totalAssets(first), 0.1)) * 100)
            : 0;
          const ps = promiseStats(mp);
          // Risk score heuristic
          const risk = Math.min(
            99,
            Math.round(
              Math.max(0, growth) / 10 +
                mp.criminalCases * 6 +
                ps.broken * 8 +
                (100 - mp.attendance) / 2,
            ),
          );
          const tone = risk >= 60 ? "hi" : risk >= 35 ? "md" : "lo";
          const toneColor =
            tone === "hi" ? "var(--ns-saffron)" : tone === "md" ? "var(--ns-amber)" : "var(--ns-emerald)";
          const partyColor = getPartyColor(mp.party);

          return (
            <Link
              key={mp.id}
              to="/mp/$mpId"
              params={{ mpId: mp.id }}
              className="group relative w-[280px] flex-shrink-0 overflow-hidden transition-colors"
              style={{
                border: "1px solid var(--ns-rule)",
                borderRight: idx === MPS.length - 1 ? "1px solid var(--ns-rule)" : "none",
                scrollSnapAlign: "start",
              }}
            >
              <span
                className="absolute left-0 top-0 h-full w-0.5 origin-bottom scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
                style={{ background: "var(--ns-saffron)" }}
              />
              <div className="flex items-center justify-between p-5" style={{ borderBottom: "1px solid var(--ns-rule)" }}>
                <div
                  className="font-mono flex h-9 w-9 items-center justify-center text-[0.55rem] font-medium"
                  style={{ background: partyColor, color: "#0c0c0e" }}
                >
                  {mp.photo}
                </div>
                <div className="font-disp text-[2.2rem] leading-none" style={{ color: toneColor }}>
                  {risk}
                </div>
              </div>
              <div className="p-5">
                <div className="font-disp text-[1.3rem] text-white">{mp.name}</div>
                <div className="font-mono mt-0.5 text-[0.58rem] uppercase tracking-wider" style={{ color: "var(--ns-w3)" }}>
                  {mp.party} · {mp.constituency}
                </div>
                <div className="mt-4 h-0.5 w-full" style={{ background: "var(--ns-bg2, #16161b)" }}>
                  <div
                    className="h-full transition-all duration-700"
                    style={{ width: `${risk}%`, background: "var(--ns-saffron)" }}
                  />
                </div>
                <div className="mt-3 flex items-start gap-2 border-t pt-2 font-mono text-[0.62rem] leading-[1.4]" style={{ borderColor: "var(--ns-rule2)", color: "var(--ns-w2)" }}>
                  <span style={{ color: growth > 100 ? "var(--ns-saffron)" : "var(--ns-amber)" }}>⚑</span>
                  <span>
                    {growth > 0 ? "+" : ""}
                    {growth}% wealth · {ps.broken} broken · {mp.criminalCases} cases
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="font-mono mt-3 flex items-center gap-2 px-5 text-[0.58rem] uppercase tracking-[0.08em] sm:px-10" style={{ color: "var(--ns-w3)" }}>
        Drag to scroll <span className="ns-nudge">→</span>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CAPABILITIES
   ───────────────────────────────────────────── */
function Capabilities() {
  const features = [
    { n: "01", t: "Accountability Score", d: "0–100 risk score in <1s — wealth trajectory, cases, and disclosures analyzed simultaneously." },
    { n: "02", t: "Red Flag Detection", d: "Wealth spikes, undisclosed assets, anomalous case patterns — surfaced automatically." },
    { n: "03", t: "Promise Tracker", d: "Every manifesto promise tagged fulfilled, in-progress, or broken — across election cycles." },
    { n: "04", t: "Wealth Timeline", d: "Interactive charts tracking declared assets across each affidavit filing." },
    { n: "05", t: "MPLADS Lens", d: "Local Area Development funds: allocated vs spent, broken down by category and year." },
    { n: "06", t: "AI Plain-English Summary", d: "Every MP profile starts with a one-paragraph briefing in clear, jargon-free language." },
  ];

  return (
    <section className="px-5 py-28 sm:px-10" style={{ borderBottom: "1px solid var(--ns-rule)" }}>
      <div className="grid items-start gap-16 lg:grid-cols-[340px,1fr]">
        <div>
          <SectionEyebrow>Capabilities</SectionEyebrow>
          <h2 className="font-disp" style={{ fontSize: "clamp(3rem, 6vw, 6rem)", lineHeight: 0.9 }}>
            Full<br />
            <span style={{ color: "var(--ns-saffron)" }}>Intel</span><br />
            Suite
          </h2>
          <p className="mt-6 max-w-sm text-[0.9rem] font-light leading-[1.85]" style={{ color: "var(--ns-w2)" }}>
            Six core modules working in concert to close every transparency gap between voter and
            representative.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ borderTop: "1px solid var(--ns-rule)", borderLeft: "1px solid var(--ns-rule)" }}
        >
          {features.map((f) => (
            <div
              key={f.n}
              className="group relative overflow-hidden p-7 transition-colors hover:bg-[var(--ink-bg1)]"
              style={{
                borderRight: "1px solid var(--ns-rule)",
                borderBottom: "1px solid var(--ns-rule)",
              }}
            >
              <span
                aria-hidden
                className="font-disp pointer-events-none absolute bottom-2 right-3 leading-none"
                style={{ fontSize: "3.5rem", color: "rgba(255,255,255,0.04)" }}
              >
                {f.n}
              </span>
              <div
                className="mb-4 flex h-8 w-8 items-center justify-center transition-all"
                style={{ border: "1px solid var(--ns-rule)" }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full transition-colors group-hover:bg-[#0c0c0e]"
                  style={{ background: "var(--ns-saffron)" }}
                />
              </div>
              <h3 className="font-mono mb-2 text-[0.8rem] font-medium text-white">{f.t}</h3>
              <p className="font-mono text-[0.65rem] leading-[1.75]" style={{ color: "var(--ns-w3)" }}>
                {f.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SCROLL STRIP — party + state chips
   ───────────────────────────────────────────── */
function ScrollStrip() {
  const row1 = [...MPS, ...MPS].map((m) => ({
    label: `${m.name} · ${m.constituency}`,
    av: m.photo,
    color: getPartyColor(m.party),
  }));
  const row2 = [...ALL_PARTIES, ...ALL_STATES, ...ALL_PARTIES, ...ALL_STATES].map((s) => ({
    label: s,
    av: s.slice(0, 2).toUpperCase(),
    color: "#3a3a44",
  }));

  return (
    <section className="relative overflow-hidden" style={{ background: "var(--ink-bg1)", borderTop: "1px solid var(--ns-rule)", borderBottom: "1px solid var(--ns-rule)" }}>
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20"
        style={{ background: "linear-gradient(to right, var(--ink-bg1), transparent)" }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20"
        style={{ background: "linear-gradient(to left, var(--ink-bg1), transparent)" }}
      />

      <div className="ns-strip-l flex w-max">
        {row1.map((c, i) => (
          <span
            key={i}
            className="font-mono flex flex-shrink-0 items-center gap-2 whitespace-nowrap px-5 py-2 text-[0.58rem] uppercase tracking-wider"
            style={{ color: "var(--ns-w3)", borderRight: "1px solid var(--ns-rule)" }}
          >
            <span
              className="flex h-4 w-4 items-center justify-center text-[0.44rem] font-medium"
              style={{ background: c.color, color: "#0c0c0e" }}
            >
              {c.av}
            </span>
            {c.label}
          </span>
        ))}
      </div>
      <div className="ns-strip-r flex w-max" style={{ borderTop: "1px solid var(--ns-rule)" }}>
        {row2.map((c, i) => (
          <span
            key={i}
            className="font-mono flex flex-shrink-0 items-center gap-2 whitespace-nowrap px-5 py-2 text-[0.58rem] uppercase tracking-wider"
            style={{ color: "var(--ns-w3)", borderRight: "1px solid var(--ns-rule)" }}
          >
            <span
              className="flex h-4 w-4 items-center justify-center text-[0.44rem] font-medium"
              style={{ background: c.color, color: "#0c0c0e" }}
            >
              {c.av}
            </span>
            {c.label}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA
   ───────────────────────────────────────────── */
function CTA() {
  return (
    <section className="relative overflow-hidden px-5 py-32 text-center sm:px-10 sm:py-40" style={{ background: "var(--ink-bg)" }}>
      <span
        aria-hidden
        className="font-disp pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap leading-none"
        style={{
          fontSize: "clamp(8rem, 22vw, 22rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.04)",
        }}
      >
        DEMOCRACY
      </span>
      <div className="relative">
        <div className="font-mono mb-6 text-[0.6rem] uppercase tracking-[0.2em]" style={{ color: "var(--ns-saffron)" }}>
          Open Source · Public Interest
        </div>
        <h2 className="font-disp mx-auto max-w-3xl text-white" style={{ fontSize: "clamp(3rem, 7vw, 7rem)", lineHeight: 0.9 }}>
          Democracy works when voters
          <br />
          <span style={{ color: "var(--ns-saffron)" }}>are informed.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-[0.9rem] font-light leading-[1.85]" style={{ color: "var(--ns-w2)" }}>
          Search any of {MPS.length} MPs in our demo dataset. Asset growth, promise tracker, MPLADS
          spend — all in clear charts, with an AI summary on top.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#cases"
            className="font-mono px-9 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.1em] transition-all hover:-translate-y-0.5"
            style={{ background: "var(--ns-saffron)", color: "#0c0c0e" }}
          >
            Browse All MPs →
          </a>
          <Link
            to="/compare"
            search={{}}
            className="font-mono px-9 py-3.5 text-[0.7rem] uppercase tracking-[0.1em] transition-colors hover:text-white"
            style={{ color: "var(--ns-w3)", border: "1px solid var(--ns-w3)" }}
          >
            Compare Two MPs ↗
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      className="flex flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-10"
      style={{ borderTop: "1px solid var(--ns-rule)" }}
    >
      <div>
        <Link to="/" className="font-disp text-[1.1rem] tracking-wider text-white">
          Polity<span style={{ color: "var(--ns-saffron)" }}>Watch</span>
        </Link>
        <div className="font-mono mt-1 text-[0.56rem] uppercase tracking-wider" style={{ color: "var(--ns-w3)" }}>
          Demo data · For illustrative purposes only · 2026
        </div>
      </div>
      <ul className="flex list-none">
        {[
          { label: "Search", to: "/" as const },
          { label: "Compare", to: "/compare" as const },
          { label: "About", to: "/about" as const },
        ].map((l, i) => (
          <li key={l.label}>
            <Link
              to={l.to}
              className="font-mono px-4 py-1.5 text-[0.58rem] uppercase tracking-[0.06em] transition-colors hover:text-[var(--ns-saffron)]"
              style={{
                color: "var(--ns-w3)",
                borderRight: "1px solid var(--ns-rule)",
                borderLeft: i === 0 ? "1px solid var(--ns-rule)" : undefined,
              }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   FLOATING SEARCH
   ───────────────────────────────────────────── */
function FloatingSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return MPS.slice(0, 5);
    return MPS.filter(
      (m) =>
        m.name.toLowerCase().includes(needle) ||
        m.constituency.toLowerCase().includes(needle) ||
        m.state.toLowerCase().includes(needle) ||
        m.party.toLowerCase().includes(needle),
    ).slice(0, 6);
  }, [q]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    setQ("");
    navigate({ to: "/mp/$mpId", params: { mpId: id } });
  };

  return (
    <div
      ref={ref}
      className="fixed bottom-7 left-1/2 z-40 w-[min(540px,92vw)] -translate-x-1/2"
    >
      {open && (
        <div
          className="absolute bottom-full left-0 right-0 mb-1 max-h-72 overflow-y-auto backdrop-blur-xl"
          style={{
            background: "rgba(17,17,21,0.98)",
            border: "1px solid var(--ns-rule)",
            boxShadow: "0 -20px 60px rgba(0,0,0,0.6)",
          }}
        >
          {results.length === 0 ? (
            <div className="font-mono p-5 text-center text-[0.65rem]" style={{ color: "var(--ns-w3)" }}>
              No subjects match "{q}".
            </div>
          ) : (
            results.map((m) => {
              const ps = promiseStats(m);
              const tone = ps.fulfilledPct >= 60 ? "var(--ns-emerald)" : ps.fulfilledPct >= 30 ? "var(--ns-amber)" : "var(--ns-saffron)";
              return (
                <button
                  key={m.id}
                  onClick={() => go(m.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--ink-bg1)]"
                  style={{ borderBottom: "1px solid var(--ns-rule2)" }}
                >
                  <span
                    className="font-mono flex h-7 w-7 items-center justify-center text-[0.48rem] font-medium"
                    style={{ background: getPartyColor(m.party), color: "#0c0c0e" }}
                  >
                    {m.photo}
                  </span>
                  <span className="flex-1">
                    <span className="font-mono block text-[0.72rem] font-medium text-white">
                      {m.name}
                    </span>
                    <span className="font-mono block text-[0.58rem]" style={{ color: "var(--ns-w3)" }}>
                      {m.party} · {m.constituency}
                    </span>
                  </span>
                  <span className="font-disp ml-auto text-[1.1rem]" style={{ color: tone }}>
                    {ps.fulfilledPct}%
                  </span>
                </button>
              );
            })
          )}
          <div className="font-mono px-4 py-2 text-[0.56rem] uppercase tracking-wider" style={{ color: "var(--ns-w3)", borderTop: "1px solid var(--ns-rule2)" }}>
            ↵ Open profile · Esc Close
          </div>
        </div>
      )}

      <form
        className="flex items-stretch backdrop-blur-2xl"
        style={{
          background: "rgba(17,17,21,0.98)",
          border: "1px solid var(--ns-rule)",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.5), 0 20px 60px rgba(0,0,0,0.7)",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          if (results[0]) go(results[0].id);
        }}
      >
        <span
          className="font-mono flex items-center px-4 text-[0.6rem] font-medium uppercase tracking-[0.08em]"
          style={{ color: "var(--ns-saffron)", borderRight: "1px solid var(--ns-rule)" }}
        >
          <Search className="mr-2 h-3 w-3" /> Search
        </span>
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Try ‘Tharoor’, ‘Varanasi’, ‘BJP’, ‘Kerala’…"
          className="font-mono min-w-0 flex-1 bg-transparent px-4 py-3 text-[0.77rem] outline-none placeholder:text-[var(--ns-w3)]"
          style={{ color: "var(--ns-w)" }}
        />
        <button
          type="submit"
          className="font-mono flex-shrink-0 px-5 text-[0.62rem] font-medium uppercase tracking-[0.08em] transition-opacity hover:opacity-85"
          style={{
            background: "var(--ns-saffron)",
            color: "#0c0c0e",
            borderLeft: "1px solid var(--ns-rule)",
          }}
        >
          Query
        </button>
      </form>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SHARED
   ───────────────────────────────────────────── */
function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-mono mb-4 flex items-center gap-3 text-[0.58rem] font-medium uppercase tracking-[0.2em]"
      style={{ color: "var(--ns-saffron)" }}
    >
      {children}
      <span className="h-px flex-1" style={{ background: "var(--ns-rule)" }} />
    </div>
  );
}
