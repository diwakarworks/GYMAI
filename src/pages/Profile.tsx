import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import {
  Calendar,
  Dumbbell,
  RefreshCcw,
  Target,
  TrendingUp,
  Utensils,
  Flame,
  Beef,
  Wheat,
  Droplets,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { PlanDisplay } from "../components/plan/planDisplay";

export default function Profile() {
  const { user, isLoading, plan, generatePlan, dietPlan, generateDietPlan } = useAuth();

  if (!user && !isLoading) return <Navigate to="/auth/sign-in" replace />;
  if (!plan) return <Navigate to="/onboarding" replace />;

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">

        {/* ── Training Plan Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Your Training Plan</h1>
            <p className="text-[var(--color-muted)]">
              Version {plan.version} • Created {formatDate(plan.createdAt)}
            </p>
          </div>
          <Button variant="secondary" className="gap-2" onClick={async () => await generatePlan()}>
            <RefreshCcw className="w-4 h-4" />
            Regenerate Plan
          </Button>
        </div>

        {/* ── Training Stats ── */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Target className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-muted)]">Goal</p>
              <p className="font-medium text-sm">{plan.overview.goal}</p>
            </div>
          </Card>
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-muted)]">Frequency</p>
              <p className="font-medium text-sm">{plan.overview.frequency}</p>
            </div>
          </Card>
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-muted)]">Split</p>
              <p className="font-medium text-sm">{plan.overview.split}</p>
            </div>
          </Card>
          <Card variant="bordered" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-muted)]">Version</p>
              <p className="font-medium text-sm">{plan.version}</p>
            </div>
          </Card>
        </div>

        {/* ── Program Notes ── */}
        <Card variant="bordered" className="mb-8">
          <h2 className="font-semibold text-lg mb-2">Program Notes</h2>
          <p className="text-[var(--color-muted)] text-sm leading-relaxed">
            {plan.overview.notes}
          </p>
        </Card>

        {/* ── Weekly Schedule ── */}
        <h2 className="font-semibold text-xl mb-4">Weekly Schedule</h2>
        <PlanDisplay weeklySchedule={plan.weeklySchedule} />

        <Card variant="bordered" className="mb-12">
          <h2 className="font-semibold text-lg mb-2">Progression Strategy</h2>
          <p className="text-[var(--color-muted)] text-sm leading-relaxed">
            {plan.progression}
          </p>
        </Card>

        {/* ── Diet Plan Header ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Your Diet Plan</h1>
            {dietPlan ? (
              <p className="text-[var(--color-muted)]">
                Version {dietPlan.version} • Created {formatDate(dietPlan.createdAt)}
              </p>
            ) : (
              <p className="text-[var(--color-muted)]">No diet plan generated yet.</p>
            )}
          </div>
          <Button variant="secondary" className="gap-2" onClick={async () => await generateDietPlan()}>
            <RefreshCcw className="w-4 h-4" />
            {dietPlan ? "Regenerate Diet Plan" : "Generate Diet Plan"}
          </Button>
        </div>

        {dietPlan && (
          <>
            {/* ── Macro Stats ── */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card variant="bordered" className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)]">Calories</p>
                  <p className="font-medium text-sm">{dietPlan.dailyTargets.calories} kcal</p>
                </div>
              </Card>
              <Card variant="bordered" className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Beef className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)]">Protein</p>
                  <p className="font-medium text-sm">{dietPlan.dailyTargets.protein}g</p>
                </div>
              </Card>
              <Card variant="bordered" className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Wheat className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)]">Carbs</p>
                  <p className="font-medium text-sm">{dietPlan.dailyTargets.carbs}g</p>
                </div>
              </Card>
              <Card variant="bordered" className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)]">Fats</p>
                  <p className="font-medium text-sm">{dietPlan.dailyTargets.fats}g</p>
                </div>
              </Card>
            </div>

            {/* ── Diet Notes ── */}
            <Card variant="bordered" className="mb-8">
              <h2 className="font-semibold text-lg mb-2">Diet Overview</h2>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                {dietPlan.overview.notes}
              </p>
              <p className="text-[var(--color-muted)] text-sm mt-2">
                💧 {dietPlan.hydration}
              </p>
            </Card>

            {/* ── Meal Schedule ── */}
            <h2 className="font-semibold text-xl mb-4">Meal Schedule</h2>
            <div className="space-y-4 mb-8">
              {dietPlan.mealSchedule.map((meal, i) => (
                <Card key={i} variant="bordered">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-[var(--color-accent)]" />
                      <h3 className="font-semibold">{meal.name}</h3>
                      <span className="text-xs text-[var(--color-muted)]">{meal.time}</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--color-accent)]">
                      {meal.calories} kcal
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-[var(--color-muted)] mb-3">
                    <span>Protein: {meal.protein}g</span>
                    <span>Carbs: {meal.carbs}g</span>
                    <span>Fats: {meal.fats}g</span>
                  </div>
                  <ul className="space-y-1">
                    {meal.foods.map((food, j) => (
                      <li key={j} className="text-sm text-[var(--color-muted)] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block" />
                        {food}
                      </li>
                    ))}
                  </ul>
                  {meal.notes && (
                    <p className="text-xs text-[var(--color-muted)] mt-2 italic">{meal.notes}</p>
                  )}
                </Card>
              ))}
            </div>

            {/* ── Foods To Eat / Avoid ── */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card variant="bordered">
                <h2 className="font-semibold text-lg mb-3 text-green-500">✅ Foods to Eat</h2>
                <ul className="space-y-1">
                  {dietPlan.foodsToEat.map((food, i) => (
                    <li key={i} className="text-sm text-[var(--color-muted)] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                      {food}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card variant="bordered">
                <h2 className="font-semibold text-lg mb-3 text-red-500">❌ Foods to Avoid</h2>
                <ul className="space-y-1">
                  {dietPlan.foodsToAvoid.map((food, i) => (
                    <li key={i} className="text-sm text-[var(--color-muted)] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                      {food}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* ── Supplements ── */}
            {dietPlan.supplements && dietPlan.supplements.length > 0 && (
              <Card variant="bordered" className="mb-8">
                <h2 className="font-semibold text-lg mb-3">Supplements</h2>
                <ul className="space-y-1">
                  {dietPlan.supplements.map((s, i) => (
                    <li key={i} className="text-sm text-[var(--color-muted)] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block" />
                      {s}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </>
        )}

      </div>
    </div>
  );
}