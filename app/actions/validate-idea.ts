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

// Enhanced mock data generator (kept as fallback)
const generateMockValidation = (idea: string): ValidationResult => {
  const ideaLower = idea.toLowerCase()
  const isApp = ideaLower.includes("app") || ideaLower.includes("mobile")
  const isAI =
    ideaLower.includes("ai") || ideaLower.includes("artificial intelligence") || ideaLower.includes("machine learning")
  const isEcommerce =
    ideaLower.includes("ecommerce") ||
    ideaLower.includes("shop") ||
    ideaLower.includes("buy") ||
    ideaLower.includes("marketplace")
  const isSaaS =
    ideaLower.includes("saas") ||
    ideaLower.includes("software") ||
    ideaLower.includes("platform") ||
    ideaLower.includes("dashboard")
  const isHealthcare = ideaLower.includes("health") || ideaLower.includes("medical") || ideaLower.includes("fitness")
  const isFintech =
    ideaLower.includes("fintech") ||
    ideaLower.includes("payment") ||
    ideaLower.includes("banking") ||
    ideaLower.includes("finance")
  const isEducation =
    ideaLower.includes("education") ||
    ideaLower.includes("learning") ||
    ideaLower.includes("course") ||
    ideaLower.includes("teach")

  // Generate user persona based on idea type
  let userPersona = ""
  if (isHealthcare) {
    userPersona =
      "Health-conscious individuals aged 25-45 who actively track their wellness goals and are willing to invest in preventive healthcare solutions. They are tech-savvy, have disposable income, and prioritize convenience in managing their health routines."
  } else if (isFintech) {
    userPersona =
      "Young professionals and millennials aged 22-40 who are digitally native and seek modern financial solutions. They value transparency, low fees, and mobile-first experiences for managing their money and investments."
  } else if (isEducation) {
    userPersona =
      "Lifelong learners, students, and professionals aged 18-50 who are motivated to acquire new skills for career advancement. They prefer flexible, self-paced learning and are comfortable with digital platforms."
  } else if (isApp) {
    userPersona =
      "Tech-savvy millennials and Gen Z users aged 25-40 who are comfortable with mobile technology and seek convenient, on-demand solutions. They value efficiency, user-friendly interfaces, and are willing to pay for services that save them time."
  } else if (isSaaS) {
    userPersona =
      "Small to medium business owners and entrepreneurs who need scalable solutions to streamline their operations. They are budget-conscious but understand the value of investing in tools that improve productivity and ROI."
  } else {
    userPersona =
      "Early adopters and professionals who are looking for innovative solutions to everyday problems. They are willing to try new products and provide feedback to help improve the service."
  }

  // Generate pain points based on idea type
  let painPoints = []
  if (isAI) {
    painPoints = [
      "Manual processes are time-consuming and prone to human error",
      "Lack of personalized solutions that adapt to individual needs",
      "Difficulty in processing and analyzing large amounts of data efficiently",
      "Need for 24/7 availability that human resources cannot provide cost-effectively",
    ]
  } else if (isHealthcare) {
    painPoints = [
      "Difficulty tracking and maintaining consistent health habits",
      "Limited access to personalized healthcare guidance",
      "Fragmented health data across multiple platforms and devices",
      "High costs of traditional healthcare and wellness services",
    ]
  } else if (isFintech) {
    painPoints = [
      "Complex and outdated traditional banking interfaces",
      "High fees and hidden charges from financial institutions",
      "Lack of transparency in financial products and services",
      "Difficulty in managing and tracking multiple financial goals",
    ]
  } else if (isEcommerce) {
    painPoints = [
      "Complicated checkout processes leading to cart abandonment",
      "Lack of personalized shopping experiences and recommendations",
      "Difficulty in finding products that match specific needs and preferences",
      "Poor customer service and limited post-purchase support",
    ]
  } else {
    painPoints = [
      "Current solutions are too expensive or complex for average users",
      "Lack of integration between different tools and platforms",
      "Time-consuming manual processes that could be automated",
      "Poor user experience with existing alternatives in the market",
    ]
  }

  // Generate competitors based on idea type
  let competitors = []
  if (isApp) {
    competitors = [
      "Similar mobile apps in app stores",
      "Web-based alternatives",
      "Traditional service providers",
      "DIY solutions and manual methods",
      "Enterprise software solutions",
    ]
  } else if (isSaaS) {
    competitors = [
      "Established SaaS platforms",
      "Custom enterprise solutions",
      "Open-source alternatives",
      "Traditional desktop software",
      "Manual processes and spreadsheets",
    ]
  } else if (isHealthcare) {
    competitors = [
      "Traditional healthcare providers",
      "Existing fitness and wellness apps",
      "Wearable device ecosystems",
      "Telehealth platforms",
      "Manual tracking methods",
    ]
  } else if (isFintech) {
    competitors = [
      "Traditional banks and credit unions",
      "Existing fintech apps",
      "Investment platforms",
      "Financial advisors",
      "Manual financial management",
    ]
  } else {
    competitors = [
      "Direct competitors in the same niche",
      "Indirect solutions addressing similar problems",
      "Traditional methods and manual processes",
      "Larger enterprise platforms",
      "Free or open-source alternatives",
    ]
  }

  // Generate MVP features based on idea type
  let mvpFeatures = []
  if (isApp) {
    mvpFeatures = [
      "User registration and secure profile management",
      "Core functionality that solves the primary problem",
      "Simple and intuitive mobile-first user interface",
      "Basic analytics and user feedback collection system",
      "Essential integrations with popular third-party services",
    ]
  } else if (isSaaS) {
    mvpFeatures = [
      "User authentication and role-based access control",
      "Primary feature that addresses the core business problem",
      "Dashboard with key metrics and actionable insights",
      "Basic customer support and help documentation",
      "Simple onboarding flow and tutorial system",
    ]
  } else {
    mvpFeatures = [
      "User account creation and basic profile setup",
      "Core feature that delivers the main value proposition",
      "Clean and responsive user interface design",
      "Basic reporting and analytics capabilities",
      "Essential third-party integrations for functionality",
    ]
  }

  // Generate launch advice
  const launchAdvice = [
    "Start with a small, focused target audience to validate your concept and gather initial user feedback",
    "Build a minimum viable product (MVP) with only essential features to test market demand quickly and cost-effectively",
    "Leverage social media and content marketing to build brand awareness and attract early adopters organically",
    "Implement user feedback loops early to continuously improve your product based on real user needs and pain points",
  ]

  return {
    userPersona,
    painPoints,
    competitors,
    mvpFeatures,
    launchAdvice,
  }
}

export async function validateStartupIdea(idea: string): Promise<ValidationResult> {
  try {
    // Check if API key is available
    if (!process.env.ANTHROPIC_API_KEY) {
      console.log("No Anthropic API key found, using enhanced demo mode")
      await new Promise((resolve) => setTimeout(resolve, 2500))
      return generateMockValidation(idea)
    }

    console.log("Using Claude AI for startup validation")

    const { text } = await generateText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      system: `You are an expert startup advisor and product strategist with years of experience in venture capital and startup development. You have helped hundreds of founders validate their ideas and build successful companies. 

You analyze startup ideas with the depth of a seasoned entrepreneur who has:
- Built and sold multiple startups
- Worked as a VC partner evaluating 1000+ pitches annually  
- Mentored founders at top accelerators like Y Combinator and Techstars
- Deep knowledge of market trends, user psychology, and business models

Provide structured, actionable insights that founders can immediately use to validate and improve their business concepts. Be specific, practical, and honest about both opportunities and challenges.`,

      prompt: `Analyze this startup idea and provide a comprehensive validation report:

"${idea}"

Please provide your analysis in the following JSON format:
{
  "userPersona": "A detailed description of the ideal user persona (2-3 sentences with specific demographics, behaviors, motivations, and psychographics)",
  "painPoints": ["specific pain point 1", "specific pain point 2", "specific pain point 3", "specific pain point 4"],
  "competitors": ["direct competitor 1", "indirect competitor 2", "alternative solution 3", "traditional method 4", "emerging competitor 5"],
  "mvpFeatures": ["essential feature 1", "core feature 2", "must-have feature 3", "basic feature 4", "foundational feature 5"],
  "launchAdvice": ["actionable advice 1", "strategic recommendation 2", "tactical step 3", "marketing insight 4"]
}

Guidelines for analysis:
- User persona: Be specific about age ranges, income levels, job roles, tech-savviness, key motivations, and behavioral patterns
- Pain points: Focus on real, validated problems that cause significant frustration, time loss, or financial cost. Quantify when possible.
- Competitors: Include direct competitors, indirect alternatives, current solutions people use, and potential future threats
- MVP features: Only include features absolutely necessary for the core value proposition. Think lean startup methodology.
- Launch advice: Provide specific, actionable steps with clear next actions. Include go-to-market strategies, validation methods, and growth tactics.

Make insights practical and immediately actionable for a founder with limited resources. Consider:
- Market size and addressable market
- Monetization potential and business model viability  
- Technical feasibility and development complexity
- Regulatory or compliance considerations
- Network effects and defensibility
- Customer acquisition cost vs lifetime value potential

Keep each point concise but informative (1-2 sentences max). Base analysis on real market knowledge, startup best practices, and current industry trends. Be honest about challenges while highlighting genuine opportunities.`,
    })

    // Parse the JSON response
    const result = JSON.parse(text) as ValidationResult

    // Validate the structure
    if (
      !result.userPersona ||
      !Array.isArray(result.painPoints) ||
      !Array.isArray(result.competitors) ||
      !Array.isArray(result.mvpFeatures) ||
      !Array.isArray(result.launchAdvice)
    ) {
      throw new Error("Invalid response structure from Claude AI")
    }

    return result
  } catch (error) {
    console.error("Claude AI failed, using enhanced demo mode:", error)

    // Fall back to enhanced demo mode if API fails
    await new Promise((resolve) => setTimeout(resolve, 2500))
    return generateMockValidation(idea)
  }
}
