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
      </div>
  )
}
