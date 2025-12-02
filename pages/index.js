import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const DISCORD_INVITE = 'https://discord.gg/ebrPcMKg';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>SciMigo - AI-Powered Math Education | Personalized Online Classes</title>
        <meta name="description" content="Revolutionary AI-powered math education platform. Personalized online classes with AI-generated curriculum, interactive mini-lectures, and intelligent tutoring. Coming January 2026." />
        <meta name="keywords" content="AI education, math classes, online learning, personalized tutoring, AI curriculum, interactive lectures, STEM education" />
        <meta name="author" content="SciMigo" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="SciMigo - AI-Powered Math Education" />
        <meta property="og:description" content="Revolutionary AI-powered math education with personalized classes and AI-generated curriculum. Join the waitlist for early access." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.scimigo.com/" />
        <meta property="og:image" content="https://www.scimigo.com/images/og-image.png" />
        <meta property="og:site_name" content="SciMigo" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SciMigo - AI-Powered Math Education" />
        <meta name="twitter:description" content="Revolutionary AI-powered math education with personalized classes." />
        <meta name="twitter:image" content="https://www.scimigo.com/images/og-image.png" />

        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="canonical" href="https://www.scimigo.com/" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "SciMigo",
              "description": "AI-powered math education platform with personalized online classes",
              "url": "https://www.scimigo.com",
              "logo": "https://www.scimigo.com/images/icon128.png"
            })
          }}
        />
      </Head>
      <main>
        {/* Hero Section */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-primary font-semibold text-sm">🚀 Launching January 2026</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              The Future of Math Education
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              AI-powered personalized online classes with interactive mini-lectures, intelligent tutoring, and curriculum that adapts to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Link
                href="/classes"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
              >
                Join Waitlist
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md border-2 border-primary text-primary hover:bg-primary/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Early bird pricing available • Limited spots
            </p>
          </div>
        </section>

        {/* What We're Building */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">What Makes SciMigo Different</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Not just videos. Not just problem sets. A complete AI-powered learning experience.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-xl bg-card border-2 border-transparent hover:border-primary transition-all">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🎬</span>
                </div>
                <h3 className="text-xl font-bold mb-3">AI-Generated Curriculum</h3>
                <p className="text-muted-foreground">
                  Interactive mini-lectures with professional slides, synchronized narration, and LaTeX-rendered equations. Generated on-demand for any math topic.
                </p>
              </div>
              <div className="p-8 rounded-xl bg-card border-2 border-transparent hover:border-primary transition-all">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Personalized Ask AI</h3>
                <p className="text-muted-foreground">
                  Stuck on a problem? Get instant AI tutoring tailored to your learning style. Hints, solutions, or step-by-step explanations—you choose.
                </p>
              </div>
              <div className="p-8 rounded-xl bg-card border-2 border-transparent hover:border-primary transition-all">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Adaptive Learning Path</h3>
                <p className="text-muted-foreground">
                  Content that adapts to your progress. Master concepts at your own pace with intelligent difficulty adjustment and personalized recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">How It Works</h2>
            <div className="space-y-16">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block mb-4 px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    Step 1
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Watch Interactive Mini-Lectures</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    Engage with professionally-designed slide presentations featuring synchronized narration, LaTeX math rendering, and fragment-by-fragment explanations.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Progressive disclosure for better comprehension</li>
                    <li>• Visual diagrams and animations</li>
                    <li>• Pause and review at your own pace</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📐</div>
                    <p className="font-mono text-lg text-muted-foreground">∫ f(x) dx = F(x) + C</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <p className="text-muted-foreground">AI tutor available 24/7</p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-block mb-4 px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    Step 2
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Ask Your Personal AI Tutor</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    Get instant help when you're stuck. Our AI understands your question and provides explanations tailored to your level.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Choose your learning mode: hints, solutions, or tutorials</li>
                    <li>• Context-aware explanations based on lecture content</li>
                    <li>• Natural conversation interface</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-block mb-4 px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    Step 3
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Master Concepts at Your Pace</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    Progress through carefully structured curriculum designed by educators, powered by AI that adapts to your learning journey.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Track your progress and achievements</li>
                    <li>• Review past lectures anytime</li>
                    <li>• Build deep understanding, not just memorization</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-muted-foreground">Your personalized learning path</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topics Covered */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Topics We Cover</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-xl bg-card border hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">📐</div>
                <h3 className="font-bold mb-2">Calculus</h3>
                <p className="text-sm text-muted-foreground">Limits, derivatives, integrals, series</p>
              </div>
              <div className="p-6 rounded-xl bg-card border hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">🔢</div>
                <h3 className="font-bold mb-2">Linear Algebra</h3>
                <p className="text-sm text-muted-foreground">Matrices, eigenvalues, vector spaces</p>
              </div>
              <div className="p-6 rounded-xl bg-card border hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">🎲</div>
                <h3 className="font-bold mb-2">Probability</h3>
                <p className="text-sm text-muted-foreground">Statistics, distributions, inference</p>
              </div>
              <div className="p-6 rounded-xl bg-card border hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">🔗</div>
                <h3 className="font-bold mb-2">Discrete Math</h3>
                <p className="text-sm text-muted-foreground">Combinatorics, graph theory, proofs</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Behind It */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Powered by Advanced AI</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built on cutting-edge technology developed through years of educational content creation
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-xl border-2 border-muted">
                <h3 className="text-xl font-bold mb-3">🎬 Mini Lecture Pipeline</h3>
                <p className="text-muted-foreground mb-4">
                  Our proprietary system automatically generates complete educational lectures with slides, narration, and video—all from a simple topic description.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Structured lesson specifications with validated schemas</li>
                  <li>• Professional Reveal.js presentations with KaTeX math</li>
                  <li>• High-quality text-to-speech narration</li>
                  <li>• Synchronized video generation with fragment animations</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl border-2 border-muted">
                <h3 className="text-xl font-bold mb-3">🤖 Intelligent Tutoring System</h3>
                <p className="text-muted-foreground mb-4">
                  Multi-agent AI architecture that routes problems to specialized solvers and adapts explanations to your learning style.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Context-aware tutoring based on lecture content</li>
                  <li>• Multiple learning modes (hints, solutions, tutorials)</li>
                  <li>• Natural language understanding of math problems</li>
                  <li>• Step-by-step reasoning with LaTeX formatting</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-gradient-to-r from-primary to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl mb-8 opacity-90">
              Be among the first to experience the future of math education. Join our Discord for early access to our January 2026 launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 text-lg font-bold rounded-md bg-white text-[#5865F2] hover:bg-gray-100 transition-colors shadow-xl"
                onClick={() => {
                  if (typeof gtag !== 'undefined') {
                    gtag('event', 'discord_join', {
                      event_category: 'engagement',
                      event_label: 'homepage_cta',
                      value: 1
                    });
                  }
                }}
              >
                <svg width="24" height="24" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="currentColor"/>
                </svg>
                Join Discord
              </a>
              <Link
                href="/classes"
                className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold rounded-md bg-white text-primary hover:bg-gray-100 transition-colors shadow-xl"
              >
                Learn More
              </Link>
            </div>
            <p className="text-sm mt-6 opacity-75">
              Free to join • Early bird pricing available
            </p>
          </div>
        </section>

        {/* Chrome Extension Note */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground mb-4">
              While we prepare the online classes platform, try our Chrome Extension for instant AI tutoring on any webpage.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/ogpfnkaiaagfgalomgkooidacamanhdg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Get Chrome Extension →
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
