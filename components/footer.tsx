export function Footer() {
  return (
    <footer className="bg-[#010326] border-t border-[#2D0140]/30 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#A305A6] to-[#660273] bg-clip-text text-transparent">
              UI/UX Designer
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Crafting digital experiences that blend creativity with functionality. Specialized in user-centered design
              with Figma expertise.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#A305A6]">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#about" className="text-gray-300 hover:text-[#A305A6] transition-colors text-sm">
                About
              </a>
              <a href="#projects" className="text-gray-300 hover:text-[#A305A6] transition-colors text-sm">
                Projects
              </a>
              <a href="#services" className="text-gray-300 hover:text-[#A305A6] transition-colors text-sm">
                Services
              </a>
              <a href="#contact" className="text-gray-300 hover:text-[#A305A6] transition-colors text-sm">
                Contact
              </a>
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#A305A6]">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#2D0140] hover:bg-[#660273] rounded-full flex items-center justify-center transition-colors group"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#2D0140] hover:bg-[#660273] rounded-full flex items-center justify-center transition-colors group"
                aria-label="Dribbble"
              >
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm9.568 7.375c.77 1.423 1.216 3.06 1.216 4.625 0 .414-.025.823-.075 1.226-.318-.07-3.503-.777-6.646-.777-.136 0-.27.003-.403.009-.093-.226-.186-.455-.288-.682-.315-.705-.658-1.39-1.013-2.058 2.91-1.2 4.37-2.896 4.37-2.896.839.653 1.839 1.553 1.839 1.553zm-1.568-2.375s-1.46 1.696-4.37 2.896c-.915-1.68-1.93-3.112-2.06-3.334C15.99 3.51 18.425 4.688 20 6zm-8 .625c.13.222 1.145 1.654 2.06 3.334-2.583 1.075-4.85 1.05-5.1 1.05-.34-1.545-.34-3.18 0-4.725.25 0 2.517.025 5.1-1.05zm-5.568 6.375c0-.414.025-.823.075-1.226.318.07 3.503.777 6.646.777.136 0 .27-.003.403-.009.093.226.186.455.288.682.315.705.658 1.39 1.013 2.058-2.91 1.2-4.37 2.896-4.37 2.896-.839-.653-1.839-1.553-1.839-1.553.77-1.423 1.216-3.06 1.216-4.625zm1.568 2.375s1.46-1.696 4.37-2.896c.915 1.68 1.93 3.112 2.06 3.334-2.42 1.052-4.855-.126-6.43-1.438z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#2D0140] hover:bg-[#660273] rounded-full flex items-center justify-center transition-colors group"
                aria-label="Behance"
              >
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 7.5v9c0 .825.675 1.5 1.5 1.5h21c.825 0 1.5-.675 1.5-1.5v-9c0-.825-.675-1.5-1.5-1.5h-21c-.825 0-1.5.675-1.5 1.5zm22.5 0v9h-21v-9h21zm-20.25 1.5v6h3.75c1.24 0 2.25-1.01 2.25-2.25s-1.01-2.25-2.25-2.25h-1.5v-1.5h-2.25zm2.25 3h1.5c.414 0 .75.336.75.75s-.336.75-.75.75h-1.5v-1.5zm7.5-3v6h3.75c1.24 0 2.25-1.01 2.25-2.25 0-.621-.252-1.183-.659-1.591.407-.408.659-.97.659-1.591 0-1.24-1.01-2.25-2.25-2.25h-3.75zm2.25 1.5h1.5c.414 0 .75.336.75.75s-.336.75-.75.75h-1.5v-1.5zm0 3h1.5c.414 0 .75.336.75.75s-.336.75-.75.75h-1.5v-1.5z" />
                </svg>
              </a>
            </div>
            <p className="text-gray-400 text-xs">Available for freelance projects</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-[#2D0140]/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 UI/UX Designer Portfolio. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-[#A305A6] text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-[#A305A6] text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
