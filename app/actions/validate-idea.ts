"use server"

import { generateText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"

interface ValidationResult {
  userPersona: string
  painPoints: string[]
  competitors: string[]
  mvpFeatures: string[]
  launchAdvice: string[]
}

// Utility: safely parse JSON from Claude
function safeJsonParse(raw: string): ValidationResult {
  try {
    // Remove ```json fences if present
    const cleaned = raw.replace(/```json|```/g, "").trim()

    return JSON.parse(cleaned)
  } catch (err) {
    console.error("❌ Failed to parse Claude JSON:", err, "\nRaw output:", raw)
    throw new Error("Invalid JSON from Claude")
  }
}

export async function validateStartupIdea(idea: string): Promise<ValidationResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("Anthropic API key not found. Set ANTHROPIC_API_KEY in env.")
  }

  try {
    console.log("⚡ Using Claude AI for startup validation")

    const { text } = await generateText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      system: `You are an expert startup advisor and product strategist with years of experience in venture capital and startup development. 
Provide structured, actionable insights in strict JSON format only.`,

      prompt: `Analyze this startup idea and provide a comprehensive validation report:

"${idea}"

Respond ONLY with valid JSON in this format:
{
  "userPersona": "2-3 sentences about the ideal user persona",
  "painPoints": ["pain point 1", "pain point 2", "pain point 3", "pain point 4"],
  "competitors": ["competitor 1", "competitor 2", "competitor 3", "competitor 4", "competitor 5"],
  "mvpFeatures": ["feature 1", "feature 2", "feature 3", "feature 4", "feature 5"],
  "launchAdvice": ["advice 1", "advice 2", "advice 3", "advice 4"]
}`,
    })

    const result = safeJsonParse(text)

    // Minimal validation
    if (
      !result.userPersona ||
      !Array.isArray(result.painPoints) ||
      !Array.isArray(result.competitors) ||
      !Array.isArray(result.mvpFeatures) ||
      !Array.isArray(result.launchAdvice)
    ) {
      throw new Error("Claude returned incomplete structure")
    }

    return result
  } catch (error) {
    console.error("❌ Claude AI failed:", error)
    throw error
  }
}
