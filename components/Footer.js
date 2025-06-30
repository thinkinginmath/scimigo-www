import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            © {new Date().getFullYear()} SciMigo. All rights reserved.
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
            <a 
              href="mailto:info@scimigo.com" 
              className="hover:text-primary transition-colors"
            >
              Contact
            </a>
            <span>•</span>
            <Link 
              href="/privacy" 
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link 
              href="/terms" 
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
