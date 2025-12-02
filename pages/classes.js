import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function Classes() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Free Email Collection Options:
    //
    // Option 1: Google Forms (Recommended for simplicity)
    // 1. Create a Google Form at forms.google.com with an email field
    // 2. Click Send > Link icon to get the form URL
    // 3. Replace the form below with: <a href="YOUR_GOOGLE_FORM_URL">Join Waitlist</a>
    // 4. Or embed the form using the <iframe> embed code
    //
    // Option 2: Web3Forms (Free unlimited submissions)
    // 1. Sign up at web3forms.com to get a free access key
    // 2. Add this to the form: <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
    // 3. Set form action to: https://api.web3forms.com/submit
    // 4. Set method to "POST"
    //
    // Option 3: Formspree (50 free submissions/month)
    // 1. Sign up at formspree.io
    // 2. Set form action to: https://formspree.io/f/YOUR_FORM_ID
    //
    // For now, just show success message locally
    console.log('Waitlist signup:', email);
    setSubmitted(true);

    // Track with Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'waitlist_signup', {
        event_category: 'engagement',
        event_label: 'classes_page',
        value: 1
      });
    }
  };

  return (
    <Layout>
      <Head>
        <title>Online Classes - SciMigo AI Math Education</title>
        <meta name="description" content="Join the waitlist for SciMigo's AI-powered personalized math classes. Interactive mini-lectures, intelligent tutoring, and adaptive curriculum. Launching January 2026." />
        <link rel="canonical" href="https://www.scimigo.com/classes" />
      </Head>
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-6 bg-gradient-to-br from-primary/5 via-purple-50 to-pink-50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-primary font-semibold text-sm">🚀 Launching January 2026</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI-Powered Math Classes
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the future of personalized education with AI-generated curriculum, interactive mini-lectures, and your own intelligent tutor.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-6 py-4 rounded-lg border-2 border-muted focus:border-primary focus:outline-none text-lg"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    Join Waitlist
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Be the first to know when we launch. No spam, ever.
                </p>
              </form>
            ) : (
              <div className="max-w-md mx-auto bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-xl font-bold mb-2">You're on the list!</h3>
                <p className="text-muted-foreground">
                  We'll email you with early access details and exclusive launch offers.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* What You'll Get */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">What You'll Get</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-xl bg-card border-2">
                <div className="text-4xl mb-4">🎬</div>
                <h3 className="text-2xl font-bold mb-3">Interactive Mini-Lectures</h3>
                <p className="text-muted-foreground mb-4">
                  Professionally designed presentations with synchronized narration, LaTeX-rendered equations, and fragment-by-fragment explanations.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Visual diagrams and animations</li>
                  <li>• Progressive disclosure for better comprehension</li>
                  <li>• Watch at your own pace, review anytime</li>
                </ul>
              </div>

              <div className="p-8 rounded-xl bg-card border-2">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold mb-3">Your Personal AI Tutor</h3>
                <p className="text-muted-foreground mb-4">
                  Ask questions anytime and get instant, personalized help tailored to your learning style and the current lesson context.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Choose hints, solutions, or tutorials</li>
                  <li>• Context-aware based on lecture content</li>
                  <li>• Available 24/7, never busy</li>
                </ul>
              </div>

              <div className="p-8 rounded-xl bg-card border-2">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-2xl font-bold mb-3">Adaptive Curriculum</h3>
                <p className="text-muted-foreground mb-4">
                  Content that adjusts to your progress with intelligent difficulty adjustment and personalized recommendations.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Track your progress and achievements</li>
                  <li>• Personalized learning path</li>
                  <li>• Master concepts at your own pace</li>
                </ul>
              </div>

              <div className="p-8 rounded-xl bg-card border-2">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-3">Structured Learning Path</h3>
                <p className="text-muted-foreground mb-4">
                  Carefully designed curriculum that builds from fundamentals to advanced topics with clear milestones and goals.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Comprehensive coverage of key topics</li>
                  <li>• Practice problems with instant feedback</li>
                  <li>• Build deep understanding, not just memorization</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Course Topics */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">First Course</h2>
            <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Our inaugural course covers essential discrete mathematics for computer science and problem-solving.
            </p>
            <div className="max-w-3xl mx-auto">
              <div className="p-10 rounded-2xl bg-card border-4 border-primary/30 shadow-xl">
                <div className="text-5xl mb-4 text-center">🔗</div>
                <h3 className="text-3xl font-bold mb-4 text-center">Discrete Mathematics Foundations</h3>
                <p className="text-lg text-muted-foreground mb-6 text-center">
                  12 interactive sessions covering fundamental discrete math concepts essential for computer science, algorithms, and mathematical reasoning.
                </p>
                <div className="bg-muted/50 rounded-xl p-6 mb-6">
                  <h4 className="font-bold mb-3 text-lg">Topics Covered:</h4>
                  <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                    <li>• Sets, Relations & Functions</li>
                    <li>• Logic & Proof Techniques</li>
                    <li>• Combinatorics & Counting</li>
                    <li>• Graph Theory Fundamentals</li>
                    <li>• Number Theory Basics</li>
                    <li>• Recursion & Induction</li>
                    <li>• Algorithm Analysis</li>
                    <li>• Discrete Probability</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-2">
                    12 Sessions • Self-paced with AI tutor support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Early Bird Pricing</h2>
            <div className="inline-block p-12 rounded-2xl border-4 border-primary/20 bg-gradient-to-br from-primary/5 to-purple-50">
              <div className="text-5xl md:text-6xl font-bold mb-4">
                <span className="line-through text-muted-foreground">$699</span> $559
              </div>
              <p className="text-xl text-primary font-semibold mb-4">
                20% off for early bird members
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Complete Discrete Mathematics course • 12 interactive sessions
              </p>
              <ul className="text-left space-y-2 text-muted-foreground mb-8 max-w-md mx-auto">
                <li>✓ 12 AI-generated mini-lectures with slides & narration</li>
                <li>✓ Unlimited AI tutor questions throughout the course</li>
                <li>✓ Track your progress and achievements</li>
                <li>✓ Self-paced learning with lifetime access</li>
                <li>✓ Practice problems with instant feedback</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                30-day money-back guarantee. Early bird pricing available for limited time.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-bold text-lg mb-2">When will classes be available?</h3>
                <p className="text-muted-foreground">
                  We're launching in January 2026. Waitlist members will get early access and exclusive launch pricing.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-bold text-lg mb-2">What level of math do I need?</h3>
                <p className="text-muted-foreground">
                  Our courses start from the fundamentals. If you have a solid grasp of high school algebra, you're ready to begin.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-bold text-lg mb-2">How is this different from YouTube tutorials?</h3>
                <p className="text-muted-foreground">
                  SciMigo provides a structured learning path with personalized AI tutoring. You get instant help when stuck, adaptive curriculum, and progress tracking—not just passive video watching.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-bold text-lg mb-2">Can I ask the AI tutor anything?</h3>
                <p className="text-muted-foreground">
                  Yes! The AI tutor is context-aware and can help with any question related to the course material. Choose between hints, full solutions, or conceptual explanations.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-bold text-lg mb-2">What if I'm not satisfied?</h3>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee. If you're not satisfied within the first month, we'll refund your payment—no questions asked.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Math Education?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join {submitted ? 'other students' : 'the waitlist'} for early access and exclusive launch pricing.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-6 py-4 rounded-lg border-2 border-muted focus:border-primary focus:outline-none text-lg"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    Join Waitlist
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Limited early bird spots available
                </p>
              </form>
            ) : (
              <div className="text-lg text-green-600 font-semibold">
                ✓ Thanks for joining! Check your email for updates.
              </div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
