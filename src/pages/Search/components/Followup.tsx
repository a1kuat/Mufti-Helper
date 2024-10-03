import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { PlusIcon } from '@heroicons/react/16/solid'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Separator,
  Button,
} from '../../../components'
import axios from '../../../utils/axios'
import { Path, UserType } from '../../../utils/types'

type IFollowup = {
  loading: boolean
  knowledge_id: string
  bot_id: string
  promptSuggestions: any[]
}

type ISubQuery = {
  text: string
  knowledge_id: string
  bot_id: string
}

const SubQuery: React.FC<ISubQuery> = ({ text, bot_id, knowledge_id }) => {
  const navigate = useNavigate()

  const { mutate, isPending, data } = useMutation({
    mutationKey: [text],
    mutationFn: () =>
      axios({
        method: 'POST',
        // baseURL: CONVERSATION_API_URL,
        url: `/conversation/${knowledge_id}/${bot_id}`,
        data: { role: UserType.user, content: text },
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }),
  })

  const onSearch = () => {
    if (text.length > 0) {
      navigate(
        `${Path.SEARCH}?data=${btoa(
          JSON.stringify({
            searchQuery: text,
          })
        )}`
      )
    }
  }

  useEffect(() => {
    mutate()
  }, [text])

  return (
    <div>
      {isPending ? (
        <div className="space-y-2">
          <div className="w-full h-3 rounded-sm bg-olive-green/20 animate-pulse" />
          <div className="w-full h-3 rounded-sm bg-olive-green/20 animate-pulse" />
          <div className="w-[95%] h-3 rounded-sm bg-olive-green/20 animate-pulse" />
          <div className="w-[80%] h-3 rounded-sm bg-olive-green/20 animate-pulse" />
        </div>
      ) : (
        <>
          <p className="text-sm text-olive-green py-2">
            {data?.data?.[0]?.messages[1]?.content}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-slate-500 text-xs font-medium break-words">
              {new Date(
                data?.data?.[0]?.messages[1]?.created_at
              ).toLocaleString() ?? new Date().toLocaleString()}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSearch}
              className="p-2 rounded-full text-sm text-slate-600"
              endIcon={<ArrowUpRightIcon className="w-2 h-2" />}
            >
              See full preview
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export const Followup: React.FC<IFollowup> = ({
  promptSuggestions,
  loading,
  bot_id,
  knowledge_id,
}) => {
  return (
    <>
      <Separator />
      <span className="flex space-x-2">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="layer-plus"
          className="w-5 h-5"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M464 4c-11 0-20 9-20 20V60H408c-11 0-20 9-20 20s9 20 20 20h36v36c0 11 9 20 20 20s20-9 20-20V100h36c11 0 20-9 20-20s-9-20-20-20H484V24c0-11-9-20-20-20zM288 128c-8.5 0-17 1.7-24.8 5.1L53.9 222.8C40.6 228.5 32 241.5 32 256s8.6 27.5 21.9 33.2l209.3 89.7c7.8 3.4 16.3 5.1 24.8 5.1s17-1.7 24.8-5.1l209.3-89.7c13.3-5.7 21.9-18.8 21.9-33.2s-8.6-27.5-21.9-33.2L312.8 133.1c-7.8-3.4-16.3-5.1-24.8-5.1zm-5.9 49.2c1.9-.8 3.9-1.2 5.9-1.2s4 .4 5.9 1.2L477.7 256 293.9 334.8c-1.9 .8-3.9 1.2-5.9 1.2s-4-.4-5.9-1.2L98.3 256l183.8-78.8zM85.1 337.4L53.9 350.8C40.6 356.5 32 369.5 32 384s8.6 27.5 21.9 33.2l209.3 89.7c7.8 3.4 16.3 5.1 24.8 5.1s17-1.7 24.8-5.1l209.3-89.7c13.3-5.7 21.9-18.8 21.9-33.2s-8.6-27.5-21.9-33.2l-31.2-13.4L430 363.5 477.7 384 293.9 462.8c-1.9 .8-3.9 1.2-5.9 1.2s-4-.4-5.9-1.2L98.3 384 146 363.5 85.1 337.4z"
          ></path>
        </svg>
        <p className="font-semibold text-lg">Related</p>
      </span>
      {loading ? (
        <div className="mt-2 w-2/3 h-4 rounded-sm bg-olive-green/20 animate-pulse" />
      ) : (
        promptSuggestions.map((text: any, idx: number) => (
          <motion.div
            key={idx}
            className="w-full"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.7 } }}
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: (idx + 1) / 2 },
              },
            }}
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={text}>
                <AccordionTrigger
                  className="py-1 font-semibold text-olive-green hover:text-mint"
                  // endIcon={<PlusIcon className="w-4 h-4" />}
                >
                  {text}
                </AccordionTrigger>
                <AccordionContent>
                  <SubQuery
                    text={text}
                    knowledge_id={knowledge_id}
                    bot_id={bot_id}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        ))
      )}
    </>
  )
}
