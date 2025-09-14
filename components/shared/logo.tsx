import { ReactNode } from 'react';
import { useNavBarStore } from '@/store';
import { useIsMobile } from '@/hooks/useIsMobile';
import Link from 'next/link';
// import { routes } from '@/navigation';
// import { cn } from '@/lib/utils';
import { routes } from '@/navigation';

interface ILogo {
  children: ReactNode;
}

const Logo = (props: ILogo) => {
  const { isIcons, toggleSidebarIcons } = useNavBarStore();
  const isMobile = useIsMobile();
  const { children } = props;

  return (
    <div className='flex items-center justify-center gap-[6.91px] px-3 md:py-[19px]'>
      {isMobile ? (
        <Link
          href={routes.dashboard.entry.path}
          // className={cn({
          //   // 'px-3': isIcons,
          // })}
          onClick={() => !isMobile && toggleSidebarIcons()}
        >
          {children}
        </Link>
      ) : (
        <div
          // className={cn({
          //   'bg-white w-auto': isIcons,
          // })}
          onClick={() => !isMobile && toggleSidebarIcons()}
        >
          {children}
        </div>
      )}
      {!isIcons && (
        <Link
          href={routes.dashboard.entry.path}
          className='flex flex-col items-start h-full text-primary'
        >
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
