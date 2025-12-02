import Head from 'next/head'
import { useEffect } from 'react'

export default function ChromeExtensionBeta() {
  useEffect(() => {
    // Redirect to the blog post about the Chrome extension launch
    if (typeof window !== 'undefined') {
      window.location.replace('/blog/chrome-extension-launch')
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Redirecting to SciMigo Chrome Extension Launch</title>
        <meta name="description" content="SciMigo Chrome Extension is now available on Chrome Web Store. Redirecting to launch announcement." />
        <meta httpEquiv="refresh" content="0;url=/blog/chrome-extension-launch" />
        <link rel="canonical" href="https://www.scimigo.com/blog/chrome-extension-launch" />
      </Head>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Redirecting to Chrome Extension Launch Post...</h1>
          <p>If you're not redirected automatically, <a href="/blog/chrome-extension-launch">click here</a>.</p>
        </div>
      </div>
    </div>
  )
}