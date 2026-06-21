-- AlterTable
ALTER TABLE "user_profiles" ADD COLUMN     "bodyweight" DOUBLE PRECISION,
ADD COLUMN     "gender" VARCHAR(10);

-- CreateTable
CREATE TABLE "diet_plans" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "plan_json" JSONB NOT NULL,
    "plan_text" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "diet_plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_diet_plans_user_id" ON "diet_plans"("user_id");
