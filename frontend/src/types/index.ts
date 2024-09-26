export type User = {
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
};

export type UserProgress = {
  userId: string;
  completedQuestions: string[];
  allowedLessons: number[];
};
