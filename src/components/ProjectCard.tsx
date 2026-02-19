import { motion } from "framer-motion";
import type { Project } from "../data/projects";

export default function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className={
        featured
          ? "bg-slate-900 border border-amber-500/30 rounded-xl p-8 sm:p-10 hover:border-amber-500/50 transition-colors relative overflow-hidden"
          : "bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 hover:border-slate-700 transition-colors"
      }
    >
      {featured && (
        <span className="absolute top-4 right-4 sm:top-6 sm:right-6 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
          Featured
        </span>
      )}

      <div className="mb-4">
        <h3
          className={
            featured
              ? "text-2xl sm:text-3xl font-semibold text-slate-100"
              : "text-xl font-semibold text-slate-100"
          }
        >
          {project.title}
        </h3>
        <p
          className={
            featured
              ? "text-sm sm:text-base text-slate-500 mt-1"
              : "text-sm text-slate-500 mt-1"
          }
        >
          {project.subtitle}
        </p>
      </div>

      <p
        className={
          featured
            ? "text-slate-400 leading-relaxed mb-6 sm:text-lg sm:leading-relaxed max-w-2xl"
            : "text-slate-400 leading-relaxed mb-6"
        }
      >
        {project.description}
      </p>

      <div className={featured ? "sm:flex sm:gap-10 mb-6" : "mb-6"}>
        <div className={featured ? "mb-6 sm:mb-0" : ""}>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Demonstrated Skills
          </h4>
          <ul className="space-y-1.5">
            {project.skills.map((skill) => (
              <li key={skill} className="flex items-center gap-2 text-sm">
                <svg
                  className="w-4 h-4 text-green-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-slate-300">{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            className={
              featured
                ? "text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3"
                : "sr-only"
            }
          >
            Tech
          </h4>
          <div className={featured ? "flex flex-wrap gap-2" : "flex flex-wrap gap-2 mt-4"}>
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs font-medium bg-slate-800 text-slate-400 rounded-md"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <a
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={
          featured
            ? "inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors"
            : "inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
        }
      >
        {project.linkLabel ?? "View Project"}
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </motion.div>
  );
}
