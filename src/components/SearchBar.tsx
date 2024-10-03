import { ArrowRightCircleIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Dialog,
  Popover,
  PopoverTrigger,
  Button,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  PopoverContent,
  Command,
  CommandGroup,
  DialogTrigger,
  CommandItem,
  Switch,
  Label,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Loader,
} from '.'
import { sourceMenu, dialogTitle } from '../utils/constants'
import { classNames } from '../utils/fn'
import { Path } from '../utils/types'

type ISearchbar = {
  setSearchBarVisible?: (value: boolean) => void
}

export const SearchBar: React.FC<ISearchbar> = ({ setSearchBarVisible }) => {
  const navigate = useNavigate()

  const [model, setModel] = useState<string>('islamqa') 
  const [language, setLanguage] = useState<string>('rus') 
  const [question, setQuestion] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [popupVisible, setPopupVisible] = useState<boolean>(false)
  const [sourceType, setSourceType] = useState<any>('')


  const handleModelChange = (value: string) => {
    setModel(value);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };
  const closePopup = () => {
    setPopupVisible(false)
    if (setSearchBarVisible) setSearchBarVisible(false)
  }

  //const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const isCreating = status === 'creating'
  const isUpdating = status === 'updating'

  const getLabel = () => {
    console.log({ isCreating, isUpdating })
    switch (true) {
      case isCreating:
        return 'Настраиваем базу знаний ...'
      case isUpdating:
        return 'Обновляем базу знаний ...'
      default:
        return 'Спроси свой вопрос здесь'
    }
  }

  const onSearch = () => {
    if (question.length > 0) {
      navigate(
        `${Path.SEARCH}?data=${JSON.stringify({
          searchQuery: question,
          model: model,
        })}`
      )
      closePopup()
    }
  }

  return (
    <div className="p-2 text-sm font-sans text-slate-900 bg-secondaryLight border focus:shadow-md rounded-lg">
      <input
        required
        autoFocus
        type="search"
        id="search"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter' && question.length > 0) {
            onSearch()
          }
        }}
        className="bg-transparent w-full p-2 focus:outline-none disabled:cursor-not-allowed placeholder:text-lg caret-mint"
        placeholder={getLabel()}
      />
      <Dialog open={popupVisible} onOpenChange={setPopupVisible}>
        <div className="flex mt-2 justify-end items-center space-x-2">
          <Popover
            // side="right"
            open={open}
            onOpenChange={setOpen}
            // openDelay={5}
          >
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandGroup>
                  {sourceMenu
                    .filter((item) => !item.disabled)
                    .map(({ name, link }) => (
                      <DialogTrigger className="w-full">
                        <CommandItem
                          key={link}
                          value={name}
                          onSelect={() => {
                            setSourceType(link)
                            setOpen(false)
                          }}
                        >
                          {name}
                        </CommandItem>
                      </DialogTrigger>
                    ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="flex space-x-2">
          
          <Select value={language} onValueChange={(value) => handleLanguageChange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выбери язык" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rus">Русский</SelectItem>
              <SelectItem value="eng">Английский</SelectItem>
              <SelectItem value="arab">Арабский</SelectItem>
            </SelectContent>
          </Select>

          <Select value={model} onValueChange={(value) => handleModelChange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выбери базу знаний" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="islamqa">Islamqa</SelectItem>
              <SelectItem value="fatawa">Fatawa</SelectItem>
            </SelectContent>
          </Select>
            {isCreating || isUpdating ? (
              <div className="w-7 h-7 grid place-content-center rounded-full bg-olive-green">
                <Loader size={30} />
              </div>
            ) : (
              <ArrowRightCircleIcon
                onClick={onSearch}
                className={classNames(
                  'w-8 h-8 transition-colors ease-in',
                  question.length > 0
                    ? 'fill-olive-green'
                    : 'fill-olive-green/20'
                )}
              />
            )}
          </div>
        </div>
        <DialogContent className="rounded-md">
          <DialogHeader>
            <DialogTitle>
              {dialogTitle[sourceType as keyof typeof dialogTitle]}
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
