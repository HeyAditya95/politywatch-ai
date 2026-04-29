import { Link } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-provider";

export function SiteHeader() {
  return (
    <nav
      className="sticky top-0 z-40 flex h-14 items-center justify-between px-5 backdrop-blur-xl sm:px-10"
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
            activeOptions={item.to === "/" ? { exact: true } : undefined}
            activeProps={{ style: { color: "var(--ns-saffron)" } }}
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
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
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

export function SiteFooter() {
  return (
    <footer
      className="flex flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-10"
      style={{ borderTop: "1px solid var(--ns-rule)" }}
    >
      <div>
        <Link to="/" className="font-disp text-[1.1rem] tracking-wider" style={{ color: "var(--ns-w)" }}>
          Polity<span style={{ color: "var(--ns-saffron)" }}>Watch</span>
        </Link>
        <div className="font-mono mt-1 text-[0.56rem] uppercase tracking-wider" style={{ color: "var(--ns-w3)" }}>
          Demo data · For illustrative purposes only · {new Date().getFullYear()}
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
              search={l.to === "/compare" ? {} : undefined}
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
