import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Sider, AnimatedPage, ScrollArea } from '.'

export const AppSkeleton = () => {
  return (
    <div className="h-screen w-screen bg-white">
      <div className="flex">
        <Sider />
        <div className="w-full">
          <AnimatedPage>
            <ScrollArea className="space-y-4 flex flex-col items-center h-screen">
              <div className="w-full text-olive-green selection:text-white selection:bg-mint">
                <Suspense
                  fallback={
                    <div className="flex h-screen justify-center items-center">
                      {/*<img src="/Lyzr-Logo.png" className="animate-pulse" />*/}
                    </div>
                  }
                >
                  <Outlet />
                </Suspense>
              </div>
            </ScrollArea>
          </AnimatedPage>
        </div>
      </div>
    </div>
  )
}
