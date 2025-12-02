import Link from 'next/link';
import Layout from '../components/Layout';

export default function Custom404() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl mb-8">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link href="/" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition">
          Go Home
        </Link>
      </div>
    </Layout>
  );
}