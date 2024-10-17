import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import { NotFound } from '@/components/ui/not-found'
import { Path } from '../utils/types'
import { AppSkeleton } from './AppSkeleton'

import { Home } from '../pages/Home'
import { History } from '../pages/History'
import { Search } from '../pages/Search'

export const AnimatedRoutes = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect to home only when the page is reloaded
  useEffect(() => {
    const entries = window.performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
    const navigationType = entries.length > 0 ? entries[0].type : null

    if (navigationType === 'reload' && location.pathname !== Path.HOME) {
      navigate(Path.HOME)  // Force navigation to the home page on page reload
    }
  }, [navigate, location.pathname])

  return (
    // <AnimatePresence>
    //   <Routes location={location}>
    //     <Route path={Path.HOME} element={<AppSkeleton />}>
    //       <Route key={Path.HOME} path={Path.HOME} element={<Home />} />
    //       <Route key={Path.HISTORY} path={Path.HISTORY} element={<History />} />
    //       <Route key={Path.SEARCH} path={Path.SEARCH} element={<Search />} />
    //     </Route>
    //     <Route key={Path.QUERY} path={Path.QUERY} element={<Search />} />
    //     <Route
    //       key="*"
    //       path="*"
    //       element={<NotFound onBack={() => navigate(Path.HOME)} />}
    //     />
    //   </Routes>
    // </AnimatePresence>
    < Home/>
  )
}
