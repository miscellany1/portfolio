import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="min-h-screen bg-surface">
      <header className="no-print border-b border-border-subtle bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="text-lg font-semibold text-text-primary hover:text-accent transition-colors"
          >
            CourseEval
          </Link>
          {!isLanding && (
            <nav className="flex items-center gap-4 text-sm">
              <Link
                to="/"
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/evaluate"
                className={`transition-colors ${
                  location.pathname === "/evaluate"
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Evaluate
              </Link>
              <Link
                to="/results"
                className={`transition-colors ${
                  location.pathname === "/results"
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Results
              </Link>
            </nav>
          )}
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
