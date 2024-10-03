import React from 'react'
import { motion } from 'framer-motion'

export const AnimatedPage = ({ children }: { children: React.ReactNode }) => {
  const animationStyles = {
    initial: { width: 0 },
    animate: { width: '100%' },
    exit: { opacity: 0 },
  }

  return (
    <motion.div
      key="Animated page"
      variants={animationStyles}
      // transition={{ ease: 'circIn', duration: 0.7 }}
      // style={{ height: '100%', width: '100' }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
    >
      {children}
    </motion.div>
  )
}
