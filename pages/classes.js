import Head from 'next/head';
import Layout from '../components/Layout';

const DISCORD_INVITE = 'https://discord.gg/ebrPcMKg';

export default function Classes() {
  const handleDiscordClick = () => {
    // Track with Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'discord_join', {
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

            <div className="max-w-lg mx-auto">
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDiscordClick}
                className="flex items-center justify-center gap-3 px-8 py-5 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg font-bold text-lg transition-colors shadow-lg"
              >
                <svg width="24" height="24" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="currentColor"/>
                </svg>
                Join Our Discord Community
              </a>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Get early access updates, ask questions, and connect with other learners
              </p>
            </div>
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
              Join our Discord community for early access and exclusive launch pricing.
            </p>

            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDiscordClick}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg font-bold text-lg transition-colors shadow-xl"
            >
              <svg width="24" height="24" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="currentColor"/>
              </svg>
              Join Discord Community
            </a>
            <p className="text-sm text-muted-foreground mt-4">
              Limited early bird spots available
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
