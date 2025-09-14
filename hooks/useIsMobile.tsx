import { useEffect, useState } from 'react';

export function useIsMobile() {
  // Start with mobile-first assumption to prevent sidebar flash
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkScreenSize = () =>
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isMobile;
}
