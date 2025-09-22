export function About() {
  return (
    <section
      id="about"
      className="py-20 px-4 bg-gradient-to-b from-[#00010D] to-[#010326] dark:from-[#00010D] dark:to-[#010326] light:from-slate-100 light:to-slate-200"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#A305A6] to-[#660273] bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#660273] to-[#A305A6] mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed text-justify">
              I’m an enthusiastic and driven college student aspiring to build a
              career in UI/UX design. With a passion for crafting user-friendly,
              visually engaging, and accessible digital experiences, I thrive on
              applying creative thinking and problem-solving skills to
              real-world projects. Guided by a solid foundation in design
              principles and a collaborative
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed text-justify">
              mindset, I’m eager to grow through hands-on industry
              experience—continuously refining my skills in user research,
              prototyping, and interface design while contributing meaningful
              value to every team I join.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-4 rounded-lg bg-card/50 border border-[#660273]/20 backdrop-blur-sm">
                <div className="text-2xl font-bold text-[#A305A6] mb-2">3</div>
                <div className="text-sm text-muted-foreground">
                  Projects On Completed
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card/50 border border-[#660273]/20 backdrop-blur-sm">
                <div className="text-2xl font-bold text-[#A305A6] mb-2">
                  Learning & Growing
                </div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
            </div>
          </div>

          {/* DO WAHT EVER YOU WANT */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden border-2 border-[#660273]/30">
              <div className="w-full h-full bg-gradient-to-br from-[#2D0140] to-[#660273] flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎨</div>
                  <p className="text-lg font-semibold">Design Philosophy</p>
                  <p className="text-sm text-gray-300 mt-2">
                    User-centered, data-driven, aesthetically pleasing
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-[#660273] to-[#A305A6] opacity-20 blur-xl rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
