import * as React from 'react';
import { Button } from './button';

import { cn } from '../../lib/utils';

export interface NotFoundProps extends React.HTMLAttributes<HTMLDivElement> {
  onBack?: () => void;
}

export const NotFound = ({ className, onBack = () => null, ...props }: NotFoundProps) => {
  return (
    <main
      className={cn(
        className,
        'grid min-h-screen place-items-center bg-white dark:bg-slate-800 px-6 py-24 sm:py-32 lg:px-8',
      )}
    >
      <div {...props} className='text-center'>
        <p className='text-base font-semibold text-slate-600'>404</p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-400 sm:text-5xl'>
          Page not found
        </h1>
        <p className='mt-6 text-base leading-7 text-slate-600 dark:text-slate-200'>
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Button onClick={onBack}>Go back home</Button>

          <a href='#' className='text-sm font-semibold text-gray-900 dark:text-slate-300'>
            Contact support <span aria-hidden='true'>&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
};