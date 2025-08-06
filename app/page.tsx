import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900">
      <Navigation />
      <HeroSection className="py-10"/>
      <Footer />
    </div>
  )
}
