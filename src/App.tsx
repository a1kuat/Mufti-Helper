import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

import './App.css'
import { Toaster } from './components/ui/notification'
import { TooltipProvider, AnimatedRoutes } from './components'

TimeAgo.addDefaultLocale(en)

const App = () => {
  return (
    <div className="font-sans">
      <Toaster />
      <TooltipProvider delayDuration={0}>
        <AnimatedRoutes />
      </TooltipProvider>
    </div>
  )
}

export default App
