import { ReactNode, useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Chat } from './Chat'
import useHomeSlice from '../../Home/home.store'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea,
} from '../../../components'
import { DatasourceIcon } from '../../../components/DatasourceIcon'
import { findSourceIcon } from '../../../utils/fn'
import { ResponseDataType, SourceType } from '../../../utils/types'
import { Badge } from '@/components/ui/badge'
import { MinusCircleIcon } from '@heroicons/react/16/solid'
import { classNames } from '@/utils/fn'

type IDataSources = {
  loading: boolean,
  responseData: ResponseDataType;
}

export const DataSources: React.FC<IDataSources> = ({ loading, responseData }) => {
  const [showDataSources, setShowDataSources] = useState<boolean>(false)
  const [showChat, setShowChat] = useState<boolean>(false)
  const [chat, setChat] = useState<string[]>([
    "Hello!",
    "Hi there!",
    "How are you?",
    "I'm good, thanks!",
    "What are you up to?",
    "Just working on some code.",
    "Nice! Keep it up!",
  ])
  const [dataSource, setDataSource] = useState<{
    name: ReactNode
    auto_id: number
    answer: string
    distance: number
    question: string
    link: string | null
  }>({ name: '', answer: '', auto_id: 0, distance: 0, question: '', link: '' })
  const { answer } = useHomeSlice((state) => state)
  // const dataSources = answer?.[1]?.dataSources ?? []

  const dataSources = responseData ? responseData.sources : [];

  return (
    <div>
      <Dialog>
        {!loading && dataSources.length > 0 && (
          <span className="flex items-center space-x-2 mb-2 text-olive-green">
            <DatasourceIcon className="w-4 h-4" />
            <p className="text-lg font-semibold">Sources</p>
          </span>
        )}
        <ScrollArea className="h-auto">
          <div className="flex flex-wrap justify-start gap-4">
            {loading
              ? new Array(3)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={'loader' + idx}
                    className="w-[150px] h-[5rem] bg-olive-green/20 rounded-md animate-pulse"
                  />
                ))
              : (dataSources ?? [])
                .slice(0, showDataSources ? dataSources.length : 3)
                .map((item: SourceType, idx: number) => (
                  <DialogTrigger key={idx} asChild>
                    <motion.article
                      className="w-[150px] h-[5rem] smax-w-sm p-2 cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700pace-y-2 card flex flex-col justify-between bg-gray-200"
                      exit={{ opacity: 0, transition: { duration: 0.7 } }}
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0, x: -20 / (idx + 1) },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.3,
                            ease: 'easeOut',
                            delay: (idx + 1) / 10,
                          },
                        },
                      }}
                      onClick={() => {
                        setDataSource({
                          name: (
                            <span className="flex space-x-1 mr-2">
                              {findSourceIcon(
                                item.question ??
                                item.question
                              )}
                              <h3 className="text-slate-500 flex space-x-2">
                                {String(
                                  item.question ??
                                  item.question ??
                                  `Source ${idx}`
                                )}
                              </h3>
                            </span>
                          ),
                          answer: item.answer,
                          auto_id: item.auto_id,
                          distance: item.distance,
                          question: item.question,
                          link: item.link
                        })
                      }}
                    >
                      <p className="font-medium text-[13px] leading-4 text-olive-green line-clamp-2 text-ellipsis text-wrap whitespace-pre-wrap">
                        {item.answer}
                      </p>
                      <span className="flex space-x-1 text-xs">
                        <div className="bg-white rounded-full">
                          {findSourceIcon(
                            item.link ?? item.link
                          )}
                        </div>
                        <p className="font-medium text-[12px] line-clamp-1 text-ellipsis ...">
                          {item.link ??
                            item.link ??
                            `Source ${idx}`}
                        </p>
                        <h2>•</h2>
                        <p>{idx}</p>
                      </span>
                    </motion.article>
                  </DialogTrigger>
                ))}
            {dataSources?.length > 3 && !showDataSources && !loading && (
              <article
                className="w-[150px] h-[5rem] space-y-2 card flex flex-col justify-between"
                onClick={() => setShowDataSources(true)}
              >
                <h3 className="font-semibold cursor-pointer">
                  <PlusCircleIcon className="w-6 h-6 fill-slate-800 text-white" />
                </h3>
                <p className="text-[12px]">
                  View {dataSources.length - 3} more
                </p>
              </article>
            )}
            {
              dataSources?.length > 3 && showDataSources && !loading && (
                <article
                  className="w-[150px] space-y-2 card flex flex-col justify-between"
                  onClick={() => setShowDataSources(false)}
                >
                  <h3 className="font-semibold cursor-pointer">
                    <MinusCircleIcon className="w-4 h-4 fill-slate-800 text-white" />
                  </h3>
                  <p className="text-[12px]">
                    Collapse
                  </p>
                </article>
              )
            }
          </div>
        </ScrollArea>
        {/* This is the popup screen after clicking a source */}
        <DialogContent className="rounded-md">
          {/* <DialogHeader>
            <DialogTitle><a href={dataSource.link ? dataSource.link : undefined} target='_blank'>{dataSource.question}</a></DialogTitle>
          </DialogHeader> */}
          {/* <Button className=''>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="arrow-left-to-line"
              className={classNames('mx-2 w-4 h-4 text-slate-500 hover:text-olive-green transition-all ease-in duration-700 z-10 transform',
                showChat ? 'rotate-90' : 'rotate-[-90deg]'
              )}
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="white"
                d="M0 424c0 13.3 10.7 24 24 24s24-10.7 24-24L48 88c0-13.3-10.7-24-24-24S0 74.7 0 88L0 424zM135.6 238.5c-4.8 4.5-7.6 10.9-7.6 17.5s2.7 12.9 7.6 17.5l136 128c9.7 9.1 24.8 8.6 33.9-1s8.6-24.8-1-33.9L212.5 280l83.5 0 128 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-128 0-83.5 0 91.9-86.5c9.7-9.1 10.1-24.3 1-33.9s-24.3-10.1-33.9-1l-136 128z"
              ></path>
            </svg> */}
            {/* <p className='text-[12px]' onClick={() => setShowChat(!showChat)}>{showChat ? 'Close Chat' : 'Open Chat'}</p>
          </Button>
          {/* Chat goes here */}
          {/* {
            showChat && (
              <Chat chat={chat} setChat={setChat}>
              </Chat>
            )
          } */}
          <ScrollArea className="h-[15rem] text-sm">
            <div className='flex flex-row'>
              <div className='flex flex-col space-y-2'>
              <div className='flex flex-row justify-start'>
                <Badge>
                  {dataSource.link ? (
                    <a href={dataSource.link} target='_blank'>{dataSource.link}</a>
                  ) : (
                    <span>{dataSource.link}</span> // Or any fallback text if link is null
                  )}
                </Badge>
              </div>
                <div>
                  {dataSource.answer}
                </div>
              </div>
              {/* <div className='flex flex-col space-y-2'>
                <Badge>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                  {dataSource.stars}
                </Badge>
                <Badge>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-git-fork mr-2 h-4 w-4">
                    <circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" /><path d="M12 12v3" /></svg>
                  {dataSource.forks}
                </Badge>
              </div> */}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
