export const getRandomPosition = (canvasElement: HTMLDivElement | null) => {
  if (!canvasElement) return { x: 100, y: 100 }

  const canvasRect = canvasElement.getBoundingClientRect()
  const maxX = Math.max(200, canvasRect.width - 250)
  const maxY = Math.max(200, canvasRect.height - 250)

  return {
    x: Math.random() * maxX + 50,
    y: Math.random() * maxY + 50,
  }
}
