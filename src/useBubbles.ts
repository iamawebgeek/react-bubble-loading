import * as React from 'react'

import { AnimatedBubbleCreatorOptions, getAnimatedBubbleCreator } from './getAnimatedBubbleCreator'

export type HookOptions = {
  maxBubbles: number
} & AnimatedBubbleCreatorOptions

export type BubbleState = {
  offset: number
} & ReturnType<ReturnType<typeof getAnimatedBubbleCreator>>

export const useBubbles = ({ maxBubbles, interval, bubbleSize, areaSize }: HookOptions) => {
  const createBubble = React.useMemo(
    () => getAnimatedBubbleCreator({ areaSize, bubbleSize, interval }),
    [interval, bubbleSize, areaSize]
  )
  const tickRef = React.useRef(0)
  const [bubbles, setBubbles] = React.useState<BubbleState[]>(
    Array(maxBubbles).fill(0).map((_, index) => ({ ...createBubble(index), offset: 0 }))
  )
  React.useEffect(() => {
    const isBubbleFadedOut = ({ offset, duration }: BubbleState) => offset + duration === tickRef.current
    setInterval(() => {
      tickRef.current += interval
      setBubbles((currentBubbles) => {
        const hasBubblesToSwitch = currentBubbles.some(isBubbleFadedOut)
        if (hasBubblesToSwitch) {
          return currentBubbles.map((bubble, index) =>
            isBubbleFadedOut(bubble)
              ? { ...createBubble(index), offset: tickRef.current } as BubbleState
              : bubble
          )
        }
        return currentBubbles
      })
    }, interval)
  }, [])
  return bubbles
}
