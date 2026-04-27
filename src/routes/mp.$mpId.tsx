import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, Wallet, Target, TrendingUp, GraduationCap, Gavel, Users } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  assetGrowthPct,
  findMP,
  getPartyColor,
  ladStats,
  promiseStats,
  totalAssets,
} from "@/data/mps";
import type { MP, PromiseStatus } from "@/data/mps";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/mp/$mpId")({
  loader: ({ params }) => {
    const mp = findMP(params.mpId);
    if (!mp) throw notFound();
    return { mp };
  },
  head: ({ loaderData }) => {
    const mp = loaderData?.mp;
    if (!mp) return {};
    const title = `${mp.name} (${mp.party}) — NetaScope`;
    const desc = `Asset growth, promise tracker, and MPLADS spend for ${mp.name}, MP from ${mp.constituency}, ${mp.state}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="font-display text-4xl font-bold">MP not found</h1>
        <p className="mt-2 text-muted-foreground">We don't have this MP in our demo dataset yet.</p>
        <Link to="/" className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Back to search
        </Link>
      </div>
    </div>
  ),
  component: MPProfile,
});

const promiseColor: Record<PromiseStatus, string> = {
  fulfilled: "var(--success)",
  "in-progress": "var(--warning)",
  broken: "var(--destructive)",
};

function MPProfile() {
  const data = Route.useLoaderData();
  const mp = data.mp as MP;
  const partyColor = getPartyColor(mp.party);
  const ps = promiseStats(mp);
  const ls = ladStats(mp);
  const last = mp.assets[mp.assets.length - 1];
  const growth = assetGrowthPct(mp);

  const assetSeries = mp.assets.map((a) => ({
    year: String(a.year),
    Movable: +a.movable.toFixed(2),
    Immovable: +a.immovable.toFixed(2),
    Net: +(totalAssets(a)).toFixed(2),
    Liabilities: +a.liabilities.toFixed(2),
  }));

  const ladYearSeries = mp.ladByYear.map((y) => ({
    year: String(y.year),
    Allocated: y.allocated,
    Spent: y.spent,
  }));

  const ladCatSeries = [...mp.ladByCategory].sort((a, b) => b.amount - a.amount);

  const promisePie = [
    { name: "Fulfilled", value: ps.fulfilled, color: "var(--success)" },
    { name: "In progress", value: ps.inProgress, color: "var(--warning)" },
    { name: "Broken", value: ps.broken, color: "var(--destructive)" },
  ].filter((s) => s.value > 0);

  return (
    <div className="min-h-screen bg-background bg-grain">
      <SiteHeader />

      {/* HERO */}
      <section
        className="relative overflow-hidden border-b border-border"
        style={{
          background: `linear-gradient(135deg, ${partyColor}18, transparent 60%)`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All MPs
          </Link>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-5">
              <div
                className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl font-display text-3xl font-extrabold text-white shadow-xl sm:h-28 sm:w-28"
                style={{ backgroundColor: partyColor }}
              >
                {mp.photo}
              </div>
              <div>
                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
                  style={{ backgroundColor: partyColor }}
                >
                  {mp.party}
                </div>
                <h1 className="mt-2 font-display text-4xl font-extrabold leading-none tracking-tight sm:text-6xl">
                  {mp.name}
                </h1>
                <p className="mt-2 text-base text-muted-foreground sm:text-lg">
                  MP, {mp.constituency} · {mp.state}
                </p>
              </div>
            </div>
            <Link
              to="/compare"
              search={{ a: mp.id }}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Compare with another MP →
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <QuickStat icon={<Users className="h-4 w-4" />} label="Age" value={String(mp.age)} sub={`${mp.termsServed} term${mp.termsServed > 1 ? "s" : ""}`} />
            <QuickStat icon={<GraduationCap className="h-4 w-4" />} label="Education" value={mp.education.split(",")[0]} sub={mp.education.split(",").slice(1).join(",").trim() || "—"} />
            <QuickStat icon={<Gavel className="h-4 w-4" />} label="Attendance" value={`${mp.attendance}%`} sub={`${mp.questionsAsked} questions · ${mp.debatesParticipated} debates`} />
            <QuickStat icon={<Sparkles className="h-4 w-4" />} label="Criminal cases" value={String(mp.criminalCases)} sub={mp.criminalCases === 0 ? "Clean record" : "Self-declared"} tone={mp.criminalCases > 0 ? "warn" : "ok"} />
          </div>
        </div>
      </section>

      {/* AI SUMMARY */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-saffron/15 blur-3xl" aria-hidden />
          <div className="relative flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-saffron/15 text-saffron">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                AI Summary
              </div>
              <p className="mt-1 font-display text-lg font-medium leading-snug sm:text-xl">
                {mp.aiSummary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HEADLINE METRICS */}
      <section className="mx-auto mt-8 grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
        <Headline
          icon={<Wallet className="h-5 w-5" />}
          label="Net assets (latest)"
          value={`₹${totalAssets(last).toFixed(2)} Cr`}
          delta={`${growth >= 0 ? "+" : ""}${growth}% since first declaration`}
          deltaTone={growth >= 0 ? "ok" : "warn"}
        />
        <Headline
          icon={<Target className="h-5 w-5" />}
          label="Promises kept"
          value={`${ps.fulfilled} / ${ps.total}`}
          delta={`${ps.fulfilledPct}% fulfilled · ${ps.broken} broken`}
          deltaTone={ps.fulfilledPct >= 50 ? "ok" : "warn"}
        />
        <Headline
          icon={<TrendingUp className="h-5 w-5" />}
          label="MPLADS utilisation"
          value={`${ls.utilisation}%`}
          delta={`₹${ls.spent} L spent · ${ls.works} works completed`}
          deltaTone={ls.utilisation >= 90 ? "ok" : "warn"}
        />
      </section>

      {/* CHARTS */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* ASSET CHART */}
        <ChartCard
          title="Asset growth, year by year"
          subtitle="Self-declared movable + immovable assets at each election filing (₹ Crore)."
          accent={partyColor}
        >
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={assetSeries} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="aMov" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--saffron)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--saffron)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="aImm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--emerald)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--emerald)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="year" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v) => `₹${v}`} />
              <Tooltip content={<RechTooltip suffix=" Cr" />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="Movable" stroke="var(--saffron)" strokeWidth={2.5} fill="url(#aMov)" />
              <Area type="monotone" dataKey="Immovable" stroke="var(--emerald)" strokeWidth={2.5} fill="url(#aImm)" />
            </AreaChart>
          </ResponsiveContainer>

          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs sm:grid-cols-4">
            {mp.assets.map((a) => (
              <div key={a.year} className="rounded-lg bg-muted/60 p-3">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {a.year}
                </div>
                <div className="mt-1 font-display text-base font-bold">₹{totalAssets(a).toFixed(2)} Cr</div>
                <div className="mt-0.5 text-[10px] text-muted-foreground">
                  Liab. ₹{a.liabilities.toFixed(2)} Cr
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* PROMISES */}
        <ChartCard
          title="Promise tracker"
          subtitle="Key manifesto and campaign commitments, status as tracked by editors."
          accent={partyColor}
        >
          <div className="grid gap-6 lg:grid-cols-[260px,1fr] lg:items-center">
            <div className="mx-auto h-[220px] w-full max-w-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={promisePie}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    stroke="var(--background)"
                    strokeWidth={3}
                  >
                    {promisePie.map((s) => (
                      <Cell key={s.name} fill={s.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<RechTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-2.5">
              {mp.promises.map((p) => (
                <li
                  key={p.id}
                  className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-3"
                >
                  <span
                    className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: promiseColor[p.status] }}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold leading-tight">{p.text}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground">
                      <span>{p.category}</span>
                      <span>·</span>
                      <span>Pledged {p.year}</span>
                      <span>·</span>
                      <span
                        className="font-semibold capitalize"
                        style={{ color: promiseColor[p.status] }}
                      >
                        {p.status.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ChartCard>

        {/* LAD */}
        <ChartCard
          title="MPLADS spend breakdown"
          subtitle="Local Area Development funds: allocated vs spent by year, and distribution by category (₹ Lakh)."
          accent={partyColor}
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Allocated vs Spent (by year)
              </h4>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={ladYearSeries} margin={{ top: 10, right: 8, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="year" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip content={<RechTooltip suffix=" L" />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="Allocated" fill="var(--muted-foreground)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Spent" fill="var(--saffron)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Where the money went
              </h4>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={ladCatSeries}
                  layout="vertical"
                  margin={{ top: 0, right: 16, left: 8, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} />
                  <YAxis
                    dataKey="category"
                    type="category"
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    width={110}
                  />
                  <Tooltip content={<RechTooltip suffix=" L" />} />
                  <Bar dataKey="amount" fill="var(--emerald)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ChartCard>
      </section>

      <SiteFooter />
    </div>
  );
}

/* —————————————————— small components —————————————————— */

function QuickStat({
  icon,
  label,
  value,
  sub,
  tone = "neutral",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  tone?: "ok" | "warn" | "neutral";
}) {
  const toneCls =
    tone === "warn" ? "text-destructive" : tone === "ok" ? "text-emerald" : "text-muted-foreground";
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        <span className="text-saffron">{icon}</span>
        {label}
      </div>
      <div className="mt-1.5 font-display text-2xl font-bold leading-none">{value}</div>
      <div className={`mt-1.5 text-[11px] ${toneCls}`}>{sub}</div>
    </div>
  );
}

function Headline({
  icon,
  label,
  value,
  delta,
  deltaTone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta: string;
  deltaTone: "ok" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <span className="text-saffron">{icon}</span> {label}
      </div>
      <div className="mt-2 font-display text-3xl font-extrabold leading-none">{value}</div>
      <div className={`mt-2 text-xs font-medium ${deltaTone === "ok" ? "text-emerald" : "text-destructive"}`}>
        {delta}
      </div>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  accent,
  children,
}: {
  title: string;
  subtitle?: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-start gap-3 border-b border-border p-5">
        <div
          className="mt-1 h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: accent }}
          aria-hidden
        />
        <div>
          <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function RechTooltip({
  active,
  payload,
  label,
  suffix = "",
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number | string; color: string }>;
  label?: string | number;
  suffix?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover p-2.5 text-xs shadow-lg">
      {label !== undefined && (
        <div className="mb-1 font-semibold text-foreground">{label}</div>
      )}
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-mono font-semibold text-foreground">
            {p.value}
            {suffix}
          </span>
        </div>
      ))}
    </div>
  );
}
