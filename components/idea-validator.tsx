"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  Sparkles,
  Users,
  AlertTriangle,
  Zap,
  Rocket,
  ArrowLeft,
  Target,
  Brain,
  CheckCircle,
} from "lucide-react"
import { validateStartupIdea } from "@/app/actions/validate-idea"
import Link from "next/link"

interface ValidationResult {
  userPersona: string
  painPoints: string[]
  competitors: string[]
  mvpFeatures: string[]
  launchAdvice: string[]
}

export function IdeaValidator() {
  const [idea, setIdea] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ValidationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleValidate = async () => {
    if (!idea.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const validation = await validateStartupIdea(idea)
      setResult(validation)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to validate idea. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="min-h-screen py-24 px-6 pt-32">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <Button asChild variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10 mb-8">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">AI Startup Validator</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get comprehensive AI-powered insights about your startup idea in seconds
          </p>
        </div>

        {/* API Status - Now shows Claude AI is active */}
        <Card className="mb-8 bg-white-500/10 to-emerald-500/10 border-green-500/20 backdrop-blur-xl">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-green-400 font-medium mb-1">Claude AI Active</p>
                <p className="text-green-500 text-sm">
                  Powered by Anthropic's Claude 3.5 Sonnet - the most advanced AI for startup analysis. Get
                  professional-grade insights from an AI trained on thousands of successful startups.<span className="text-red-500 text-sm">This is a demo version of the app and uses basic API key.It is not a production ready app.So sometimes it may not work as expected.</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Card */}
        <Card className="mb-8 bg-white/5 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Sparkles className="h-5 w-5 text-red-400" />
              Describe Your Startup Idea
            </CardTitle>
            <CardDescription className="text-gray-300">
              Be as detailed as possible. Include the problem you're solving, your target audience, and your proposed
              solution. The more context you provide, the better Claude's analysis will be.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Example: A mobile app that helps busy professionals meal plan by generating personalized weekly menus based on dietary preferences, cooking time constraints, and local grocery store inventory. Users can input their dietary restrictions, available cooking time, and preferred grocery stores, and the app creates optimized meal plans with automated shopping lists..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="min-h-40 resize-none bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-red-400"
              maxLength={2000}
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{idea.length}/2000 characters</span>
              <Button
                onClick={handleValidate}
                disabled={!idea.trim() || isLoading}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Claude is analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analyze with Claude AI
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error State */}
        {error && (
          <Card className="mb-8 bg-red-500/10 border-red-500/20 backdrop-blur-xl">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-200 font-medium mb-1">Analysis Failed</p>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-in fade-in-50 duration-700">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-green-300">Claude AI Analysis Complete</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Your Startup Validation Report</h2>
              <p className="text-gray-300 text-lg">Expert AI insights to help you build a successful startup</p>
            </div>

            {/* Key Insights Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {/* User Persona Card */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-xl group-hover:blur-lg transition-all duration-300" />
                <Card className="relative bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-white">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Users className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold">Target User Persona</div>
                        <div className="text-sm text-gray-400 font-normal">Who will use your product</div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                      <p className="text-gray-200 leading-relaxed text-sm">{result.userPersona}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Pain Points Card */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl blur-xl group-hover:blur-lg transition-all duration-300" />
                <Card className="relative bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-white">
                      <div className="p-2 bg-orange-500/20 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-orange-400" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold">Problems You Solve</div>
                        <div className="text-sm text-gray-400 font-normal">Key pain points addressed</div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.painPoints.map((point, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-orange-500/5 rounded-lg border border-orange-500/20"
                        >
                          <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-semibold text-orange-300">{index + 1}</span>
                          </div>
                          <span className="text-gray-200 text-sm leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* MVP Features Card */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl group-hover:blur-lg transition-all duration-300" />
                <Card className="relative bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-white">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Rocket className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold">Essential MVP Features</div>
                        <div className="text-sm text-gray-400 font-normal">Start with these core features</div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.mvpFeatures.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-green-500/5 rounded-lg border border-green-500/20"
                        >
                          <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Zap className="h-3 w-3 text-green-400" />
                          </div>
                          <span className="text-gray-200 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Competitors Card */}
              <div className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl group-hover:blur-lg transition-all duration-300" />
                <Card className="relative bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-white">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Target className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold">Competitive Landscape</div>
                        <div className="text-sm text-gray-400 font-normal">Know your competition</div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {result.competitors.map((competitor, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-purple-500/10 text-purple-200 border-purple-500/20 hover:bg-purple-500/20 transition-colors px-3 py-1"
                        >
                          {competitor}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-purple-500/5 rounded-lg border border-purple-500/20">
                      <p className="text-xs text-gray-300">
                        💡 <strong>Tip:</strong> Study these competitors to identify gaps and opportunities in the
                        market.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Launch Strategy Section */}
            <div className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl blur-xl group-hover:blur-lg transition-all duration-300" />
              <Card className="relative bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <div className="p-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg">
                      <Sparkles className="h-6 w-6 text-red-400" />
                    </div>
                    <div>
                      <div className="text-xl font-bold">Launch Strategy & Next Steps</div>
                      <div className="text-sm text-gray-400 font-normal">Your roadmap to success</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {result.launchAdvice.map((advice, index) => (
                      <div
                        key={index}
                        className="group/item flex items-start gap-4 p-4 bg-gradient-to-r from-red-500/5 to-pink-500/5 rounded-lg border border-red-500/20 hover:border-red-500/30 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200">
                          <span className="text-sm font-bold text-red-300">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-200 leading-relaxed text-sm">{advice}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-lg border border-red-500/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold mb-1">Ready to build your startup?</h4>
                        <p className="text-gray-300 text-sm">
                          Use these Claude AI insights to create your MVP and validate your market fit.
                        </p>
                      </div>
                      <Button
                        className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 ml-4"
                        onClick={() => {
                          setIdea("")
                          setResult(null)
                        }}
                      >
                        Analyze Another Idea
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Download/Share Options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 border-t border-white/10">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                📄 Export as PDF
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                📧 Email Report
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                🔗 Share Link
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
