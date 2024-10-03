import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import { NotFound } from '@/components/ui/not-found'
import { Path } from '../utils/types'
import { AppSkeleton } from './AppSkeleton'

import { Home } from '../pages/Home'
import { History } from '../pages/History'
// import { Saved } from '../pages/Saved'
// import { PDFDocuments } from '../pages/Documents'
// import { Website } from '../pages/Website'
// import { Youtube } from '../pages/Youtube'
// import { Databases } from '../pages/Databases'
// import { Media } from '../pages/Media'
// import { Audio } from '../pages/Audio'
import { Search } from '../pages/Search'
// import { Sources } from '../pages/Sources'

export const AnimatedRoutes = () => {
  const navigate = useNavigate()

  return (
    <AnimatePresence>
      <Routes location={useLocation()}>
        <Route path={Path.HOME} element={<AppSkeleton />}>
          <Route key={Path.HOME} path={Path.HOME} element={<Home />} />
          <Route key={Path.HISTORY} path={Path.HISTORY} element={<History />} /> 
          <Route key={Path.SEARCH} path={Path.SEARCH} element={<Search />} />
        </Route>
        <Route key={Path.QUERY} path={Path.QUERY} element={<Search />} />
        <Route
          key="*"
          path="*"
          element={<NotFound onBack={() => navigate(Path.HOME)} />}
        />
      </Routes>
    </AnimatePresence>
  )
}
