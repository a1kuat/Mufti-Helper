import { ReactNode, useEffect, useState } from 'react'
import { PlusCircleIcon, MinusCircleIcon, ClipboardIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '../../../components'
import { DatasourceIcon } from '../../../components/DatasourceIcon'
import { findSourceIcon } from '../../../utils/fn'
import { ResponseDataType, SourceType } from '../../../utils/types'
import { notify } from '@/components/ui/notification'

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

  // Set the first data source by default when dataSources are available
  useEffect(() => {
    if (dataSources.length > 0) {
      const firstItem = dataSources[0];
      setDataSource({
        name: (
          <span className="flex space-x-1 mr-2">
            {findSourceIcon(firstItem.question)}
            <h3 className="text-slate-500 flex space-x-2">
              {String(firstItem.question ?? 'Source 0')}
            </h3>
          </span>
        ),
        answer: firstItem.answer,
        auto_id: firstItem.auto_id,
        distance: firstItem.distance,
        question: firstItem.question,
        link: firstItem.link,
      });
    }
  }, [dataSources]);

  const defaultMessage = `No answer provided!`;

  const handleCopy = (item: SourceType) => {
    const textToCopy = `Вопрос: ${item.question}\nОтвет: ${
      item.answer ? item.answer : defaultMessage
    }\n${item.link ? `Ссылка: ${item.link}` : ''}`;
  
    navigator.clipboard.writeText(textToCopy).then(() => {
      notify('Copied to clipboard!', 'success');
    });
  };
  

  return (
    <div className="flex h-full">
      {/* Left side: Cards list */}
      <div className="w-1/3 border-r border-gray-300 p-4">
        {!loading && dataSources.length > 0 && (
          <span className="flex items-center space-x-2 mb-2 text-olive-green">
            <p className="text-lg font-semibold">Источники</p>
          </span>
        )}
        <ScrollArea className="h-auto">
          <div className="flex flex-wrap justify-start gap-6">
            {loading
              ? new Array(5)
                  .fill(0)
                  .map((_, idx) => (
                    <div
                      key={'loader' + idx}
                      className="w-[300px] h-[9rem] bg-olive-green/20 rounded-md animate-pulse"
                    />
                  ))
              : (dataSources ?? [])
                  .slice(0, showDataSources ? dataSources.length : 5)
                  .map((item: SourceType, idx: number) => (
                    <motion.article
                      key={idx}
                      className="w-[300px] h-[9rem] smax-w-sm p-4 cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between bg-gray-200"
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
                      <p className="font-medium text-[16px] leading-6 text-olive-green line-clamp-1 text-ellipsis text-wrap whitespace-pre-wrap">
                        {item.question}
                      </p>
                      <span className="flex space-x-1 text-sm">
                        {item.link ? (
                          <div className="bg-white rounded-full">
                            {findSourceIcon(item.link)}
                          </div>
                        ) : (
                          <div className="bg-white rounded-full">{/* Default Icon */}</div>
                        )}
                        <p className="font-medium text-[14px] line-clamp-1 text-ellipsis ...">
                          {item.link ?? `Source ${idx}`}
                        </p>
                      </span>
                      <div className="flex justify-end mt-2">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(item);
                          }}
                          className="flex items-center bg-black text-white hover:bg-gray-800 py-1 px-3 rounded-full text-sm space-x-1"
                        >
                          <span>Копировать</span>
                          {/* <ClipboardIcon className="h-4 w-4" /> */}
                        </Button>
                      </div>
                    </motion.article>
                  ))}
            {dataSources?.length > 5 && !showDataSources && !loading && (
              <article
                className="w-[300px] space-y-2 card flex flex-col justify-between"
                onClick={() => setShowDataSources(true)}
              >
                <h3 className="font-semibold cursor-pointer">
                  <PlusCircleIcon className="w-5 h-5 fill-slate-800 text-white" />
                </h3>
                <p className="text-[14px]">Посмотреть еще {dataSources.length - 5}</p>
              </article>
            )}
            {dataSources?.length > 5 && showDataSources && !loading && (
              <article
                className="w-[300px] space-y-2 card flex flex-col justify-between"
                onClick={() => setShowDataSources(false)}
              >
                <h3 className="font-semibold cursor-pointer">
                  <MinusCircleIcon className="w-5 h-5 fill-slate-800 text-white" />
                </h3>
                <p className="text-[14px]">Свернуть</p>
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
            <p>
            {dataSource.answer
                ? dataSource.answer.split('\n').map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))
                : defaultMessage}
            </p>
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
}