export interface QuestionItem {
  question: string;
  type: number;
  index: number;
  checklist?: string[];
}

export interface SubCategory {
  title: string;
  index: string;
  questionsSet: QuestionItem[];
}

export interface Category {
  categoryTitle: string;
  categoryIndex?: string;
  questionsSet?: QuestionItem[];
  subCategories?: SubCategory[];
}

export interface QuestionSection {
  mainTitle: string;
  mainIndex: string;
  categories: Category[];
}

export interface User {
  id: string;
  role: string;
  score: number;
  submittedAt: string;
  answers: Record<string, unknown>;
}

export interface SubmissionPayload {
  answers: Record<string, unknown>;
  role: string;
  score: number;
  scoresBySection: Record<string, number>;
}
