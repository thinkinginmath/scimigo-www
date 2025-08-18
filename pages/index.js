import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>SciMigo - AI-Powered STEM Tutor | Math, Computer Science & Algorithms</title>
        <link rel="canonical" href="https://www.scimigo.com/" />
      </Head>
      <main>
        {/* Hero Section */}
        <section className="relative py-24 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
              Level Up Your STEM Skills
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Get step-by-step help for math and coding from friendly AI tutors. Perfect for homework, projects and exams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://app.scimigo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                onClick={() => {
                  if (typeof gtag !== 'undefined') {
                    gtag('event', 'click_app_link', {
                      event_category: 'engagement',
                      event_label: 'hero_start_learning',
                      value: 1
                    });
                  }
                }}
              >
                🚀 Let's Go!
              </a>
              <a
                href="/chrome-extension-beta"
                className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-md border border-primary text-primary hover:bg-primary/10 transition-colors"
                onClick={() => {
                  if (typeof gtag !== 'undefined') {
                    gtag('event', 'click_extension_beta', {
                      event_category: 'engagement',
                      event_label: 'hero_chrome_extension',
                      value: 1
                    });
                  }
                }}
              >
                🧪 Try Chrome Extension Beta
              </a>
            </div>
          </div>
        </section>



        {/* Features Section */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
              Our multi-agent AI system provides personalized STEM tutoring across mathematics, computer science, and algorithms.
            </p>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary text-2xl">📝</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Ask Your Question</h3>
                <p className="text-muted-foreground">
                  Submit any STEM problem - from calculus and linear algebra to algorithms and data structures.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Smart AI Helpers</h3>
                <p className="text-muted-foreground">
                  Our AI helpers team up behind the scenes to figure out the best way to solve your question.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary text-2xl">🎓</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Learn & Understand</h3>
                <p className="text-muted-foreground">
                  Pick hints or full solutions and see easy-to-follow explanations with examples.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Subject Areas Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Subjects We Cover</h2>
            <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
              From foundational mathematics to advanced computer science concepts
            </p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Level Up?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Jump in and get instant, step-by-step answers for math and coding questions.
            </p>
            <a
              href="https://app.scimigo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              onClick={() => {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'click_app_link', {
                    event_category: 'engagement',
                    event_label: 'cta_try_scimigo',
                    value: 1
                  });
                }
              }}
            >
              🚀 Try it Free!
            </a>
            <p className="text-sm text-muted-foreground mt-4">
              Experience AI-powered STEM tutoring today
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}

