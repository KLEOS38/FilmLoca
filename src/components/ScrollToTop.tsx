
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);
  const isInitialMount = useRef(true);
  const scrollWatcherRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Prevent scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    const forceScrollTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    // On initial mount, scroll to top immediately
    if (isInitialMount.current) {
      forceScrollTop();
      isInitialMount.current = false;
    }
    
    // On route change, scroll to top
    if (prevPathRef.current !== pathname) {
      forceScrollTop();
      prevPathRef.current = pathname;
    }
    
    // Watch for scroll position changes after navigation/load
    // This catches browser scroll restoration that happens after our initial scroll
    if (scrollWatcherRef.current) {
      clearTimeout(scrollWatcherRef.current);
    }
    
    // Check and fix scroll position multiple times after route change
    const checkScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (currentScroll > 0) {
        forceScrollTop();
      }
    };
    
    // Check immediately and then at intervals
    checkScroll();
    scrollWatcherRef.current = setTimeout(checkScroll, 10);
    setTimeout(checkScroll, 50);
    setTimeout(checkScroll, 100);
    setTimeout(checkScroll, 200);
    setTimeout(checkScroll, 500);
    setTimeout(checkScroll, 1000);
    
    // Cleanup
    return () => {
      if (scrollWatcherRef.current) {
        clearTimeout(scrollWatcherRef.current);
        scrollWatcherRef.current = null;
      }
    };
  }, [pathname]);
  
  return null;
}
