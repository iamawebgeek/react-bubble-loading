export type AnimatedBubbleCreatorOptions = {
  areaSize: number
  bubbleSize: number
  interval: number
}

export const getAnimatedBubbleCreator = ({ areaSize, bubbleSize, interval }: AnimatedBubbleCreatorOptions) => {
  const paddingSize = areaSize - bubbleSize * 1.5
  const edge = paddingSize / 2
  return (index: number) => {
    const random = Math.round(Math.random() * edge)
    const coordinate = { x: edge, y: edge }
    const side = Math.random() > 0.5 ? 'x' : 'y'
    coordinate[side] = random
    const negate = (which: typeof side, num: number) => {
      if (side === which) {
        return 0 - num
      }
      return num - paddingSize
    }
    const key = Math.random()
    const duration = interval * Math.round(key * 7) + 1600
    switch (index % 4) {
      case 0:
        coordinate.x = negate('x', coordinate.x)
      case 1:
        coordinate.y = negate('y', coordinate.y)
        break
      case 2:
        coordinate.x = negate('x', coordinate.x)
        break
    }
    return {
      coordinate,
      duration,
      key,
    }
  }
}
