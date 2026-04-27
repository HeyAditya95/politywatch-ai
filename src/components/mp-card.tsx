import { Link } from "@tanstack/react-router";
import type { MP } from "@/data/mps";
import { assetGrowthPct, getPartyColor, ladStats, promiseStats, totalAssets } from "@/data/mps";

export function MPCard({ mp }: { mp: MP }) {
  const last = mp.assets[mp.assets.length - 1];
  const growth = assetGrowthPct(mp);
  const ps = promiseStats(mp);
  const ls = ladStats(mp);
  const partyColor = getPartyColor(mp.party);

  return (
    <Link
      to="/mp/$mpId"
      params={{ mpId: mp.id }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-xl"
    >
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: partyColor }}
        aria-hidden
      />
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-base font-bold text-white"
            style={{ backgroundColor: partyColor }}
          >
            {mp.photo}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-display text-lg font-bold leading-tight">
              {mp.name}
            </h3>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {mp.constituency} · {mp.state}
            </p>
            <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
              {mp.party}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
          <div>
            <div className="font-display text-base font-bold leading-none">
              ₹{totalAssets(last).toFixed(1)}
              <span className="ml-0.5 text-[9px] font-medium text-muted-foreground">Cr</span>
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">
              Assets
            </div>
            <div
              className={`mt-0.5 text-[10px] font-semibold ${growth >= 0 ? "text-emerald" : "text-destructive"}`}
            >
              {growth >= 0 ? "▲" : "▼"} {Math.abs(growth)}%
            </div>
          </div>
          <div>
            <div className="font-display text-base font-bold leading-none">
              {ps.fulfilledPct}%
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">
              Promises
            </div>
            <div className="mt-0.5 text-[10px] font-semibold text-muted-foreground">
              {ps.fulfilled}/{ps.total} kept
            </div>
          </div>
          <div>
            <div className="font-display text-base font-bold leading-none">
              {ls.utilisation}%
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">
              LAD spent
            </div>
            <div className="mt-0.5 text-[10px] font-semibold text-muted-foreground">
              {ls.works} works
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
