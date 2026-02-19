import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type RatingValue, categories } from "../data/framework";

interface EvaluationState {
  courseName: string;
  evaluatorName: string;
  date: string;
  ratings: Record<string, RatingValue>;
  notes: Record<string, string>;

  setCourseName: (name: string) => void;
  setEvaluatorName: (name: string) => void;
  setRating: (criterionId: string, value: RatingValue) => void;
  setNote: (criterionId: string, note: string) => void;
  resetEvaluation: () => void;

  // Computed helpers
  getRatedCount: () => number;
  getTotalCriteria: () => number;
  isComplete: () => boolean;
  getOverallScore: () => number;
  getCategoryScore: (categoryId: string) => number;
  getCategoryRatedCount: (categoryId: string) => number;
}

const totalCriteria = categories.reduce(
  (sum, cat) => sum + cat.criteria.length,
  0,
);

const initialState = {
  courseName: "",
  evaluatorName: "",
  date: new Date().toISOString().split("T")[0],
  ratings: {} as Record<string, RatingValue>,
  notes: {} as Record<string, string>,
};

export const useEvaluationStore = create<EvaluationState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCourseName: (name) => set({ courseName: name }),
      setEvaluatorName: (name) => set({ evaluatorName: name }),

      setRating: (criterionId, value) =>
        set((state) => ({
          ratings: { ...state.ratings, [criterionId]: value },
        })),

      setNote: (criterionId, note) =>
        set((state) => ({
          notes: { ...state.notes, [criterionId]: note },
        })),

      resetEvaluation: () =>
        set({
          ...initialState,
          date: new Date().toISOString().split("T")[0],
        }),

      getRatedCount: () => {
        const { ratings } = get();
        return Object.values(ratings).filter((v) => v > 0).length;
      },

      getTotalCriteria: () => totalCriteria,

      isComplete: () => {
        const { ratings } = get();
        return (
          Object.values(ratings).filter((v) => v > 0).length === totalCriteria
        );
      },

      getOverallScore: () => {
        const { ratings } = get();
        const rated = Object.values(ratings).filter((v) => v > 0);
        if (rated.length === 0) return 0;
        return rated.reduce<number>((sum, v) => sum + v, 0) / rated.length;
      },

      getCategoryScore: (categoryId) => {
        const { ratings } = get();
        const category = categories.find((c) => c.id === categoryId);
        if (!category) return 0;
        const rated = category.criteria
          .map((cr) => ratings[cr.id] || 0)
          .filter((v) => v > 0);
        if (rated.length === 0) return 0;
        return rated.reduce<number>((sum, v) => sum + v, 0) / rated.length;
      },

      getCategoryRatedCount: (categoryId) => {
        const { ratings } = get();
        const category = categories.find((c) => c.id === categoryId);
        if (!category) return 0;
        return category.criteria.filter((cr) => (ratings[cr.id] || 0) > 0)
          .length;
      },
    }),
    {
      name: "course-evaluation",
    },
  ),
);
