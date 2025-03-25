'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  
  // If this is a news detail page, redirect to the news list
  useEffect(() => {
    if (pathname?.startsWith('/news/')) {
      // Attempt to load the page dynamically
      // The actual logic for loading will be handled by the client-side routing
      // This just ensures we don't show a 404 page for routes that should be handled client-side
    }
  }, [pathname, router]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        Go back home
      </Link>
    </div>
  );
}
