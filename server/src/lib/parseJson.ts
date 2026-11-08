import { jsonrepair } from "jsonrepair";

export function parseJsonFromAI(content: string) {
  const cleaned = content.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("AI response did not contain valid JSON");
  }

  const raw = cleaned.slice(start, end + 1);

  try {
    return JSON.parse(raw);
  } catch {
    return JSON.parse(jsonrepair(raw));
  }
}