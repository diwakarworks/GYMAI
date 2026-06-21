export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface UserProfile {
  userId: string;
  goal: "cut" | "bulk" | "recomp" | "strength" | "endurance";
  experience: "beginner" | "intermediate" | "advanced";
  daysPerWeek: number;
  sessionLength: number;
  equipment: "full_gym" | "home" | "dumbbells";
  injuries?: string;
  preferredSplit: "full_body" | "upper_lower" | "ppl" | "custom";
  bodyWeight: number;
  gender: string;
  updatedAt: string;
}

export interface PlanOverview {
  goal: string;
  frequency: string;
  split: string;
  notes: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  rpe: number;
  notes?: string;
  alternatives?: string[];
}

export interface DaySchedule {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface TrainingPlan {
  id: string;
  userId: string;
  overview: PlanOverview;
  weeklySchedule: DaySchedule[];
  progression: string;
  version: number;
  createdAt: string;
}

export interface Meal {
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  foods: string[];
  notes?: string;
}

export interface DietOverview {
  goal: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  notes: string;
}

export interface MacroTargets {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DietPlan {
  id: string;
  userId: string;
  overview: DietOverview;
  dailyTargets: MacroTargets;
  mealSchedule: Meal[];
  foodsToEat: string[];
  foodsToAvoid: string[];
  supplements?: string[];
  hydration: string;
  version: number;
  createdAt: string;
}
