import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <meta
          name="description"
          content="SciMigo: Advanced AI-powered STEM tutor helping students master mathematics, computer science, algorithms, and more. Get personalized step-by-step explanations for high school and college level subjects."
        />
        <meta
          name="keywords"
          content="SciMigo, AI tutor, STEM education, mathematics, computer science, algorithms, calculus, linear algebra, data structures, artificial intelligence, machine learning, programming, step-by-step solutions, personalized learning"
        />
        <meta name="author" content="SciMigo" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta property="og:title" content="SciMigo - Advanced AI-Powered STEM Tutor" />
        <meta
          property="og:description"
          content="Master mathematics, computer science, and algorithms with AI-powered personalized tutoring. Get step-by-step solutions and explanations for high school and college STEM subjects."
        />
        <meta property="og:image" content="https://www.scimigo.com/images/icon128.png" />
        <meta property="og:url" content="https://www.scimigo.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SciMigo" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SciMigo - Advanced AI-Powered STEM Tutor" />
        <meta
          name="twitter:description"
          content="Master mathematics, computer science, and algorithms with AI-powered personalized tutoring for students."
        />
        <meta name="twitter:image" content="https://www.scimigo.com/images/icon128.png" />
        <meta name="twitter:site" content="@SciMigo" />
        <meta name="twitter:creator" content="@SciMigo" />
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
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SciMigo",
              "alternateName": "SciMigo STEM Education Platform",
              "url": "https://www.scimigo.com",
              "logo": "https://www.scimigo.com/images/icon128.png",
              "description": "Advanced AI-powered STEM education platform helping students master mathematics, computer science, algorithms, and more through personalized tutoring.",
              "foundingDate": "2024",
              "industry": "Education Technology",
              "serviceArea": "Global",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "STEM Tutoring Services",
                "itemListElement": [
                  {
                    "@type": "EducationalOccupationalCredential",
                    "name": "Mathematics Tutoring",
                    "description": "AI-powered tutoring for calculus, linear algebra, and advanced mathematics"
                  },
                  {
                    "@type": "EducationalOccupationalCredential", 
                    "name": "Computer Science Tutoring",
                    "description": "Personalized learning for algorithms, data structures, and programming"
                  },
                  {
                    "@type": "EducationalOccupationalCredential",
                    "name": "AI & Machine Learning Education",
                    "description": "Step-by-step guidance in artificial intelligence and machine learning concepts"
                  }
                ]
              },
              "audience": {
                "@type": "EducationalAudience",
                "educationalRole": ["student"],
                "educationalLevel": ["High School", "Undergraduate", "Graduate"]
              },
              "keywords": ["AI tutor", "STEM education", "mathematics", "computer science", "algorithms", "machine learning", "personalized learning"]
            })
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
