import { motion } from "framer-motion";
import { Hero } from "../components/landing/Hero";
import { CategoryCard } from "../components/landing/CategoryCard";
import { categories } from "../data/framework";

export function LandingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <Hero />

      {/* Category Cards Grid */}
      <section className="pb-16">
        <h2 className="text-xl font-semibold text-slate-200 mb-6 text-center">
          5 Categories, 13 Criteria
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </section>

      {/* About the Framework */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="pb-20 max-w-3xl mx-auto"
      >
        <h2 className="text-xl font-semibold text-slate-200 mb-4 text-center">
          About This Framework
        </h2>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 text-sm text-slate-400 leading-relaxed">
          <p>
            This evaluation framework was designed to provide a comprehensive,
            systematic approach to assessing instructional quality. It organizes
            assessment into five distinct categories that together cover the full
            spectrum of course quality — from content accuracy to regulatory
            compliance.
          </p>
          <div>
            <h3 className="font-medium text-slate-300 mb-1">
              Why five categories?
            </h3>
            <p>
              Each category addresses a fundamentally different dimension of
              course quality. Content alignment ensures the material teaches what
              it claims. Instructional design evaluates pedagogical
              effectiveness. Learner experience covers usability and
              accessibility. Technical quality catches functional issues. And
              standards compliance ensures organizational and regulatory
              requirements are met.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-slate-300 mb-1">
              Why a 4-point scale?
            </h3>
            <p>
              A 4-point scale eliminates the "safe middle" that 5-point scales
              encourage. Every rating is a real assessment — the evaluator must
              decide whether a criterion falls below or above the meets-standard
              threshold. This produces more actionable data and clearer
              improvement priorities.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-slate-300 mb-1">
              Designed for action
            </h3>
            <p>
              The framework doesn't just produce a score — it identifies
              specific strengths and areas for improvement, giving course
              developers clear, prioritized feedback they can act on
              immediately.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
