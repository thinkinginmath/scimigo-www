import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/icon48.png"
              alt="SciMigo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-xl font-bold">SciMigo</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
            <div className="px-4 py-2 text-sm font-medium rounded-md bg-muted text-muted-foreground border border-muted">
              Coming Soon
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
