import { motion } from 'framer-motion'
import * as React from 'react'

export type BubbleProps = {
  animate: boolean
  color: string
  coordinate: {
    x: number
    y: number
  }
  duration: number
  size: number
}

export const Bubble: React.FC<BubbleProps> = ({
  animate,
  color,
  coordinate,
  duration,
  size,
}) => {
  const fullDuration = duration / 1e3
  const delayRef = React.useRef((fullDuration / 2) * Math.random())
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: color,
      }}
      transition={{
        duration: fullDuration - delayRef.current,
        delay: delayRef.current,
      }}
      animate={
        animate
          ? {
              x: [0, coordinate.x],
              y: [0, coordinate.y],
              opacity: [1, 0],
              scale: [1, 1.5],
            }
          : {}
      }
    />
  )
}
