import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { SEARCH_BACKEND, X_API_KEY } from '../../utils/constants'
import { ResponseDataType } from '../../utils/types'
import { ScrollArea, Separator } from '../../components'
import { DataSources } from './components/DataSources'

type SearchProps = {
  searchQuery: string
  model: string
}

export const Search: React.FC<SearchProps> = ({ searchQuery, model }) => {
  const [responseData, setResponseData] = useState<ResponseDataType | null>(null)

  const { mutate, isPending } = useMutation({
    mutationKey: [searchQuery, model],
    mutationFn: async () => {
      const url: string = `${SEARCH_BACKEND}?source_id=${model}&query=${searchQuery}&limit=10&with_answer=true`
      const headers: HeadersInit = {
        accept: 'application/json',
        'x-api-key': X_API_KEY,
      }

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: headers,
        })

        const data = await response.json()
        return data
      } catch (error) {
        throw error
      }
    },
    onSuccess: (data) => {
      console.log(data.data)
      const formattedResponse: ResponseDataType = {
        response: 'OK',
        sources: data.data,
      }
      setResponseData(formattedResponse)
    },
  })
  useEffect(() => {
    if (searchQuery) {
      mutate()
    }
  }, [searchQuery, model])

  return (
    <ScrollArea className="h-screen bg-secondaryLight">
      <div className="h-screen flex flex-col bg-secondaryLight">
        <Separator />

        {/* Data Sources Section */}
        <div className="flex-grow p-8">
          <div className="py-4 space-y-6 flex flex-col items-center">
            <div className="w-4/5 space-y-4">
              <h2 className="text-3xl text-olive-green">{searchQuery}</h2>
              <DataSources responseData={responseData!} loading={isPending} />
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
