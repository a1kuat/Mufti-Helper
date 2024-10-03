import {
  DocumentIcon,
  DocumentPlusIcon,
  LinkIcon,
  TrashIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline'
import { Button, Loader } from '.'
import { BaseSyntheticEvent, ReactNode } from 'react'
import { classNames, formatDate } from '../utils/fn'

type IListicle = {
  list: any[]
  loading?: boolean
  startIcon?: ReactNode
  emptyMessage?: string
  handleClick?: (item: any) => void
  onDelete?: (item: any) => () => void
}

export const Listicle: React.FC<IListicle> = ({
  list,
  loading,
  startIcon,
  handleClick,
  onDelete,
  emptyMessage,
}) => {
  const iconMap: { [type: string]: ReactNode } = {
    document: <DocumentIcon className="h-4 w-4" strokeWidth={2} />,
    website: <LinkIcon className="h-4 w-4" strokeWidth={2} />,
    youtube: <VideoCameraIcon className="h-4 w-4" strokeWidth={2} />,
  }

  const onSelectItem = (item: any) => (e: BaseSyntheticEvent) => {
    e.stopPropagation()
    if (handleClick) handleClick(item)
  }

  return (
    <div>
      {list.length === 0 && emptyMessage && (
        <div className="space-y-2 border-2 border-dashed border-slate-300 rounded-md px-2 py-8 flex flex-col justify-center items-center text-slate-400">
          <DocumentPlusIcon className="w-5 h-5" />
          {emptyMessage}
        </div>
      )}

      <ul
        role="list"
        className="max-h-[50rem] overflow-y-scroll no-scrollbar list-decimal mt-4 space-y-2"
      >
        {list?.map((item) => (
          <li
            key={item.name}
            className={classNames(
              'flex items-center justify-between card',
              loading ? 'animate-pulse' : ''
            )}
          >
            <div
              className="flex w-0 p-2 flex-1 items-center"
              onClick={onSelectItem(item.name)}
            >
              {iconMap[item?.sourceType] ?? startIcon}
              <span className="ml-2 w-0 text-sm flex-1 dark:text-slate-300">
                {item?.name}
              </span>
            </div>
            <div className="ml-4 flex items-center space-x-2">
              <p className="text-xs text-slate-400">{formatDate(new Date())}</p>
              {loading ? (
                <Loader size={15} />
              ) : (
                onDelete && (
                  <Button variant="ghost" onClick={onDelete(item.name)}>
                    <TrashIcon
                      className="h-4 w-4 flex-shrink-0 text-slate-600 dark:text-slate-300"
                      aria-hidden="true"
                    />
                  </Button>
                )
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
