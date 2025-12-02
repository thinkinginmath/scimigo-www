import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, title, description }) {
  return (
    <div className="min-h-screen flex flex-col">
      {title && (
        <Head>
          <title>{title}</title>
          {description && <meta name="description" content={description} />}
        </Head>
      )}
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
