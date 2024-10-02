export type User = {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  gem: number;
  lifePoint: number;
  point: number;
  createdAt: string;
};

export type Unit = {
  _id: string;
  title: string;
  description: string;
};

export type Lesson = {
  _id: string;
  title: string;
  unitId: string;
  questions: string[];
  order: number;
};

export type UserProgress = {
  userId: string;
  completedQuestions: string[];
  allowedLessons: number[];
};

export type Options = {
  name: string;
  correct: boolean;
};

export type Question = {
  _id: string;
  type: "SELECT" | "ASSIST";
  data: {
    question: string;
    options: Options[];
  };
  lessonId: string;
};
