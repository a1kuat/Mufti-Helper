import React, { useEffect, useRef, useState } from 'react'
import { AxiosResponse } from 'axios'
import { useLocation } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'
import { useMutation } from '@tanstack/react-query'
import {
  BookmarkIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  ShareIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline'

import { notify } from '@/components/ui/notification'
import { SEARCH_BACKEND,  X_API_KEY } from '../../utils/constants'
import { Path, ResponseDataType } from '../../utils/types'
import useHomeSlice from '../Home/home.store'
import { classNames } from '../../utils/fn'
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea,
  Separator,
} from '../../components'
import { DataSources } from './components/DataSources'
import { Answer } from './components/Answer'
import { Followup } from './components/Followup'
import { SearchBar } from '@/components/SearchBar'
function useQuery() {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

export const Search = () => {
  const query = useQuery()
  const location = useLocation()
  const copyRef = useRef()
  const dataQuery =
    query.get('data') ??
    JSON.stringify({ id: undefined, knowledge_id: undefined })
  const data = JSON.parse(dataQuery)

  const {
    bot,
    answer,
    history,
    setHistory,
    setAnswer,
    saveItem,
    savedItems,
    removeSavedItem,
  } = useHomeSlice((state) => state)
  // let bot_id = bot?.id
  // let knowledge_id = bot?.knowledge_id
  let searchQuery = data?.searchQuery
  let model = data?.model
  const isQueryPath = [Path.QUERY, Path.QUERY + '/'].includes(location.pathname)
  console.log("isQuery:", isQueryPath);
  console.log("data:", data);
  if (isQueryPath) {
    // bot_id = data?.id
    // knowledge_id = data?.knowledge_id
    searchQuery = data?.searchQuery
    model = data?.model
  }

  const alreadySaved = savedItems.map(({ text }) => text).includes(searchQuery)
  console.log("already saved:", alreadySaved);
  const shareLink = `${window.location.protocol}//${
    window.location.host
  }/query?data=${JSON.stringify({
    // id: bot?.id,
    // knowledge_id: bot?.knowledge_id,
    searchQuery,
    model,
  })}`

  // const {
  //   mutate: fetchPromptSuggestions,
  //   isPending: suggestionsLoading,
  //   data: promptSuggestions,
  // } = useMutation({
  //   mutationKey: [searchQuery],
  //   mutationFn: () =>
  //     axios.post(
  //       `${SEARCH_BACKEND}/query/`,
  //     ),
  // })

  const { mutate, isPending } = useMutation({
    mutationKey: [searchQuery],
    mutationFn: async () => {
      // if (alreadySaved) {
      //   return Promise.resolve({
      //     data: savedItems.find(({ text }) => text === searchQuery)?.reply,
      //   })
      // }

      const url: string = `${SEARCH_BACKEND}?source_id=${model}&query=${searchQuery}`

      const headers: HeadersInit = {
        accept: 'application/json',
        'x-api-key': X_API_KEY,
      }
      console.log("DATA:",data)
      console.log("URL:",url);
      console.log("HEAD:",headers);
      // const body: string = JSON.stringify({
      //   text: searchQuery,
      //   n_results: 20,
      // })

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: headers,
        })

        const data = response.json()
        console.log("DATA:",data)
        console.log("RESP:",response)
        console.log("URL:",url);
        console.log("HEAD:",headers);
        return data
      } catch (error) {
        throw error
      }
    },
    onSuccess: (data: AxiosResponse | any) => {
      console.log(data)
      const sources = Array.isArray(data.data) ? data.data : [data.data];
      const formattedResponse: ResponseDataType = {
        response: 'OK',
        sources: data.data,
      };
      setResponseData(formattedResponse)

      if (
        !history.map(({ text }) => text).includes(searchQuery) &&
        !isQueryPath
      ) {
        setHistory({
          text: searchQuery ?? '',
          sources: data,
          created_at: new Date(),
        })
      }
    },
  })

  const onShare = () => {
    // @ts-ignore
    copyRef?.current?.select()
    // @ts-ignore
    copyRef?.current?.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(shareLink)
    notify('Public link copied to clipboard!', 'success')
  }

  const onSave = () => {
    alreadySaved
      ? removeSavedItem(searchQuery)
      : saveItem({
          text: searchQuery,
          reply: answer,
          created_at: new Date(),
        })
    notify(alreadySaved ? 'Unsaved this query' : 'Saved this query', 'success')
  }

  const [responseData, setResponseData] = useState<ResponseDataType | null>(
    null
  )

  useEffect(() => {
    if (!history.map(({ text }) => text).includes(searchQuery)) {
      mutate()
    } else {
      history.map((item) => {
        if (item.text === searchQuery) {
          const newDataSource: ResponseDataType = {
            sources: item.sources,
            response: 'ok',
          }

          setResponseData(newDataSource)
        }
      })
    }
  }, [searchQuery])

  // const [summary, setSummary] = useState('')

  // useEffect(() => {
  //   setSummary(responseData?.summary ? responseData?.summary : "")
  // }, [responseData])
  console.log("Response data:",responseData);
    return (
      <ScrollArea className="h-screen bg-secondaryLight">
        <div className="h-screen flex flex-col bg-secondaryLight">
          {/* Centered SearchBar */}
          <div className="flex justify-center items-center flex-col py-10">
            <p className="text-3xl text-olive-green mb-10">
              Помощник по вопросам Ислама
            </p>
            <div className="w-[35rem]">
              <SearchBar />
            </div>
          </div>
  
          {/* Separator between SearchBar and Data */}
          <Separator />
  
          {/* DataSources Section */}
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
    );
  };
