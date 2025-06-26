import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="SciMigo is an AI-powered STEM tutor helping high school and college students master mathematics, computer science and algorithms."
        />
        <meta
          name="keywords"
          content="AI tutor, STEM education, math tutor, computer science, algorithms, calculus, linear algebra, data structures"
        />
        <meta property="og:title" content="SciMigo: AI-Powered STEM Tutor" />
        <meta
          property="og:description"
          content="Personalized step-by-step explanations for math and computer science using a multi-agent AI system."
        />
        <meta property="og:image" content="/images/icon128.png" />
        <meta property="og:url" content="https://www.scimigo.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SciMigo: AI-Powered STEM Tutor" />
        <meta
          name="twitter:description"
          content="Learn math and computer science with our advanced multi-agent AI tutoring system."
        />
        <meta name="twitter:image" content="/images/icon128.png" />
        <link rel="canonical" href="https://www.scimigo.com/" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-14SDL384KV"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-14SDL384KV');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
