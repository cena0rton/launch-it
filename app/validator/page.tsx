import { Navigation } from "@/components/navigation"
import { IdeaValidator } from "@/components/idea-validator"
import { Footer } from "@/components/footer"

export default function ValidatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900">
      <Navigation />
      <IdeaValidator />
      <Footer />
    </div>
  )
}
