'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function ClientRouting() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Handle client-side navigation for dynamic routes
    const handleClick = (e) => {
      // Ignore if default is prevented or not a left-click or has modifiers
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      
      const target = e.target.closest('a');
      if (!target) return;
      
      // Ignore if target has target="_blank" or is external
      if (target.target === '_blank' || target.getAttribute('rel') === 'external' || 
          !target.href.startsWith(window.location.origin)) return;
      
      // Get the pathname from the click target
      const href = target.getAttribute('href');
      if (!href) return;
      
      // Handle client-side navigation for news detail pages
      if (href.startsWith('/news/') && /^\/news\/\d+\/?$/.test(href)) {
        e.preventDefault();
        router.push(href);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [router]);

  return null;
}
