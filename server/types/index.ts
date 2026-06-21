export interface UserProfile {
  goal: string;
  experience: string;
  days_per_week: number;
  session_length: number;
  equipment: string;
  injuries?: string | null;
  preferred_split: string;
  bodyWeight: number | null;
  gender: string | null;

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
  time: string;           // e.g. "8:00 AM"
  calories: number;
  protein: number;        // grams
  carbs: number;
  fats: number;
  foods: string[];        // e.g. ["4 egg whites", "oats 80g"]
  notes?: string;
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
  protein: number;   // g
  carbs: number;     // g
  fats: number;      // g
}



