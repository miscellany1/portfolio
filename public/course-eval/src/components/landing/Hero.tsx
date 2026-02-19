import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="py-20 sm:py-28 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Course Evaluation
          <br />
          <span className="text-green-400">Framework</span>
        </h1>
        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
          A systematic rubric for evaluating instructional quality across content
          alignment, design, learner experience, technical quality, and
          compliance.
        </p>
        <Link
          to="/evaluate"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
        >
          Start Evaluation
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
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
