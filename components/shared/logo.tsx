// import Image from 'next/image';
// import name from '@/public/svg/uifry.svg';
// import waterMark from '@/public/svg/TM.svg';
import { ReactNode } from 'react';
import { useNavBarStore } from '@/store';
import { useIsMobile } from '@/hooks/useIsMobile';
import Link from 'next/link';
// import { routes } from '@/navigation';
import { cn } from '@/lib/utils';

interface ILogo {
  children: ReactNode;
}

const Logo = (props: ILogo) => {
  const { isIcons, toggleSidebarIcons } = useNavBarStore();
  const isMobile = useIsMobile();
  const { children } = props;

  return (
    <div className='flex items-center justify-center gap-[5.91px] px-3 md:py-[19px]'>
      {isMobile ? (
        <Link
          href='/dashboard'
          className={cn({
            'px-3 ': isIcons,
          })}
          onClick={() => !isMobile && toggleSidebarIcons()}
        >
          {children}
        </Link>
      ) : (
        <div
          className={cn({
            'px-3 ': isIcons,
          })}
          onClick={() => !isMobile && toggleSidebarIcons()}
        >
          {children}
        </div>
      )}
      {!isIcons && (
        <Link href={''} className='flex flex-col items-start h-full text-white'>
          <span className='uppercase font-karla font-bold'>Finsight</span>
          <span className='text-xs font-medium leading-none tracking-tighter'>
            See, Understand, Prosper.
          </span>
        </Link>
      )}
    </div>
  );
};

export default Logo;
