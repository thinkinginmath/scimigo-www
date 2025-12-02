import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Features() {
  return (
    <Layout>
      <Head>
        <title>Features - SciMigo AI Math Education</title>
        <link rel="canonical" href="https://www.scimigo.com/features" />
      </Head>
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-primary font-semibold text-sm">🚀 Launching January 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
              Revolutionary AI-Powered Math Education
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              From AI-generated curriculum to personalized tutoring—discover the technology powering the future of learning.
            </p>
            <Link
              href="/classes"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Join Waitlist
            </Link>
          </div>
        </section>

        {/* Mini Lecture Pipeline */}
        <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Generated Curriculum</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our proprietary Mini Lecture Pipeline creates complete educational experiences automatically
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-xl bg-white border shadow-sm">
                <div className="text-4xl mb-3">📝</div>
                <h3 className="font-bold mb-2">Structured Lessons</h3>
                <p className="text-sm text-muted-foreground">
                  AI generates validated lesson specifications with slides, narration, and educational metadata
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white border shadow-sm">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="font-bold mb-2">Professional Slides</h3>
                <p className="text-sm text-muted-foreground">
                  Reveal.js presentations with LaTeX math rendering, diagrams, and fragment animations
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white border shadow-sm">
                <div className="text-4xl mb-3">🎙️</div>
                <h3 className="font-bold mb-2">Synchronized Narration</h3>
                <p className="text-sm text-muted-foreground">
                  High-quality text-to-speech with per-fragment audio synchronized to slide animations
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white border shadow-sm">
                <div className="text-4xl mb-3">🎬</div>
                <h3 className="font-bold mb-2">Automated Video</h3>
                <p className="text-sm text-muted-foreground">
                  End-to-end video generation with synchronized audio and visual transitions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Agent System */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligent Multi-Agent System</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our smart router picks the best AI tutor for your question so you get answers fast.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border bg-card">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-xl">🎯</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Smart Problem Routing</h3>
                <p className="text-muted-foreground text-sm">
                  Intelligent classification system routes problems to specialized agents with 80% direct solving efficiency.
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-green-600 text-xl">∫</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Math Specialists</h3>
                <p className="text-muted-foreground text-sm">
                  Dedicated agents for calculus, algebra, differential equations, and complex mathematical reasoning.
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-purple-600 text-xl">💻</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">CS & Algorithms</h3>
                <p className="text-muted-foreground text-sm">
                  Specialized agents for data structures, algorithm analysis, and programming problem solving.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Modes */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Personalized Learning Modes</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the learning approach that works best for you, from guided hints to complete step-by-step solutions.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600">💡</span>
                  </span>
                  Hints Mode
                </h3>
                <p className="text-muted-foreground mb-4">
                  Progressive hint system that guides you to the solution step by step, helping you learn the process.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Gradual guidance without giving away answers</li>
                  <li>• Builds problem-solving confidence</li>
                  <li>• Perfect for homework and practice</li>
                </ul>
              </div>
              <div className="p-8 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600">📝</span>
                  </span>
                  Solve Mode
                </h3>
                <p className="text-muted-foreground mb-4">
                  Complete step-by-step solutions with detailed explanations and mathematical reasoning.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Full solutions with LaTeX formatting</li>
                  <li>• Detailed mathematical explanations</li>
                  <li>• Ready for academic submission</li>
                </ul>
              </div>
              <div className="p-8 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600">🎓</span>
                  </span>
                  Tutor Mode
                </h3>
                <p className="text-muted-foreground mb-4">
                  Educational-focused explanations that connect concepts to fundamental principles.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Emphasizes the "why" behind each step</li>
                  <li>• Connects to broader mathematical concepts</li>
                  <li>• Builds deep understanding</li>
                </ul>
              </div>
              <div className="p-8 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-orange-600">🤖</span>
                  </span>
                  Multi-Agent Mode
                </h3>
                <p className="text-muted-foreground mb-4">
                  Automatic routing to the most appropriate specialized agent for optimal results.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Intelligent problem classification</li>
                  <li>• Specialized agent selection</li>
                  <li>• Optimized for accuracy and speed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Capabilities */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Technical Capabilities</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Powered by cutting-edge technology for accurate, fast, and interactive STEM learning.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg border bg-card text-center">
                <div className="text-3xl mb-3">📐</div>
                <h3 className="font-semibold mb-2">LaTeX Generation</h3>
                <p className="text-sm text-muted-foreground">Professional mathematical notation ready for homework and presentations</p>
              </div>
              <div className="p-6 rounded-lg border bg-card text-center">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-semibold mb-2">Interactive Plots</h3>
                <p className="text-sm text-muted-foreground">Dynamic visualizations using Plotly for exploring mathematical concepts</p>
              </div>
              <div className="p-6 rounded-lg border bg-card text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-semibold mb-2">Real-time Streaming</h3>
                <p className="text-sm text-muted-foreground">Live solution generation with sub-100ms response times for common problems</p>
              </div>
              <div className="p-6 rounded-lg border bg-card text-center">
                <div className="text-3xl mb-3">🔬</div>
                <h3 className="font-semibold mb-2">SymPy Integration</h3>
                <p className="text-sm text-muted-foreground">Symbolic computation backend ensures mathematical accuracy and verification</p>
              </div>
              <div className="p-6 rounded-lg border bg-card text-center">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="font-semibold mb-2">Conversation History</h3>
                <p className="text-sm text-muted-foreground">Persistent chat history with full-text search and organized sessions</p>
              </div>
              <div className="p-6 rounded-lg border bg-card text-center">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-semibold mb-2">Beautiful Rendering</h3>
                <p className="text-sm text-muted-foreground">MathJax integration for stunning mathematical expression display</p>
              </div>
            </div>
          </div>
        </section>

        {/* Subject Coverage */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Subjects We Cover</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From basics to advanced topics across math and computer science.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-6 text-blue-600">📊 Mathematics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Calculus</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Derivatives & Integrals</li>
                      <li>• Limits & Continuity</li>
                      <li>• Series & Sequences</li>
                      <li>• Multivariable Calculus</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Algebra & More</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Linear Algebra</li>
                      <li>• Differential Equations</li>
                      <li>• Statistics & Probability</li>
                      <li>• Discrete Mathematics</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="p-8 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-6 text-green-600">💻 Computer Science</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Algorithms</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Data Structures</li>
                      <li>• Algorithm Analysis</li>
                      <li>• Graph Algorithms</li>
                      <li>• Dynamic Programming</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Programming</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Code Debugging</li>
                      <li>• System Design</li>
                      <li>• Database Queries</li>
                      <li>• Interview Prep</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance & Reliability */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Performance</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Enterprise-grade infrastructure designed for speed, accuracy, and scalability.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">50%</div>
                <div className="text-sm font-medium mb-1">Fewer API Calls</div>
                <div className="text-xs text-muted-foreground">Optimized routing reduces computation</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">&lt;100ms</div>
                <div className="text-sm font-medium mb-1">Response Time</div>
                <div className="text-xs text-muted-foreground">For common mathematical problems</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm font-medium mb-1">Uptime</div>
                <div className="text-xs text-muted-foreground">Enterprise-grade reliability</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm font-medium mb-1">Availability</div>
                <div className="text-xs text-muted-foreground">Always ready to help you learn</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-primary to-purple-600 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Math Education?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join the waitlist for early access to AI-powered online classes launching January 2026.
            </p>
            <Link
              href="/classes"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold rounded-md bg-white text-primary hover:bg-gray-100 transition-colors shadow-xl"
            >
              Join Waitlist
            </Link>
            <p className="text-sm mt-6 opacity-75">
              Early bird pricing available • Limited spots
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
