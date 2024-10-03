import { useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '.'
import { notify } from '@/components/ui/notification'
import useHomeSlice from '../pages/Home/home.store'
import { Footer } from './Footer'
import { Header } from './Header'
import { Path } from '../utils/types'
import { useMutation } from '@tanstack/react-query'

export const Sider = () => {
  const [toggleSider, setToggleSider] = useState<boolean>(false)
  const [searchBarVisible, setSearchBarVisible] = useState<boolean>(false)
  const [resetBarVisible, setResetBarVisible] = useState<boolean>(false)

  const openSearchBar = () => setSearchBarVisible(true)
  const closeSearchBar = () => setSearchBarVisible(false)

  const closeResetBar = () => setResetBarVisible(false)

  const { bot, removeBot, clearHistory, clearSavedItems } = useHomeSlice(
    (state) => state
  )

  const { isPending, mutate } = useMutation({
    mutationKey: [bot?.id],
    mutationFn: async () => {
      return "response"
    }, 
      // axios.delete('chatbot', {
      //   params: { chatbot_id: bot?.id },
      // }),
    onSuccess: () => {
      // removeBot()
      clearHistory()
      // clearSavedItems()
      // clearPdfData()
      // clearWebsiteData()
      // clearYoutubeData()
      setTimeout(closeResetBar, 1500)
      notify('Cleared your knowledge base', 'success')
      window.location.href = Path.HOME
    },
  })

  useEffect(() => {
    const FREEZE_KEY = 'i'
    const CLOSE_KEY = 'Escape'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === FREEZE_KEY) {
        openSearchBar()
      }
      if (e.key === CLOSE_KEY) {
        closeSearchBar()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <aside
      className={`h-screen ${toggleSider ? 'w-24' : 'w-72'
        } py-4 bg-[#F3F3EE] transition-all ease-in-out duration-700 flex flex-col justify-between items-center`}
      aria-label="Sidebar"
    >
      <Header
        {...{
          toggleSider,
          setToggleSider,
          searchBarVisible,
          setSearchBarVisible,
        }}
      />
      <Separator />
      <div className="p-2 flex justify-center items-center">
        <Dialog open={resetBarVisible} onOpenChange={setResetBarVisible}>
          <DialogTrigger>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="link"
                  disabled={!bot?.id}
                  startIcon={<TrashIcon className="w-4 h-4 text-red-700" />}
                >
                  <p className="text-red-700">
                    {toggleSider ? 'История' : 'Очистить историю'}
                  </p>
                </Button>
              </TooltipTrigger>
              {!bot?.id && (
                <TooltipContent
                  side="top"
                  className="w-60 bg-black/80 text-white"
                >
                  <p className="">
                    This will be enabled after at least one source is provided
                  </p>
                </TooltipContent>
              )}
            </Tooltip>
          </DialogTrigger>
          <DialogContent className="rounded-md">
            <DialogHeader>
              <DialogTitle>Очистить историю</DialogTitle>
              <DialogDescription>
                Это действие невозможно отменить. Это сотрет ваши данные.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Button
                loading={isPending}
                variant="destructive"
                className="w-full"
                onClick={mutate as any}
              >
                {isPending ? 'Удаляем' : 'Подтвердить'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <Footer toggleSider={toggleSider} />
    </aside>
  )
}
