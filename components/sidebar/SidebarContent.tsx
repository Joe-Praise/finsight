'use client';
import Image from 'next/image';
import finsight from '@/public/finsight.png';
import appRoutes from '@/navigation';
import NavLink from './NavLink';
import { Separator } from '../ui/seperator';
import { useNavBarStore } from '@/store';
import { cn } from '@/lib/utils';
import Logo from '../shared/logo';
import ThemeSwitch from '../theme-switch';

export default function SidebarContent() {
  const { isIcons } = useNavBarStore();

  const badgeDisplay = (isComing: boolean) => {
    if (!isComing) return null;

    if (isIcons) {
      // Collapsed sidebar - show just a small dot
      return (
        <span className='absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 border border-background rounded-full'></span>
      )
    }

    // Expanded sidebar - show full text
    return (
      <span className='absolute top-0 right-0 border border-muted-foreground rounded-full text-[8px] px-1 text-muted-foreground bg-muted whitespace-nowrap'>
        Coming Soon
      </span>
    )
  }

  return (
    <section className='h-full flex flex-col gap-6 w-full'>
      <header
        className={cn(
          'w-full flex items-center mt-10 mb-[19px] text-foreground ps-[28px] border-b-0 md:pt-0',
          {
            'ps-0 justify-center': isIcons,
          }
        )}
      >
        <Logo>
          <Image
            src={finsight}
            alt="company's logo icon"
            className='size-[41.04px]'
          />
        </Logo>
      </header>
      <section className='flex flex-col gap-2 font-karla'>
        {appRoutes.map((route, i) => {
          if (!route.name.length && !route.path.length) {
            return (
              <Separator
                key={`${route.path}-#${i}`}
                className='my-7 bg-border'
              />
            );
          }

          return (
            <NavLink
              key={`${route.path}-#${i}__${route.name}__key`}
              to={route.path}
              name={route.name}
              className={cn('flex items-center gap-3 relative', {
                'justify-center w-[80%] mx-auto': isIcons,
              })}
            >
              {badgeDisplay(route.isComing)}
              <span>{route.icon}</span>
              {!isIcons && <span className='pt-1'>{route.name}</span>}
            </NavLink>
          );
        })}

        <ThemeSwitch isIcons={isIcons} />
        {/* <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild></TooltipTrigger>
            {isIcons && (
              <TooltipContent
                avoidCollisions
                side='right'
                align='center'
                className='py-2 text-primary bg-secondary'
              >
                <p className='text-[18px] font-karla'>
                  {resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider> */}
      </section>
    </section>
  );
}
