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
  const { isOpen, isIcons, toggleSidebar, closeSidebar } = useNavBarStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) return;
    toggleSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return (
    <section>
      {/* Overlay for mobile */}
      <div
        className={cn('fixed inset-0 z-40 transition-opacity md:hidden', {
          'opacity-100 visible': isOpen,
          'opacity-0 invisible': !isOpen,
        })}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <section
        className={cn(
          `w-full flex flex-col shadow-md dark:shadow-gray-700  text-white transition-all duration-100 
                ease-out md:w-[293px] md:min-w-60 md:static fixed top-0 left-0 h-screen z-50 py-3`,
          {
            'w-[293px]': isOpen,
            'w-0 min-w-0 max-w-0 md:max-w-[293px]': !isOpen,
            'md:w-max md:min-w-max md:max-w-auto px-2': isIcons,
          }
        )}
      >
        {/* Toggle Button (Only for mobile) */}
        <div className='absolute top-0 -right-[32px] z-50 md:hidden'>
          <button
            onClick={toggleSidebar}
            className='bg-nav-active rounded-[8px] p-1'
          >
            {isOpen ? (
              <PanelLeftClose
                width={45}
                height={30}
                className='text-[50px] text-primary-100'
              />
            ) : (
              <PanelLeftOpen
                width={45}
                height={30}
                className='text-[50px] text-primary-100'
              />
            )}
          </button>
        </div>

        <main
          className={cn('flex flex-col h-full overflow-hidden w-0 mx-auto', {
            'w-[237px] mx-auto': isOpen && !isIcons,
            'md:w-[237px] ': !isOpen && !isIcons,
            'md:w-auto': isIcons,
          })}
        >
          {children}
          <section className='mt-auto'>
            <footer className='w-full font-semibold text-xs text-center'>
              <div>
                <p>this is where the logo will go</p>
              </div>
            </footer>
          </section>
        </main>
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
