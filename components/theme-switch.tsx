'use client';
import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface IThemeSwitchProps {
  isIcons?: boolean;
}

const ThemeSwitch = (props: IThemeSwitchProps) => {
  const { isIcons } = props;
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <Image
        src=''
        width={36}
        height={36}
        sizes='36x36'
        alt='Loading Light/Dark Toggle'
        priority={false}
        title='Loading Light/Dark Toggle'
      />
    );

  return (
    <button
      className={cn(
        'flex justify-start items-center gap-3 w-full rounded-[8px] mt-2 ps-[16px] py-2.5 hover:bg-nav-active hover:bg-secondary text-primary hover:font-semibold bg-transparent leading-[18.7px]',
        {
          'justify-center w-[80%] mx-auto ps-0': isIcons,
        }
      )}
      onClick={() =>
        setTheme(() => (resolvedTheme === 'dark' ? 'light' : 'dark'))
      }
    >
      <span>{resolvedTheme === 'dark' ? <Sun /> : <Moon />}</span>
      {resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeSwitch;
