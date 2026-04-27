import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:rotate-3">
            <span className="font-display text-lg font-extrabold">N</span>
          </div>
          <div className="leading-none">
            <div className="font-display text-xl font-extrabold tracking-tight">
              NetaScope
            </div>
            <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              India · Parliament · Decoded
            </div>
          </div>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "bg-muted text-foreground" }}
            className="rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Search
          </Link>
          <Link
            to="/compare"
            activeProps={{ className: "bg-muted text-foreground" }}
            className="rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Compare
          </Link>
          <Link
            to="/about"
            activeProps={{ className: "bg-muted text-foreground" }}
            className="rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} NetaScope · An open lens on Indian Parliament.
          </p>
          <p className="font-mono text-xs">
            Demo data · For illustrative purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
