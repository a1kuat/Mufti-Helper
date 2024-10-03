import React from 'react'

import { Loader } from '.'

type ILinkPreview = {
  url: string
  data: any
  loading?: boolean
}

export const LinkPreview: React.FC<ILinkPreview> = ({ url, data, loading }) => {
  const calculateDuration = (seconds: number) => {
    const mins = Math.round(seconds / 60)
    const remaining_seconds = seconds % 60

    return `${mins}:${remaining_seconds}`
  }

  return (
    <div className="flex rounded-lg border border-gray-200 p-2">
      <div>
        {loading ? (
          <Loader size={40} />
        ) : (
          <a href={url} target="_blank">
            <img
              alt="thumbnail"
              src={data?.thumbnail_url}
              className="rounded-lg w-36 object-cover"
            />
          </a>
        )}
      </div>
      {data && (
        <div className="flex flex-col ml-2 justify-between">
          <div className="pl-2 text-sm text-slate-600 dark:text-slate-300 truncate">
            {data?.title}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300 pl-2">
            <p>{data?.author_name}</p>
            <p>{calculateDuration(data?.duration)}</p>
          </div>
        </div>
      )}
    </div>
  )
}
