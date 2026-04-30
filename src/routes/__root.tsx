import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { ThemeProvider } from "@/components/theme-provider";
import { DemoDataBanner } from "@/components/site-chrome";

function NotFoundComponent() {
  return (
    <div className="ns-grain flex min-h-screen items-center justify-center px-4" style={{ background: "var(--ink-bg)", color: "var(--ns-w)" }}>
      <div className="max-w-md text-center">
        <h1 className="font-disp text-7xl" style={{ color: "var(--ns-saffron)" }}>404</h1>
        <h2 className="font-disp mt-4 text-2xl" style={{ color: "var(--ns-w)" }}>Page not found</h2>
        <p className="font-mono mt-2 text-[0.7rem] uppercase tracking-wider" style={{ color: "var(--ns-w2)" }}>
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="font-mono inline-flex items-center px-5 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.1em] transition-opacity hover:opacity-85"
            style={{ background: "var(--ns-saffron)", color: "var(--ink-bg)" }}
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PolityWatch — Political Accountability Intelligence" },
      {
        name: "description",
        content:
          "Search any Indian MP and see their asset growth, promise tracker, and MPLADS spend in clear, comparable charts — with AI summaries on top.",
      },
      { name: "author", content: "PolityWatch" },
      { property: "og:title", content: "PolityWatch — Political Accountability Intelligence" },
      {
        property: "og:description",
        content:
          "A modern, chart-first lens on Indian Parliament: assets, promises, and MPLADS spend with AI summaries.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <DemoDataBanner />
      <Outlet />
    </>
  );
}

