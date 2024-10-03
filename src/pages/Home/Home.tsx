import React, { useState } from 'react'
import { SearchBar } from '../../components/SearchBar'
import GithubCards from './githubCards'
import { ScrollArea } from '../../components'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { ArrowRightCircleIcon } from '@heroicons/react/16/solid'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const Home: React.FC = () => {
  const [license, setLicense] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortByStars, setSortByStars] = useState<boolean>(false)
  const [sortByForks, setSortByForks] = useState<boolean>(false)
  const [priority, setPriority] = useState<string>('stars')

  const toggleSortByStars = () => {
    setSortByStars((prev) => !prev)
    setPriority('stars')
  }

  const toggleSortByForks = () => {
    setSortByForks((prev) => !prev)
    setPriority('forks')
  }

  return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-[#FCFCF9]">
        <p className="text-3xl text-olive-green mb-10">
          Помощник по вопросам Ислама
        </p>
        <div className="w-[35rem]">
          <SearchBar />
        </div>
        {/* <Separator className="w-[40rem] my-4" />
        <div className="flex mt-4 justify-center items-center w-[42rem] space-x-2">
          <p className="mr-2">License</p>
          <Select
            value={license}
            onValueChange={(value) => setLicense(value)}
            // @ts-ignore
            className="w-[10rem]"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="License" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="AGPL">AGPL</SelectItem>
              <SelectItem value="AGPL V3">AGPL V3</SelectItem>
              <SelectItem value="Apache 2.0">Apache 2.0</SelectItem>
              <SelectItem value="BSD-3">BSD-3</SelectItem>
              <SelectItem value="BSL">BSL</SelectItem>
              <SelectItem value="Custom">Custom</SelectItem>
              <SelectItem value="Eclipse Public License">
                Eclipse Public License
              </SelectItem>
              <SelectItem value="EUPL">EUPL</SelectItem>
              <SelectItem value="GPL">GPL</SelectItem>
              <SelectItem value="GPL V2">GPL V2</SelectItem>
              <SelectItem value="GPL V2+">GPL V2+</SelectItem>
              <SelectItem value="GPL V3">GPL V3</SelectItem>
              <SelectItem value="LGPL V3">LGPL V3</SelectItem>
              <SelectItem value="MIT">MIT</SelectItem>
              <SelectItem value="MIT expat">MIT expat</SelectItem>
              <SelectItem value="MPL V2">MPL V2</SelectItem>
              <SelectItem value="OSL-3.0">OSL-3.0</SelectItem>
              <SelectItem value="SSPL v1">SSPL v1</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Filter by name"
            className="w-[20rem]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex" onClick={toggleSortByStars} >
            <ArrowRightCircleIcon
              className={`cursor-pointer ${
                sortByStars ? 'rotate-90' : 'rotate-[-90deg]'
              }`}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          </div>
          <div className="flex" onClick={toggleSortByForks}>
            <ArrowRightCircleIcon
              className={`cursor-pointer ${
                sortByForks ? 'rotate-90' : 'rotate-[-90deg]'
              }`}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-git-fork h-8 w-8 mr-1"
            >
              <circle cx="12" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <circle cx="18" cy="6" r="3" />
              <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
              <path d="M12 12v3" />
            </svg>
          </div>
        </div>
        <div className="max-w-[42rem] max-h-[20rem] w-full overflow-y-auto mt-4">
          <ScrollArea>
            <GithubCards
              numToShowInitially={6}
              license={license}
              searchQuery={searchQuery}
              sortByStars={sortByStars}
              sortByForks={sortByForks}
              priority={priority}
            />
          </ScrollArea> */}
        {/* </div> */}
      </div>
  )
}
