import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — PolityWatch" },
      {
        name: "description",
        content:
          "PolityWatch is a chart-first lens on Indian Parliament: assets, promises, and MPLADS spend, with AI summaries.",
      },
      { property: "og:title", content: "About — PolityWatch" },
      {
        property: "og:description",
        content:
          "How PolityWatch works, where the data comes from, and our editorial approach.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen ns-grain">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="font-display text-5xl font-extrabold tracking-tight">About PolityWatch</h1>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground">
          <p>
            PolityWatch is a modern, chart-first lens on the Indian Parliament. We make
            three things easy for any citizen to read in under a minute:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-2 text-muted-foreground">
            <li><strong className="text-foreground">Asset growth</strong> — how an MP's declared wealth has changed across election filings.</li>
            <li><strong className="text-foreground">Promise tracker</strong> — which manifesto and campaign promises have been kept, dropped, or are still in motion.</li>
            <li><strong className="text-foreground">MPLADS spend</strong> — how each MP has used their Local Area Development funds, broken down by year and category.</li>
          </ul>
          <p>
            Above each profile, an AI-written plain-language summary picks out the most
            useful patterns so you don't have to.
          </p>
          <h2 className="mt-10 font-display text-2xl font-bold">Data</h2>
          <p className="text-muted-foreground">
            This demo ships with seeded, illustrative data for 15 prominent MPs so the
            charts render immediately. Numbers are inspired by public sources (election
            affidavits, MPLADS portal, parliamentary records) but are not live and should
            not be cited as authoritative. A future version will ingest official datasets
            on a refresh schedule.
          </p>

          <div className="mt-10">
            <Link to="/" className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              Search MPs →
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
