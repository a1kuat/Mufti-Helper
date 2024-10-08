import React from 'react'
import { classNames } from '../utils/fn'

type ILibraryIcon = {
  className?: string
  size?: number
}

export const LibraryIcon: React.FC<ILibraryIcon> = ({
  className,
  size = 4,
}) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="rectangle-vertical-history"
      className={classNames(
        'text-slate-500',
        className ?? '',
        `w-${size} h-${size}`
      )}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
    >
      <path
        fill="currentColor"
        strokeWidth={3}
        d="M256 48c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H512c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H256zM192 64c0-35.3 28.7-64 64-64H512c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H256c-35.3 0-64-28.7-64-64V64zM96 72c0-13.3 10.7-24 24-24s24 10.7 24 24V440c0 13.3-10.7 24-24 24s-24-10.7-24-24V72zM0 120c0-13.3 10.7-24 24-24s24 10.7 24 24V392c0 13.3-10.7 24-24 24s-24-10.7-24-24V120z"
      ></path>
    </svg>
  )
}
