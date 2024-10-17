import React, { useState } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { Search } from '../Search'

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [model, setModel] = useState<string>('islamqa')

  const handleSearch = (query: string, selectedModel: string) => {
    setSearchQuery(query)
    setModel(selectedModel)
  }

  return (
    <div className="w-full h-screen flex flex-col items-center bg-[#FCFCF9]">
      <div className="flex flex-col justify-center items-center py-10">
        <p className="text-3xl text-olive-green mb-10">Помощник по вопросам Ислама</p>
        <div className="w-[35rem]">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Pass the search query and model to the Search component */}
      {searchQuery && <Search searchQuery={searchQuery} model={model} />}
    </div>
  )
}
