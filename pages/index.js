import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>SciMigo - AI-Powered STEM Tutor | Math, Computer Science & Algorithms</title>
        <meta name="description" content="Get instant AI tutoring for math, computer science, and algorithms. Highlight any equation or code snippet for step-by-step explanations. Free Chrome extension available." />
        <meta name="keywords" content="AI tutor, STEM education, math help, computer science, algorithms, calculus, data structures, coding help, homework help" />
        <meta name="author" content="SciMigo" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="SciMigo - AI-Powered STEM Tutor | Math, Computer Science & Algorithms" />
        <meta property="og:description" content="Get instant AI tutoring for math, computer science, and algorithms. Highlight any equation or code snippet for step-by-step explanations. Free Chrome extension available." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.scimigo.com/" />
        <meta property="og:image" content="https://www.scimigo.com/images/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="SciMigo AI-Powered STEM Tutor - Math, CS, Algorithms" />
        <meta property="og:site_name" content="SciMigo" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SciMigo - AI-Powered STEM Tutor | Math, Computer Science & Algorithms" />
        <meta name="twitter:description" content="Get instant AI tutoring for math, computer science, and algorithms. Highlight any equation or code snippet for step-by-step explanations. Free Chrome extension available." />
        <meta name="twitter:image" content="https://www.scimigo.com/images/og-image.png" />
        <meta name="twitter:image:alt" content="SciMigo AI-Powered STEM Tutor - Math, CS, Algorithms" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="canonical" href="https://www.scimigo.com/" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SciMigo",
              "description": "AI-Powered STEM Tutor for Math, Computer Science & Algorithms",
              "url": "https://www.scimigo.com",
              "logo": "https://www.scimigo.com/images/icon128.png",
              "sameAs": [
                "https://chromewebstore.google.com/detail/ogpfnkaiaagfgalomgkooidacamanhdg"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@scimigo.com"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free AI tutoring service"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "SciMigo Chrome Extension",
              "description": "AI-powered tutoring browser extension for STEM subjects including mathematics, computer science, and algorithms",
              "url": "https://chromewebstore.google.com/detail/ogpfnkaiaagfgalomgkooidacamanhdg",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Chrome Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "SciMigo"
              }
            })
          }}
        />
      </Head>
      <main>
        {/* Hero Section */}
        <section className="relative py-24 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
              AI-Powered STEM Tutor
            </h1>
            <div className="bg-primary/10 border border-primary/20 rounded-lg px-6 py-4 max-w-3xl mx-auto mb-8">
              <p className="text-lg text-primary font-semibold text-center">
                🎯 Making high-quality AI tutoring accessible to everyone, everywhere
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://chromewebstore.google.com/detail/ogpfnkaiaagfgalomgkooidacamanhdg?utm_source=item-share-cb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                onClick={() => {
                  if (typeof gtag !== 'undefined') {
                    gtag('event', 'click_chrome_extension', {
                      event_category: 'engagement',
                      event_label: 'hero_chrome_extension',
                      value: 1
                    });
                  }
                }}
              >
                🔗 Get Chrome Extension
              </a>
            </div>
          </div>
        </section>

        {/* Chrome Extension Showcase */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Instant Help on Any Webpage</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Highlight any math equation or code snippet. Get AI-powered explanations instantly.
              </p>
            </div>
            <a
              href="https://chromewebstore.google.com/detail/ogpfnkaiaagfgalomgkooidacamanhdg?utm_source=item-share-cb"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl shadow-lg overflow-hidden max-w-3xl mx-auto hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'click_chrome_extension', {
                    event_category: 'engagement',
                    event_label: 'banner_image_click',
                    value: 1
                  });
                }
              }}
            >
              <img
                src="/images/scimigo-tutor.png"
                alt="SciMigo Chrome Extension in action - AI tutoring on any webpage"
                className="w-full h-auto"
              />
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary text-2xl">📝</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Ask Any Question</h3>
                <p className="text-muted-foreground">
                  Math, algorithms, or code - we've got you covered
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">AI Analyzes</h3>
                <p className="text-muted-foreground">
                  Multi-agent system finds the best solution approach
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary text-2xl">🎓</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Learn Your Way</h3>
                <p className="text-muted-foreground">
                  Choose hints, full solutions, or step-by-step tutorials
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Subject Areas Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What We Teach</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-3 text-blue-600">📊 Mathematics</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Calculus & Analysis</li>
                  <li>• Linear Algebra</li>
                  <li>• Differential Equations</li>
                  <li>• Statistics & Probability</li>
                </ul>
              </div>
              <div className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-3 text-green-600">💻 Computer Science</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Data Structures</li>
                  <li>• Algorithm Analysis</li>
                  <li>• Complexity Theory</li>
                  <li>• Discrete Mathematics</li>
                </ul>
              </div>
              <div className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-3 text-purple-600">⚡ Algorithms</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Sorting & Searching</li>
                  <li>• Graph Algorithms</li>
                  <li>• Dynamic Programming</li>
                  <li>• Optimization Problems</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Get the Chrome Extension</h2>
            <a
              href="https://chromewebstore.google.com/detail/ogpfnkaiaagfgalomgkooidacamanhdg?utm_source=item-share-cb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              onClick={() => {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'click_chrome_extension', {
                    event_category: 'engagement',
                    event_label: 'cta_chrome_extension',
                    value: 1
                  });
                }
              }}
            >
              🔗 Install Extension
            </a>
            <p className="text-sm text-muted-foreground mt-4">
              Free Chrome Extension • Get help on any webpage
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

