import * as React from 'react'

import { Bubble } from './Bubble'
import { useBubbles } from './useBubbles'

export type BubbleLoadingProps = {
  areaSize: number
  maxBubbles?: number
  bubbleSize?: number
  bubbleColor?: string
}

export const BubbleLoading: React.FC<BubbleLoadingProps> = ({
  areaSize,
  bubbleColor = '#6bcfff',
  bubbleSize = 50,
  maxBubbles = 20,
}) => {
  const bubbles = useBubbles({
    areaSize,
    bubbleSize,
    maxBubbles,
    interval: 200,
  })
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: areaSize,
        height: areaSize,
      }}
    >
      {bubbles.map((props) => (
        <Bubble
          animate={true}
          color={bubbleColor}
          size={bubbleSize}
          {...props}
        />
      ))}
      <Bubble
        animate={false}
        color={bubbleColor}
        coordinate={{ x: 0, y: 0 }}
        duration={0}
        size={bubbleSize}
      />
    </div>
  )
}
