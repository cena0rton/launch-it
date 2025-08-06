import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import CoverDemo from "@/components/cover-demo"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-gray-300">AI-Powered Startup Validation</span>
        </div>

        {/* Main Heading with Cover Animation */}
        <CoverDemo />

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          Transform your startup ideas into validated business opportunities with AI-powered insights, market analysis,
          and actionable launch strategies.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 rounded-xl px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-red-500/25 transition-all duration-300"
          >
            <Link href="/validator" className="flex items-center gap-2">
              Validate Your Idea
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/10 rounded-xl px-8 py-4 text-lg backdrop-blur-sm bg-transparent"
          >
            Watch Demo
          </Button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
          {[
            { icon: Zap, text: "Instant Analysis" },
            { icon: Target, text: "Market Research" },
            { icon: TrendingUp, text: "Launch Strategy" },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <feature.icon className="h-4 w-4 text-red-400" />
              <span className="text-sm text-gray-300">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-16 pt-8 border-t border-white/10 py-10">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">1000+</div>
            <div className="text-sm text-gray-400">Ideas Validated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">95%</div>
            <div className="text-sm text-gray-400">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">24/7</div>
            <div className="text-sm text-gray-400">AI Available</div>
          </div>
        </div>
      </div>
    </section>
  )
}
