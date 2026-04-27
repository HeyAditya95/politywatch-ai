import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles, TrendingUp, Wallet, Target } from "lucide-react";
import { ALL_PARTIES, ALL_STATES, MPS } from "@/data/mps";
import { MPCard } from "@/components/mp-card";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [q, setQ] = useState("");
  const [party, setParty] = useState<string>("All");
  const [state, setState] = useState<string>("All");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return MPS.filter((m) => {
      if (party !== "All" && m.party !== party) return false;
      if (state !== "All" && m.state !== state) return false;
      if (!needle) return true;
      return (
        m.name.toLowerCase().includes(needle) ||
        m.constituency.toLowerCase().includes(needle) ||
        m.state.toLowerCase().includes(needle) ||
        m.party.toLowerCase().includes(needle)
      );
    });
  }, [q, party, state]);

  return (
    <div className="min-h-screen bg-background bg-grain">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-saffron" />
              AI-powered MP profiles · Demo data
            </div>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
              Every MP.
              <br />
              <span className="bg-gradient-to-r from-saffron via-warning to-emerald bg-clip-text text-transparent">
                In charts. In English.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              Search any Indian Member of Parliament. See their asset growth, promise
              tracker, and MPLADS constituency spend — side-by-side, year-by-year, with
              an AI summary on top.
            </p>

            {/* SEARCH */}
            <div className="mx-auto mt-10 max-w-2xl">
              <div className="group relative">
                <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Try ‘Tharoor’, ‘Varanasi’, ‘BJP’, ‘Kerala’…"
                  className="h-16 rounded-2xl border-2 border-border bg-card pl-14 pr-4 text-base shadow-lg shadow-foreground/5 transition-colors focus-visible:border-foreground focus-visible:ring-0"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
                <FilterPill label="Party" value={party} onChange={setParty} options={["All", ...ALL_PARTIES]} />
                <FilterPill label="State" value={state} onChange={setState} options={["All", ...ALL_STATES]} />
                <Link
                  to="/compare"
                  className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Compare two MPs →
                </Link>
              </div>
            </div>
          </div>

          {/* Feature strip */}
          <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
            <FeatureChip
              icon={<Wallet className="h-4 w-4" />}
              title="Asset growth"
              text="Year-on-year declarations, movable + immovable, with % growth."
            />
            <FeatureChip
              icon={<Target className="h-4 w-4" />}
              title="Promise tracker"
              text="Manifesto promises tagged fulfilled, in-progress, or broken."
            />
            <FeatureChip
              icon={<TrendingUp className="h-4 w-4" />}
              title="LAD spend"
              text="MPLADS allocation vs spend, broken down by category."
            />
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {filtered.length} {filtered.length === 1 ? "MP" : "MPs"}
            <span className="ml-2 text-sm font-medium text-muted-foreground">
              in our demo dataset
            </span>
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">
              No MPs match those filters. Try clearing them.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((mp) => (
              <MPCard key={mp.id} mp={mp} />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}

function FilterPill({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 font-medium">
      <span className="text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer bg-transparent font-semibold text-foreground outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function FeatureChip({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 text-left">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-saffron/15 text-saffron">
          {icon}
        </div>
        <div className="font-display font-bold">{title}</div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
