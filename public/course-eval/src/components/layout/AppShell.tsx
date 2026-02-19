import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="no-print border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="text-lg font-semibold text-slate-100 hover:text-white transition-colors"
          >
            CourseEval
          </Link>
          {!isLanding && (
            <nav className="flex items-center gap-4 text-sm">
              <Link
                to="/"
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/evaluate"
                className={`transition-colors ${
                  location.pathname === "/evaluate"
                    ? "text-green-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Evaluate
              </Link>
              <Link
                to="/results"
                className={`transition-colors ${
                  location.pathname === "/results"
                    ? "text-green-400"
                    : "text-slate-400 hover:text-slate-200"
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
