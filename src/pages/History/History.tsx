import { ClockIcon } from '@heroicons/react/24/outline'
import { Listicle } from '../../components/Listicle'
import useHomeSlice from '../Home/home.store'
import { LibraryIcon } from '../../components'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../utils/types'

export const History = () => {
  const navigate = useNavigate()
  const { history, removeHistoryItem } = useHomeSlice((state) => state)

  const onSearch = (text: string) => {
    if (text.length > 0) {
      navigate(
        `${Path.SEARCH}?data=${btoa(
          JSON.stringify({
            searchQuery: text,
          })
        )}`
      )
    }
  }

  return (
    <div className="mt-10 space-y-4 flex flex-col justify-start items-center">
      <div className="w-3/5">
        <span className="flex items-center space-x-2 mb-2">
          <LibraryIcon size={5} className="text-olive-green" />
          <p className="text-2xl">History</p>
        </span>
        <div className="self-center">
          <Listicle
            emptyMessage="Your query history will appear here"
            list={history.map((item) => ({ ...item, name: item.text }))}
            startIcon={<ClockIcon className="w-4 h-4 text-slate-400" />}
            handleClick={(item: any) => onSearch(item)}
            onDelete={(item: any) => () => removeHistoryItem(item)}
          />
        </div>
      </div>
    </div>
  )
}
