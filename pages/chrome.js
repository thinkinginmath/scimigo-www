import { useEffect } from 'react';
import Head from 'next/head';

export default function ChromeRedirect() {
  useEffect(() => {
    window.location.href = 'https://chromewebstore.google.com/detail/ogpfnkaiaagfgalomgkooidacamanhdg?utm_source=item-share-cb';
  }, []);

  return (
    <>
      <Head>
        <title>Redirecting to Chrome Web Store...</title>
        <meta httpEquiv="refresh" content="0; url=https://chromewebstore.google.com/detail/ogpfnkaiaagfgalomgkooidacamanhdg?utm_source=item-share-cb" />
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Redirecting to Chrome Web Store...</h1>
          <p className="text-gray-600">
            If you're not redirected automatically, 
            <a 
              href="https://chromewebstore.google.com/detail/ogpfnkaiaagfgalomgkooidacamanhdg?utm_source=item-share-cb"
              className="text-blue-600 hover:underline ml-1"
            >
              click here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}