import OpenAI from "openai";
import dotenv from "dotenv";
import { DietPlan, UserProfile } from "../../types";

dotenv.config();

export async function generateDietPlan(
  profile: UserProfile | Record<string, any>
): Promise<Omit<DietPlan, "id" | "userId" | "version" | "createdAt">> {
  const normalizedProfile = {
    goal: profile.goal || "bulk",
    experience: profile.experience || "intermediate",
    days_per_week: profile.days_per_week || 4,
    bodyweight: profile.bodyWeight || 70,
    gender: profile.gender || "male",
    injuries: profile.injuries || null,
  };

  const apiKey = process.env.OPEN_ROUTER_KEY;
  if (!apiKey) throw new Error("OPEN_ROUTER_KEY is not set");

  const openai = new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": process.env.BASE_URL || "http://localhost:3001",
      "X-Title": "GymAI Diet Generator",
    },
  });

  const prompt = buildDietPrompt(normalizedProfile);

  try {
    const completion = await openai.chat.completions.create({
      model: "openrouter/auto",
      messages: [
        {
          role: "system",
          content:
            "You are an expert sports nutritionist and diet coach. You must respond with valid JSON only. Do not include any markdown, reasoning, or additional text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error("No content in AI response");

    const planData = JSON.parse(content);
    return formatDietResponse(planData, normalizedProfile);
  } catch (error) {
    console.error("[AI] Error generating diet plan:", error);
    throw error;
  }
}

function formatDietResponse(
  aiResponse: any,
  profile: any
): Omit<DietPlan, "id" | "userId" | "version" | "createdAt"> {
  return {
    overview: {
      goal: aiResponse.overview?.goal || profile.goal,
      calories: aiResponse.overview?.calories || 2000,
      protein: aiResponse.overview?.protein || 150,
      carbs: aiResponse.overview?.carbs || 200,
      fats: aiResponse.overview?.fats || 70,
      notes: aiResponse.overview?.notes || "Follow this plan consistently.",
    },
    dailyTargets: {
      calories: aiResponse.dailyTargets?.calories || aiResponse.overview?.calories || 2000,
      protein: aiResponse.dailyTargets?.protein || aiResponse.overview?.protein || 150,
      carbs: aiResponse.dailyTargets?.carbs || aiResponse.overview?.carbs || 200,
      fats: aiResponse.dailyTargets?.fats || aiResponse.overview?.fats || 70,
    },
    mealSchedule: (aiResponse.mealSchedule || []).map((meal: any) => ({
      name: meal.name || "Meal",
      time: meal.time || "8:00 AM",
      calories: meal.calories || 0,
      protein: meal.protein || 0,
      carbs: meal.carbs || 0,
      fats: meal.fats || 0,
      foods: meal.foods || [],
      notes: meal.notes || "",
    })),
    foodsToEat: aiResponse.foodsToEat || [],
    foodsToAvoid: aiResponse.foodsToAvoid || [],
    supplements: aiResponse.supplements || [],
    hydration: aiResponse.hydration || "Drink 3-4 litres of water daily.",
  };
}

function buildDietPrompt(profile: any): string {
  const goalMap: Record<string, string> = {
    bulk: "build muscle mass — needs a caloric surplus",
    cut: "lose fat while preserving muscle — needs a caloric deficit",
    recomp: "body recomposition — needs maintenance calories with high protein",
    strength: "maximize strength — needs adequate calories and high protein",
    endurance: "improve endurance — needs higher carbs for energy",
  };

  return `Create a personalized daily diet plan for someone with the following profile:

Goal: ${goalMap[profile.goal] || profile.goal}
Bodyweight: ${profile.bodyWeight} kg
Gender: ${profile.gender}
Experience: ${profile.experience}
Training days/week: ${profile.days_per_week}
${profile.injuries ? `Health conditions/injuries: ${profile.injuries}` : ""}

Instructions:
1. Calculate BMR using Mifflin-St Jeor formula
2. Multiply by activity factor based on ${profile.days_per_week} training days/week (use 1.55 for 4+ days, 1.375 for 2-3 days)
3. Adjust for goal: bulk = TDEE+400, cut = TDEE-500, recomp/strength/endurance = TDEE
4. Set protein at minimum 2.2g per kg bodyweight
5. Distribute remaining calories between carbs and fats (60/40 split for bulk, 40/60 for cut)
6. Prefer Indian-friendly foods where possible

Return ONLY valid JSON with this exact structure:
{
  "overview": {
    "goal": "one-line description of the diet goal",
    "calories": 2800,
    "protein": 165,
    "carbs": 320,
    "fats": 80,
    "notes": "2-3 sentences explaining the approach and why"
  },
  "dailyTargets": {
    "calories": 2800,
    "protein": 165,
    "carbs": 320,
    "fats": 80
  },
  "mealSchedule": [
    {
      "name": "Breakfast",
      "time": "7:30 AM",
      "calories": 600,
      "protein": 35,
      "carbs": 70,
      "fats": 15,
      "foods": ["4 egg whites + 2 whole eggs scrambled", "2 slices whole wheat toast", "1 banana", "200ml milk"],
      "notes": "Eat within 30 mins of waking"
    }
  ],
  "foodsToEat": ["Chicken breast", "Eggs", "Brown rice", "Oats", "Paneer", "Dal", "Sweet potato", "Greek yogurt"],
  "foodsToAvoid": ["Fried foods", "Refined sugar", "White bread", "Soft drinks", "Alcohol", "Processed snacks"],
  "supplements": ["Whey protein post-workout", "Creatine 5g daily", "Multivitamin"],
  "hydration": "Drink 4 litres of water daily. Add electrolytes on training days."
}

Include 5-6 meals. Return ONLY the JSON object, no markdown, no extra text.`;
}