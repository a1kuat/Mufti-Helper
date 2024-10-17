import { ArrowRightCircleIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'

type ISearchBarProps = {
  onSearch: (query: string, model: string) => void
}

export const SearchBar: React.FC<ISearchBarProps> = ({ onSearch }) => {
  const [model, setModel] = useState<string>('islamqa')
  const [question, setQuestion] = useState<string>('')

  const handleSearch = () => {
    if (question.length > 0) {
      onSearch(question, model)  // Call onSearch with query and model
    }
  }

  const getLabel = () => 'Спросите свой вопрос здесь'

  return (
    <div className="p-2 text-sm font-sans text-slate-900 bg-secondaryLight border focus:shadow-md rounded-lg flex items-center">
      {/* Search Input */}
      <input
        required
        autoFocus
        type="search"
        id="search"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter' && question.length > 0) {
            handleSearch()
          }
        }}
        className="bg-transparent w-full p-2 focus:outline-none disabled:cursor-not-allowed placeholder:text-lg caret-mint"
        placeholder={getLabel()}
      />

      {/* Right Side Controls: Model Selector and Search Icon */}
      <div className="flex space-x-2 items-center">
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="border border-gray-300 p-2 rounded-md bg-white"
        >
          <option value="islamqa">Islamqa</option>
          <option value="fatawa">Fatawa</option>
        </select>

        <ArrowRightCircleIcon
          onClick={handleSearch}
          className={`w-8 h-8 transition-colors ease-in ${
            question.length > 0 ? 'fill-olive-green' : 'fill-olive-green/20'
          }`}
        />
      </div>
    </div>
  )
}
