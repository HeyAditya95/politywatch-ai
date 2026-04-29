import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
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
  MPS,
  promiseStats,
  totalAssets,
} from "@/data/mps";
import type { MP } from "@/data/mps";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ArrowLeftRight } from "lucide-react";

const searchSchema = z.object({
  a: fallback(z.string(), "").optional(),
  b: fallback(z.string(), "").optional(),
});

export const Route = createFileRoute("/compare")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Compare MPs side-by-side — PolityWatch" },
      {
        name: "description",
        content:
          "Pick any two Indian MPs and compare their assets, promises, and MPLADS spend in one chart-first view.",
      },
      { property: "og:title", content: "Compare MPs side-by-side — PolityWatch" },
      {
        property: "og:description",
        content: "Two MPs, one dashboard. Asset growth, promise tracker, and MPLADS spend.",
      },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const { a, b } = Route.useSearch();
  const navigate = Route.useNavigate();

  const aId = a ?? MPS[0].id;
  const bId = b ?? MPS[1].id;
  const mpA = findMP(aId) ?? MPS[0];
  const mpB = findMP(bId) ?? MPS[1];

  const colorA = getPartyColor(mpA.party);
  const colorB = getPartyColor(mpB.party);

  // Build asset comparison series across union of years
  const yearSet = Array.from(
    new Set([...mpA.assets.map((x) => x.year), ...mpB.assets.map((x) => x.year)]),
  ).sort((x, y) => x - y);
  const assetSeries = yearSet.map((y) => {
    const ay = mpA.assets.find((d) => d.year === y);
    const by = mpB.assets.find((d) => d.year === y);
    return {
      year: String(y),
      [mpA.name]: ay ? +totalAssets(ay).toFixed(2) : null,
      [mpB.name]: by ? +totalAssets(by).toFixed(2) : null,
    } as Record<string, string | number | null>;
  });

  // LAD spent by category — pivot
  const cats = Array.from(
    new Set([
      ...mpA.ladByCategory.map((c) => c.category),
      ...mpB.ladByCategory.map((c) => c.category),
    ]),
  );
  const ladSeries = cats.map((c) => ({
    category: c,
    [mpA.name]: mpA.ladByCategory.find((x) => x.category === c)?.amount ?? 0,
    [mpB.name]: mpB.ladByCategory.find((x) => x.category === c)?.amount ?? 0,
  }));

  return (
    <div className="min-h-screen bg-background bg-grain">
      <SiteHeader />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <ArrowLeftRight className="h-3 w-3 text-saffron" /> Side-by-side comparison
          </div>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Compare two MPs
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Pick any two MPs to see their asset growth, promise tracker, and MPLADS spend
            head-to-head.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Picker
              label="MP A"
              value={mpA.id}
              color={colorA}
              onChange={(v) => navigate({ search: { a: v, b: bId } })}
            />
            <Picker
              label="MP B"
              value={mpB.id}
              color={colorB}
              onChange={(v) => navigate({ search: { a: aId, b: v } })}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* HEADLINE TABLE */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <SummaryCard mp={mpA} color={colorA} />
          <SummaryCard mp={mpB} color={colorB} />
        </div>

        {/* ASSETS LINE */}
        <PanelCard title="Asset growth comparison" subtitle="Net declared assets per filing year (₹ Crore).">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={assetSeries} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="year" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v) => `₹${v}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey={mpA.name}
                stroke={colorA}
                strokeWidth={3}
                dot={{ r: 5, fill: colorA }}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey={mpB.name}
                stroke={colorB}
                strokeWidth={3}
                dot={{ r: 5, fill: colorB }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </PanelCard>

        {/* LAD CATEGORY */}
        <PanelCard title="MPLADS spend by category" subtitle="Total spend across all years, ₹ Lakh.">
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={ladSeries} margin={{ top: 10, right: 16, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="category" stroke="var(--muted-foreground)" fontSize={11} interval={0} angle={-15} textAnchor="end" height={60} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey={mpA.name} fill={colorA} radius={[4, 4, 0, 0]} />
              <Bar dataKey={mpB.name} fill={colorB} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </PanelCard>

        {/* PROMISE TABLE */}
        <PanelCard title="Promise tracker" subtitle="Counts of fulfilled, in-progress, and broken commitments.">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-2"></th>
                  <th className="py-2">{mpA.name}</th>
                  <th className="py-2">{mpB.name}</th>
                </tr>
              </thead>
              <tbody className="font-display">
                <PromiseRow label="Fulfilled" a={promiseStats(mpA).fulfilled} b={promiseStats(mpB).fulfilled} tone="ok" />
                <PromiseRow label="In progress" a={promiseStats(mpA).inProgress} b={promiseStats(mpB).inProgress} tone="warn" />
                <PromiseRow label="Broken" a={promiseStats(mpA).broken} b={promiseStats(mpB).broken} tone="bad" />
                <PromiseRow label="Total tracked" a={promiseStats(mpA).total} b={promiseStats(mpB).total} tone="muted" />
              </tbody>
            </table>
          </div>
        </PanelCard>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/mp/$mpId"
            params={{ mpId: mpA.id }}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Full profile: {mpA.name} →
          </Link>
          <Link
            to="/mp/$mpId"
            params={{ mpId: mpB.id }}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Full profile: {mpB.name} →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Picker({
  label,
  value,
  color,
  onChange,
}: {
  label: string;
  value: string;
  color: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border-2 bg-card p-4" style={{ borderColor: color }}>
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 cursor-pointer bg-transparent font-display text-xl font-bold outline-none"
      >
        {MPS.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name} — {m.party}
          </option>
        ))}
      </select>
    </label>
  );
}

function SummaryCard({ mp, color }: { mp: MP; color: string }) {
  const last = mp.assets[mp.assets.length - 1];
  const ps = promiseStats(mp);
  const ls = ladStats(mp);
  const growth = assetGrowthPct(mp);
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="h-1.5" style={{ backgroundColor: color }} />
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl font-display font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {mp.photo}
          </div>
          <div>
            <div className="font-display text-xl font-bold leading-tight">{mp.name}</div>
            <div className="text-xs text-muted-foreground">{mp.constituency} · {mp.party}</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <SummaryStat label="Assets" value={`₹${totalAssets(last).toFixed(1)} Cr`} sub={`${growth >= 0 ? "+" : ""}${growth}%`} />
          <SummaryStat label="Promises kept" value={`${ps.fulfilledPct}%`} sub={`${ps.fulfilled}/${ps.total}`} />
          <SummaryStat label="LAD util." value={`${ls.utilisation}%`} sub={`${ls.works} works`} />
        </div>
      </div>
    </div>
  );
}

function SummaryStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg bg-muted/50 p-2">
      <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 font-display text-base font-bold leading-none">{value}</div>
      <div className="mt-1 text-[10px] text-muted-foreground">{sub}</div>
    </div>
  );
}

function PanelCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-card">
      <div className="border-b border-border p-5">
        <h3 className="font-display text-xl font-bold sm:text-2xl">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function PromiseRow({
  label,
  a,
  b,
  tone,
}: {
  label: string;
  a: number;
  b: number;
  tone: "ok" | "warn" | "bad" | "muted";
}) {
  const cls =
    tone === "ok"
      ? "text-emerald"
      : tone === "warn"
        ? "text-warning"
        : tone === "bad"
          ? "text-destructive"
          : "text-foreground";
  return (
    <tr className="border-b border-border last:border-0">
      <td className="py-3 font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </td>
      <td className={`py-3 text-2xl font-extrabold ${cls}`}>{a}</td>
      <td className={`py-3 text-2xl font-extrabold ${cls}`}>{b}</td>
    </tr>
  );
}
