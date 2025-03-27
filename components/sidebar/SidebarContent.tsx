'use client';
import Image from 'next/image';
import finsight from '@/public/finsight.png';
import appRoutes from '@/navigation';
import NavLink from './NavLink';
import { Separator } from '../ui/seperator';
// import { Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
// import { useEffect, useState } from 'react';
import { useNavBarStore } from '@/store';
import { cn } from '@/lib/utils';
import Logo from '../shared/logo';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import ThemeSwitch from '../theme-switch';

export default function SidebarContent() {
  const { resolvedTheme } = useTheme();
  const { isIcons } = useNavBarStore();

  // const [mode, setMode] = useState('light');

  // useEffect(() => {
  //   setTheme(mode);
  // }, [mode, setTheme]);

  return (
    <section className='h-full flex flex-col gap-6 w-full'>
      <header
        className={cn(
          'w-full flex items-center mt-10 mb-[19px] text-primary ps-[28px] border-b-0 md:pt-0',
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
                className='my-7 bg-primary'
              />
            );
          }

          return (
            <NavLink
              key={`${route.path}-#${i}__${route.name}__key`}
              to={route.path}
              name={route.name}
              className={cn('flex items-center gap-3', {
                'justify-center w-[80%] mx-auto': isIcons,
              })}
            >
              <span>{route.icon}</span>
              {!isIcons && <span className='pt-1'>{route.name}</span>}
            </NavLink>
          );
        })}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ThemeSwitch isIcons={isIcons} />
            </TooltipTrigger>
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
        </TooltipProvider>
      </section>
    </section>
  );
}
