import { ArrowUpRightIcon } from '@heroicons/react/16/solid'
import React from 'react'

import { Button, Tooltip, TooltipTrigger, TooltipContent } from '.'
import { classNames } from '../utils/fn'

type IFooter = {
  toggleSider: boolean
}

export const Footer: React.FC<IFooter> = ({ toggleSider }) => {
  const redirectSlack = () =>
    window.open(
      'https://join.slack.com/t/genaiforenterprise/shared_invite/zt-2a7fr38f7-_QDOY1W1WSlSiYNAEncLGw',
      '_blank'
    )
  const redirectDiscord = () =>
    window.open('https://discord.gg/P6HCMQ9TRX', '_blank')
  const redirectLyzr = () => window.open('https://lyzr.ai/', '_blank')

  return (
    <div className="w-[90%]">
      <div
        className={classNames(
          'items-center p-2',
          toggleSider ? 'flex-col justify-center' : 'flex justify-between'
        )}
      >

        <div
          className={classNames(
            'flex justify-between',
            toggleSider ? 'w-full' : 'w-16'
          )}
        >
        </div>
      </div>
    </div>
  )
}
