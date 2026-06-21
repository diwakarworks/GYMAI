import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import { generateDietPlan } from "../lib/dietAi";

export const dietRouter = Router();

dietRouter.post("/generate", async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const profile = await prisma.user_profiles.findUnique({
      where: { user_id: userId },
    });

    if (!profile) {
      return res
        .status(400)
        .json({ error: "User profile not found. Complete onboarding first." });
    }

    if (!profile.bodyweight) {
      return res
        .status(400)
        .json({ error: "Bodyweight is required. Update your profile first." });
    }

    const latestPlan = await prisma.diet_plans.findFirst({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
      select: { version: true },
    });

    const nextVersion = latestPlan ? latestPlan.version + 1 : 1;

    let planJson;
    try {
      planJson = await generateDietPlan(profile);
    } catch (error) {
      console.error("AI generation failed:", error);
      return res.status(500).json({
        error: "Failed to generate diet plan. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }

    const planText = JSON.stringify(planJson, null, 2);

    const newPlan = await prisma.diet_plans.create({
      data: {
        user_id: userId,
        plan_json: planJson as any,
        plan_text: planText,
        version: nextVersion,
      },
    });

    res.json({
      id: newPlan.id,
      version: newPlan.version,
      createdAt: newPlan.created_at,
    });
  } catch (error) {
    console.error("Error generating diet plan:", error);
    res.status(500).json({ error: "Failed to generate diet plan" });
  }
});

dietRouter.get("/current", async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const plan = await prisma.diet_plans.findFirst({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
    });

    if (!plan) {
      return res.status(404).json({ error: "No diet plan found" });
    }

    res.json({
      id: plan.id,
      userId: plan.user_id,
      planJson: plan.plan_json,
      planText: plan.plan_text,
      version: plan.version,
      createdAt: plan.created_at,
    });
  } catch (error) {
    console.error("Error fetching diet plan:", error);
    res.status(500).json({ error: "Failed to fetch diet plan" });
  }
});