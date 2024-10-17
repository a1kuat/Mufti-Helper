import {
  BookmarkIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ServerStackIcon,
} from '@heroicons/react/16/solid'
import React from 'react'
import {
  Dialog,
  DialogTrigger,
  Tooltip,
  TooltipTrigger,
  Button,
  TooltipContent,
  DialogContent,
  LibraryIcon,
} from '.'
import { classNames } from '../utils/fn'
import { SearchBar } from './SearchBar'
import { Path } from '../utils/types'
import { useNavigate } from 'react-router-dom'
import useHomeSlice from '../pages/Home/home.store'

type IHeader = {
  toggleSider: boolean
  setToggleSider: (value: boolean) => void
  searchBarVisible: boolean
  setSearchBarVisible: (value: boolean) => void
}

export const Header: React.FC<IHeader> = ({
  toggleSider,
  setToggleSider,
  searchBarVisible,
  setSearchBarVisible,
}) => {
  const navigate = useNavigate()

  const { history } = useHomeSlice((state) => state)

  const iconProps = {
    className: toggleSider ? 'w-6 h-6' : 'w-4 h-4',
    strokeWidth: 2,
  }

  const mainMenu = [
    {
      name: 'Главная',
      link: Path.HOME,
      disabled: false,
      icon: <MagnifyingGlassIcon {...iconProps} />,
    },
    {
      name: 'История',
      link: Path.HISTORY,
      disabled: false,
      icon: <LibraryIcon size={toggleSider ? 5 : 4} />,
    },
  ]

  // Define the onSearch function that SearchBar will use
  const onSearch = (query: string, model: string) => {
    console.log('Searching for:', query, 'in model:', model);
    // You can add any logic here, for example, navigate to a new page or update state
    // navigate logic or function to handle search could be added here
  }

  return (
    <div className="w-full h-[90%] flex flex-col items-center space-y-10">
      <div className={classNames("w-full p-2 flex items-center justify-between",
        toggleSider ? 'flex-col' : ''
      )}>
        <h1 className={classNames(
          toggleSider ? 'mx-0 scroll-m-10 border-b pb-2 text-14 font-semibold tracking-tight transition-colors first:mt-0' : 'mx-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors',
        )}
        >Mufti Helper</h1>
        {/* Button to toggle the sidebar */}
        <Button
          variant="ghost"
          size={"sm"}
          className="p-2 z-10 rounded-full hover:bg-black/10"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="arrow-left-to-line"
            onClick={() => setToggleSider(!toggleSider)}
            className={classNames(
              'w-4 h-4 text-slate-500 hover:text-olive-green transition-all ease-in duration-700 z-10',
              toggleSider ? 'rotate-180' : 'rotate-0',
            )}
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M0 424c0 13.3 10.7 24 24 24s24-10.7 24-24L48 88c0-13.3-10.7-24-24-24S0 74.7 0 88L0 424zM135.6 238.5c-4.8 4.5-7.6 10.9-7.6 17.5s2.7 12.9 7.6 17.5l136 128c9.7 9.1 24.8 8.6 33.9-1s8.6-24.8-1-33.9L212.5 280l83.5 0 128 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-128 0-83.5 0 91.9-86.5c9.7-9.1 10.1-24.3 1-33.9s-24.3-10.1-33.9-1l-136 128z"
            ></path>
          </svg>
        </Button>
      </div>

      <Dialog
        open={searchBarVisible}
        onOpenChange={setSearchBarVisible}
      >
        <DialogTrigger className="self-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className={classNames(
                  'rounded-full hover:ring-2 ring-offset-2 bg-secondaryLight ring-mint',
                  toggleSider ? '' : 'w-full'
                )}
              >
                {toggleSider ? (
                  <PlusIcon className="w-4 h-4" />
                ) : (
                  <>
                    <p>Новый поиск</p>
                    <kbd className="ring-1 ring-slate-400 p-1 ml-2 text-xs rounded-md">
                      {'Ctrl + I'}
                    </kbd>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            {toggleSider && (
              <TooltipContent side="right">
                <p>New search</p>
              </TooltipContent>
            )}
          </Tooltip>
        </DialogTrigger>
        <DialogContent className="rounded-md p-2 pt-4 bg-[#FCFCF9]">
          <SearchBar onSearch={onSearch}/> {/* Pass the onSearch function here */}
        </DialogContent>
      </Dialog>
    </div>
  )
}
