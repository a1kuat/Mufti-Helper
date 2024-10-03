import React from 'react';

interface ILogo {
  size?: number;
}

export const Logo: React.FC<ILogo> = ({ size = 9 }) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 48 48`}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle className='fill-slate-800 dark:fill-slate-200' r={24} cx={24} cy={24} />
    <path
      d='M21.3844 37.8303L18.8003 36.3688C17.415 37.1537 17.9612 39.2986 19.5463 39.2986H20.6319C20.8916 39.2986 21.1513 39.2309 21.3778 39.1023C21.864 38.8249 21.864 38.1145 21.3778 37.8371L21.3844 37.8303Z'
      className='fill-white dark:fill-slate-800'
    />
    <path
      d='M19.0808 15.0684C19.7935 15.8397 20.9923 15.8397 21.7049 15.0684C22.3576 14.3647 22.3576 13.2618 21.7049 12.5581L18.6812 9.28998C18.3416 8.9246 17.8687 8.71484 17.3692 8.71484C15.7908 8.71484 14.9716 10.6297 16.0572 11.8003L19.0808 15.0684Z'
      className='fill-white dark:fill-slate-800'
    />
    <path
      d='M28.1456 19.5138C27.433 18.7425 26.2275 18.7425 25.5149 19.5138C24.8622 20.2175 24.8622 21.3204 25.5149 22.0241L31.9086 28.9325L27.5396 31.4089C26.3075 32.1059 26.3075 33.9125 27.5396 34.6094C28.0857 34.9206 28.7517 34.9206 29.2978 34.6094L37.7028 29.8459L28.139 19.5138H28.1456Z'
      className='fill-white dark:fill-slate-800'
    />
    <path
      d='M27.5389 35.8612L27.3191 35.7327L23.6161 33.6351L15.311 28.9326L23.6161 19.9672L26.087 17.2946L31.1686 11.8071C32.2542 10.6365 31.435 8.72168 29.8566 8.72168C29.3571 8.72168 28.8842 8.93143 28.5445 9.29681L23.6161 14.6219L21.1386 17.2946L9.52344 29.846L19.9198 35.7394L23.6228 37.837L25.7873 39.0684C26.0537 39.2241 26.36 39.2985 26.6664 39.2985C28.5246 39.2985 29.1706 36.7882 27.5455 35.868L27.5389 35.8612Z'
      className='fill-white dark:fill-slate-800'
    />
  </svg>
);