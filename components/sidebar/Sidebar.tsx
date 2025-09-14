'use client';

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavBarStore } from '@/store';
import { ReactNode, Suspense, useEffect } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { usePathname, useSearchParams } from 'next/navigation';

interface ISidebarProps {
  children: ReactNode;
}

function Sidebar(props: ISidebarProps) {
  const { children } = props;
  const { isOpen, isIcons, isHydrated, toggleSidebar, toggleSidebarIcons, closeSidebar, initializeSidebar } = useNavBarStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  const handleToggle = () => {
    if (isMobile) {
      toggleSidebar(); // Mobile: show/hide sidebar
    } else {
      toggleSidebarIcons(); // Desktop: toggle between full width and icon mode
    }
  };

  // Initialize sidebar state based on device type (only on first load)
  useEffect(() => {
    initializeSidebar(isMobile);
  }, [isMobile, initializeSidebar]);

  // Auto-close sidebar on mobile when navigating (but preserve user preference)
  useEffect(() => {
    if (!isMobile) return;
    // Only close if sidebar is currently open (preserve user's preference to keep it closed)
    if (isOpen) {
      closeSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  // Show loading state until hydration is complete to prevent flicker
  if (!isHydrated) {
    return (
      <section>
        {/* Placeholder to maintain layout */}
        <section className="w-0 md:w-[293px] h-screen transition-all duration-300 ease-out">
          {/* Empty placeholder */}
        </section>
      </section>
    );
  }

  return (
    <section>
      {/* Overlay for mobile */}
      <div
        className={cn(
          'fixed bg-background inset-0 z-40 transition-opacity md:hidden',
          {
            'opacity-100 visible': isOpen,
            'opacity-0 invisible': !isOpen,
          }
        )}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <section
        className={cn(
          `flex flex-col shadow-md dark:shadow-gray-700 text-white transition-all duration-300 
                ease-out fixed top-0 left-0 h-screen z-50 py-3 md:static`,
          {
            // Mobile: Show/hide completely
            'w-[293px]': isOpen && isMobile,
            'w-0 min-w-0': !isOpen && isMobile,

            // Desktop: Always visible, adjust width
            'md:w-[293px]': !isMobile && !isIcons,
            'md:w-[80px]': !isMobile && isIcons,
          }
        )}
      >
        {/* Toggle Button (Mobile and Desktop) */}
        <div className='absolute top-0 -right-[36px] lg:-right-[30px] z-50'>
          <button
            onClick={handleToggle}
            className='bg-secondary lg:bg-transparent rounded-[8px] p-1'
          >
            {(isMobile ? isOpen : !isIcons) ? (
              <PanelLeftClose
                width={45}
                height={30}
                className='text-[50px] text-foreground'
              />
            ) : (
              <PanelLeftOpen
                width={45}
                height={30}
                className='text-[50px] text-foreground'
              />
            )}
          </button>
        </div>

        <div
          className={cn('flex flex-col h-full overflow-hidden mx-auto', {
            // Mobile: Show/hide content
            'w-[237px]': isOpen && isMobile,
            'w-0': !isOpen && isMobile,

            // Desktop: Adjust content width
            'md:w-[237px]': !isMobile && !isIcons,
            'md:w-auto md:px-2': !isMobile && isIcons,
          })}
        >
          {children}
          <section className='mt-auto'>
            <footer className='w-full font-semibold text-xs text-center'>
              <div>{/* <p>this is where the logo will go</p> */}</div>
            </footer>
          </section>
        </div>
      </section>
    </section>
  );
}

const SideBarWithSuspense = (props: ISidebarProps) => {
  const { children } = props;
  return (
    <Suspense>
      <Sidebar>{children}</Sidebar>
    </Suspense>
  );
};
export default SideBarWithSuspense;
