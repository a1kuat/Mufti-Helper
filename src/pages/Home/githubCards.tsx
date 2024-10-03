import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gitHubData } from './githubdata.tsx'
import { findSourceIcon } from '@/utils/fn'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from '../../components'


interface GitHubData {
  name: string
  alternativeTo: string
  license: string
  github_url: string
  stars: string
  forks: string
}

interface Props {
  numToShowInitially: number
  license: string
  searchQuery: string;
  sortByStars: boolean;
  sortByForks: boolean;
  priority: string;
}

const GithubCards: React.FC<Props> = ({
  numToShowInitially,
  license,
  searchQuery,
  sortByStars,
  sortByForks,
  priority,
}) => {
  const [showAllCards, setShowAllCards] = useState<boolean>(false)

  useEffect(() => {
    // Reset showAllCards to false whenever any of the props change
    setShowAllCards(false);
  }, [license, searchQuery]);

  // filtering by license
  const filterByLicense = gitHubData.filter((item: GitHubData) => {
    return license === 'All' ? true : item.license.trim() === license;
  })

  const filteredData = filterByLicense.filter((item: GitHubData) => {
    const itemName = item.name.toLowerCase()
    const query = searchQuery.toLowerCase()
    return itemName.includes(query)
  })

  const sortedData = filteredData
    .slice()
    .sort((a: GitHubData, b: GitHubData) => {
      if (priority === 'stars') {
        // Sort by stars
        return sortByStars ? Number(a.stars) - Number(b.stars) : Number(b.stars) - Number(a.stars)
      } else if (priority === 'forks') {
        // Sort by forks
        return sortByForks ? Number(a.forks) - Number(b.forks) : Number(b.forks) - Number(a.forks)
      }
      return 0 // Default return if priority is not specified
    })

  const visibleData = showAllCards
    ? sortedData
    : sortedData.slice(0, numToShowInitially)

  return (
    <>
      <div className="flex flex-wrap justify-start gap-4">
        {
          sortedData.length === 0 && (
            <Alert>
              <AlertDescription>
                No repositories with {license} license exist.
              </AlertDescription>
            </Alert>

          )
        }

        {visibleData.map((item: GitHubData, idx: number) => (
          <a href={item.github_url} target='_blank'>
            <motion.article
              key={idx}
              className="w-[200px] h-[8rem] smax-w-sm p-2 cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700pace-y-2 card flex flex-col justify-between bg-gray-200"
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
                    delay: (idx + 1) / 100,
                  },
                },
              }}
            >
              <p className="font-medium text-[13px] leading-4 text-olive-green line-clamp-1 text-ellipsis text-wrap whitespace-pre-wrap">
                {item.name}
              </p>
              <p className="font-medium text-[13px] leading-4 text-olive-green line-clamp-1 text-ellipsis text-wrap whitespace-pre-wrap">
                {item.alternativeTo}
              </p>
              <p className="font-medium text-[13px] leading-4 text-olive-green line-clamp-1 text-ellipsis text-wrap whitespace-pre-wrap">
                {item.license ? <Badge>{item.license}</Badge> : <></>}
              </p>
              <div className="flex items-center align-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <p className="font-medium text-[13px] leading-4 text-olive-green line-clamp-1 text-ellipsis text-wrap whitespace-pre-wrap">
                  {item.stars}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-git-fork h-3 w-3 ml-4 mr-1"
                >
                  <circle cx="12" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="18" cy="6" r="3" />
                  <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
                  <path d="M12 12v3" />
                </svg>
                <p className="font-medium text-[13px] leading-4 text-olive-green line-clamp-1 text-ellipsis text-wrap whitespace-pre-wrap">
                  {item.forks}
                </p>
              </div>
              <span className="flex space-x-1 text-xs">
                <div className="bg-white rounded-full">
                  {findSourceIcon(item.github_url ?? item.github_url)}
                </div>
                <a
                  href={item.github_url}
                  target="_blank"
                  className="font-medium text-[12px] line-clamp-1 text-ellipsis ..."
                >
                  {item.github_url ?? item.github_url ?? `Source ${idx + 1}`}
                </a>
                <h2>•</h2>
                <p>{idx + 1}</p>
              </span>
            </motion.article>
          </a>
        ))}
      </div>
      {!showAllCards && sortedData.length != 0 && (
        <button
          onClick={() => setShowAllCards(true)}
          className="flex items-center space-x-2 text-[12px] text-gray-600 hover:text-gray-900 cursor-pointer focus:outline-none"
        >
          <PlusCircleIcon className="w-6 h-6 fill-slate-800 text-white mt-2" />
          <span className="mt-2">
            View {sortedData.length !== 0 ? sortedData.length - numToShowInitially : 0} more
          </span>
        </button>
      )}
    </>
  )
}

export default GithubCards
