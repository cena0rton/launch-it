import { Brain, Target, Zap, Users, TrendingUp, Lightbulb } from "lucide-react"

const features = [
  {
    name: "AI-Powered Analysis",
    description: "Advanced AI analyzes your idea from multiple angles to provide comprehensive insights.",
    icon: Brain,
  },
  {
    name: "Target Audience Identification",
    description: "Discover your ideal user persona and understand who will benefit most from your solution.",
    icon: Users,
  },
  {
    name: "Competitive Intelligence",
    description: "Identify existing competitors and understand the competitive landscape.",
    icon: Target,
  },
  {
    name: "MVP Feature Planning",
    description: "Get recommendations for essential features to include in your minimum viable product.",
    icon: Zap,
  },
  {
    name: "Launch Strategy",
    description: "Receive actionable advice on how to successfully launch and market your startup.",
    icon: TrendingUp,
  },
  {
    name: "Problem Validation",
    description: "Understand the real pain points your startup idea addresses in the market.",
    icon: Lightbulb,
  },
]

export function FeatureSection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to validate your startup idea
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our AI-powered platform provides comprehensive analysis to help you make informed decisions about your
            startup journey.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-purple-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
