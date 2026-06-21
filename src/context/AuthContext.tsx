import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { TrainingPlan, DietPlan, User, UserProfile } from "../types";
import { authClient } from "../lib/auth";
import { api } from "../lib/api";

interface AuthContextType {
  user: User | null;
  plan: TrainingPlan | null;
  dietPlan: DietPlan | null;
  isLoading: boolean;
  saveProfile: (profile: Omit<UserProfile, "userId" | "updatedAt">) => Promise<void>;
  generatePlan: () => Promise<void>;
  generateDietPlan: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [neonUser, setNeonUser] = useState<any>(null);
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isRefreshingRef = useRef(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const result = await authClient.getSession();
        if (result && result.data?.user) {
          setNeonUser(result.data.user);
        } else {
          setNeonUser(null);
        }
      } catch (err) {
        setNeonUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (neonUser?.id) {
        refreshData();
      } else {
        setPlan(null);
        setDietPlan(null);
      }
      setIsLoading(false);
    }
  }, [neonUser?.id, isLoading]);

  const refreshData = useCallback(async () => {
    if (!neonUser || isRefreshingRef.current) return;
    isRefreshingRef.current = true;
    try {
      const planData = await api.getCurrentPlan(neonUser.id).catch(() => null);
      if (planData) {
        setPlan({
          id: planData.id,
          userId: planData.userId,
          overview: planData.planJson.overview,
          weeklySchedule: planData.planJson.weeklySchedule,
          progression: planData.planJson.progression,
          version: planData.version,
          createdAt: planData.createdAt,
        });
      }

      const dietData = await api.getCurrentDietPlan(neonUser.id).catch(() => null);
      if (dietData) {
        setDietPlan({
          id: dietData.id,
          userId: dietData.userId,
          overview: dietData.planJson.overview,
          dailyTargets: dietData.planJson.dailyTargets,
          mealSchedule: dietData.planJson.mealSchedule,
          foodsToEat: dietData.planJson.foodsToEat,
          foodsToAvoid: dietData.planJson.foodsToAvoid,
          supplements: dietData.planJson.supplements,
          hydration: dietData.planJson.hydration,
          version: dietData.version,
          createdAt: dietData.createdAt,
        });
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      isRefreshingRef.current = false;
    }
  }, [neonUser?.id]);

  async function saveProfile(profileData: Omit<UserProfile, "userId" | "updatedAt">) {
    if (!neonUser) throw new Error("User must be authenticated to save profile");
    await api.saveProfile(neonUser.id, profileData);
    await refreshData();
  }

  async function generatePlan() {
    if (!neonUser) throw new Error("User must be authenticated to generate plan");
    await api.generatePlan(neonUser.id);
    await refreshData();
  }

  async function generateDietPlan() {
    if (!neonUser) throw new Error("User must be authenticated to generate diet plan");
    await api.generateDietPlan(neonUser.id);
    await refreshData();
  }

  return (
    <AuthContext.Provider
      value={{
        user: neonUser,
        plan,
        dietPlan,
        isLoading,
        saveProfile,
        generatePlan,
        generateDietPlan,
        refreshData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}