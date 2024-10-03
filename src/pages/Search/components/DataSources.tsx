import { ReactNode, useState } from 'react'
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '../../../components'
import { DatasourceIcon } from '../../../components/DatasourceIcon'
import { findSourceIcon } from '../../../utils/fn'
import { ResponseDataType, SourceType } from '../../../utils/types'

type IDataSources = {
  loading: boolean,
  responseData: ResponseDataType | null;
}

export const DataSources: React.FC<IDataSources> = ({ loading, responseData }) => {
  const [dataSource, setDataSource] = useState<{
    name: ReactNode
    auto_id: number
    answer: string
    distance: number
    question: string
    link: string | null
  }>({ name: '', answer: '', auto_id: 0, distance: 0, question: '', link: '' })

  const [showDataSources, setShowDataSources] = useState<boolean>(false)
  
  const dataSources = responseData ? responseData.sources : [];

  return (
    <div className="flex h-full">
      {/* Left side: Cards list */}
      <div className="w-1/3 border-r border-gray-300 p-4">
        {!loading && dataSources.length > 0 && (
          <span className="flex items-center space-x-2 mb-2 text-olive-green">
            <p className="text-lg font-semibold">Sources</p>
          </span>
        )}
        <ScrollArea className="h-auto">
          <div className="flex flex-wrap justify-start gap-4">
            {loading
              ? new Array(5)
                  .fill(0)
                  .map((_, idx) => (
                    <div
                      key={'loader' + idx}
                      className="w-[250px] h-[7rem] bg-olive-green/20 rounded-md animate-pulse"
                    />
                  ))
              : (dataSources ?? [])
                  .slice(0, showDataSources ? dataSources.length : 5)
                  .map((item: SourceType, idx: number) => (
                    <motion.article
                      key={idx}
                      className="w-[250px] h-[7rem] smax-w-sm p-2 cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between bg-gray-200"
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
                              {findSourceIcon(item.question)}
                              <h3 className="text-slate-500 flex space-x-2">
                                {String(item.question ?? `Source ${idx}`)}
                              </h3>
                            </span>
                          ),
                          answer: item.answer,
                          auto_id: item.auto_id,
                          distance: item.distance,
                          question: item.question,
                          link: item.link,
                        });
                      }}
                    >
                      <p className="font-medium text-[14px] leading-6 text-olive-green line-clamp-2 text-ellipsis text-wrap whitespace-pre-wrap">
                        {item.answer}
                      </p>
                      <span className="flex space-x-1 text-xs">
                        {item.link ? (
                          <div className="bg-white rounded-full">
                            {findSourceIcon(item.link)}
                          </div>
                        ) : (
                          <div className="bg-white rounded-full">{/* Default Icon */}</div>
                        )}
                        <p className="font-medium text-[12px] line-clamp-1 text-ellipsis ...">
                          {item.link ?? `Source ${idx}`}
                        </p>
                        <h2>•</h2>
                        <p>{idx}</p>
                      </span>
                    </motion.article>
                  ))}
            {dataSources?.length > 5 && !showDataSources && !loading && (
              <article
                className="w-[250px] h-[7rem] space-y-2 card flex flex-col justify-between"
                onClick={() => setShowDataSources(true)}
              >
                <h3 className="font-semibold cursor-pointer">
                  <PlusCircleIcon className="w-4 h-4 fill-slate-800 text-white" />
                </h3>
                <p className="text-[12px]">Посмотреть еще {dataSources.length - 5}</p>
              </article>
            )}
            {dataSources?.length > 5 && showDataSources && !loading && (
              <article
                className="w-[250px] space-y-2 card flex flex-col justify-between"
                onClick={() => setShowDataSources(false)}
              >
                <h3 className="font-semibold cursor-pointer">
                  <MinusCircleIcon className="w-4 h-4 fill-slate-800 text-white" />
                </h3>
                <p className="text-[12px]">Свернуть</p>
              </article>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Right side: Details display */}
      <div className="w-2/3 p-4">
        {dataSource.question ? (
          <div>
            <h2 className="text-xl font-semibold">{dataSource.question}</h2>
            <p>{dataSource.answer}</p>
            {dataSource.link && (
              <div className="mt-2">
                <Badge>
                  <a href={dataSource.link} target="_blank" rel="noopener noreferrer">
                    {dataSource.link}
                  </a>
                </Badge>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Выберите карту, чтобы просмотреть подробности</p>
        )}
      </div>
    </div>
  );
};
