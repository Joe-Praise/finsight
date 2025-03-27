'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useNavBarStore } from '@/store';

type NavLinkProps = {
  to: string;
  name: string;
  children: React.ReactNode;
  className?: string;
};

export default function NavLink({
  to,
  children,
  className,
  name,
}: NavLinkProps) {
  const pathName = usePathname();
  const { isIcons } = useNavBarStore();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={to}
            className={cn(
              'font-karla font-normal hover:bg-nav-active px-4 py-3 rounded-[8px] hover:bg-secondary text-primary hover:font-semibold bg-transparent leading-[18.7px]',
              {
                'bg-nav-active rounded-lg text-primary-100 font-semibold':
                  pathName.toLowerCase() === to.toLowerCase(),
              },
              className
            )}
          >
            {children}
          </Link>
        </TooltipTrigger>
        {isIcons && (
          <TooltipContent
            avoidCollisions
            side='right'
            align='center'
            className='py-2 text-primary bg-secondary'
          >
            <p className='text-[18px] font-karla'>{name}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
