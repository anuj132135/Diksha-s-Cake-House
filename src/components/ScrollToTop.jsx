import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop & Focus Manager per Modern Web Guidance (same-document-transitions):
 * Scrolls window to top on route change and shifts programmatic focus
 * to the main heading (tabIndex="-1") to preserve accessibility context.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Shift focus programmatically to the main heading or container
    const mainHeading = document.querySelector('h1, main');
    if (mainHeading) {
      mainHeading.setAttribute('tabindex', '-1');
      mainHeading.focus({ preventScroll: true });
    }
  }, [pathname]);

  return null;
}
