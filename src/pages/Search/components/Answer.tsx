import { motion } from 'framer-motion'
import {
  BookmarkIcon,
  ClipboardDocumentIcon,
  ClipboardIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'

import { notify } from '@/components/ui/notification'
import {
  Typewriter,
  Tooltip,
  TooltipTrigger,
  Button,
  TooltipContent,
  Separator,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  ScrollArea,
  DialogFooter,
} from '../../../components'
import { classNames, findSourceIcon } from '../../../utils/fn'
import { DatasourceIcon } from '../../../components/DatasourceIcon'

type IAnswer = {
  text: string
  // shareLink: string
  sources: any[]
  loading: boolean
  isQueryPath: boolean
  // alreadySaved: boolean
  searchQuery: string
  // onShare: () => void
  // onSave: () => void
}

export const Answer: React.FC<IAnswer> = ({
  text,
  sources,
  loading,
  isQueryPath,
}) => {

  const onCopy = () => {
    navigator.clipboard.writeText(text)
    notify('Result copied to clipboard!', 'success')
  }
  return (
    <>
      <Separator />
      <span className="flex items-center space-x-2 mb-2 text-olive-green">
        {loading ? (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="circle-half-stroke"
            className="w-4 h-4 animate-spin"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M464 256c0-114.9-93.1-208-208-208V464c114.9 0 208-93.1 208-208zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"
            ></path>
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="align-left"
            className="w-4 h-4"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M24 40C10.7 40 0 50.7 0 64S10.7 88 24 88H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zm0 128c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zM0 320c0 13.3 10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H24c-13.3 0-24 10.7-24 24zM24 424c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H24z"
            ></path>
          </svg>
        )}
        <p className="text-lg font-semibold">Answer</p>
      </span>
      {loading ? (
        <>
          <div className="w-full h-3 rounded-sm bg-olive-green/20 animate-pulse" />
          <div className="w-full h-3 rounded-sm bg-olive-green/20 animate-pulse" />
          <div className="w-[95%] h-3 rounded-sm bg-olive-green/20 animate-pulse" />
          <div className="w-[80%] h-3 rounded-sm bg-olive-green/20 animate-pulse" />
        </>
      ) : (
        <motion.div
          key="knowledge bot answer"
          className=" text-olive-green"
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 1 },
            },
          }}
        >
          {/* <Typewriter
            minTypingDelay={0}
            maxTypingDelay={5}
            caretBackground="transparent"
            textClassName="text-olive-green font-medium"
            text={text}
          /> */}

          {text}
          <div className="flex justify-end items-center">
            {sources.length > 0 && (
              <Dialog>
                <Tooltip>
                  <DialogTrigger>
                    <TooltipTrigger>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 rounded-full"
                      >
                        <DatasourceIcon className="w-3 h-3 mr-1 hover:text-olive-green" />
                      </Button>
                      <TooltipContent className="bg-black/80 text-white">
                        <p>Data sources</p>
                      </TooltipContent>
                    </TooltipTrigger>
                  </DialogTrigger>
                  <DialogContent className="rounded-md">
                    <DialogHeader>
                      <DialogTitle>
                        <span className="flex items-center space-x-2 mb-2 text-olive-green">
                          <DatasourceIcon className="w-4 h-4" />
                          <p className="text-lg font-semibold">Sources</p>
                        </span>
                      </DialogTitle>
                    </DialogHeader>
                    <Accordion type="single" collapsible className="w-full">
                      {sources.map((source, idx) => (
                        <AccordionItem value={`Source ${idx + 1}`}>
                          <AccordionTrigger className="py-2 font-semibold text-olive-green hover:text-mint">
                            <span className="flex space-x-2">
                              {findSourceIcon(
                                source.node.metadata.url ??
                                  source.node.metadata.URL
                              )}
                              {source.node.metadata.url ??
                                source.node.metadata.URL ??
                                `Source ${idx + 1}`}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ScrollArea className="h-[15rem] space-y-2">
                              <p className="text-xs font-semibold text-olive-green/80">
                                Score:{' '}
                                <span>{Number(source.score.toFixed(1))}</span>
                              </p>
                              <Separator />
                              <p>{source.node.text}</p>
                            </ScrollArea>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </DialogContent>
                </Tooltip>
              </Dialog>
            )}
          </div>
        </motion.div>
      )}
    </>
  )
}
