import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          {/* Copyright */}
          <p className="text-sm text-gray-400">© 2024 Pawan Mishra. All rights reserved.</p>

          {/* Credits */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Built with</span>
            <Heart className="h-3 w-3 text-red-400 fill-current" />
            <span>using</span>
            <a
              href="https://ui.aceternity.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-200 underline underline-offset-2"
            >
              Aceternity UI
            </a>
            <span>components</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
