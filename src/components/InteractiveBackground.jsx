import { useEffect, useRef } from 'react'

const GRID_SIZE = 72
const INTERACTION_RADIUS = 170

function InteractiveBackground({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) return undefined

    let animationFrame
    let width = 0
    let height = 0
    let nodes = []
    let gridColumns = 0
    let lastTime = 0
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches

    const pointer = {
      x: -INTERACTION_RADIUS,
      y: -INTERACTION_RADIUS,
      targetX: -INTERACTION_RADIUS,
      targetY: -INTERACTION_RADIUS,
      active: false,
    }

    const createGrid = () => {
      nodes = []
      const gridSize = width < 640 ? 96 : GRID_SIZE
      gridColumns = Math.ceil(width / gridSize) + 1
      const rows = Math.ceil(height / gridSize) + 1
      const offsetX = (width - (gridColumns - 1) * gridSize) / 2
      const offsetY = (height - (rows - 1) * gridSize) / 2

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < gridColumns; column += 1) {
          nodes.push({
            x: offsetX + column * gridSize,
            y: offsetY + row * gridSize,
            row,
            column,
            phase: Math.random() * Math.PI * 2,
          })
        }
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, isCoarsePointer ? 1.5 : 2)

      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      createGrid()
    }

    const updatePointer = (event) => {
      if (event.pointerType === 'touch') return
      const rect = canvas.getBoundingClientRect()
      pointer.targetX = event.clientX - rect.left
      pointer.targetY = event.clientY - rect.top
      pointer.active =
        pointer.targetX >= 0 &&
        pointer.targetX <= rect.width &&
        pointer.targetY >= 0 &&
        pointer.targetY <= rect.height
    }

    const deactivatePointer = () => {
      pointer.active = false
    }

    const draw = (time) => {
      if (isCoarsePointer && lastTime && time - lastTime < 30) {
        animationFrame = requestAnimationFrame(draw)
        return
      }

      const delta = Math.min((time - lastTime) / 16.67, 2)
      lastTime = time
      const ease = 1 - Math.pow(0.82, delta || 1)

      const restingX = -INTERACTION_RADIUS
      const restingY = height / 2
      pointer.x += ((pointer.active ? pointer.targetX : restingX) - pointer.x) * ease
      pointer.y += ((pointer.active ? pointer.targetY : restingY) - pointer.y) * ease

      context.clearRect(0, 0, width, height)

      const activeNodes = nodes.map((node) => {
        const driftX = Math.cos(time * 0.00045 + node.phase) * 1.8
        const driftY = Math.sin(time * 0.00055 + node.phase) * 1.8
        const x = node.x + driftX
        const y = node.y + driftY
        const distance = Math.hypot(x - pointer.x, y - pointer.y)
        const influence = Math.max(0, 1 - distance / INTERACTION_RADIUS)

        return { ...node, x, y, influence }
      })

      context.save()
      context.lineCap = 'round'
      context.shadowColor = 'rgba(34, 197, 94, 0.7)'
      context.shadowBlur = 10

      for (let index = 0; index < activeNodes.length; index += 1) {
        const node = activeNodes[index]
        if (node.influence <= 0.04) continue

        const right =
          node.column < gridColumns - 1 ? activeNodes[index + 1] : undefined
        const below = activeNodes[index + gridColumns]

        for (const neighbor of [right, below]) {
          if (!neighbor) continue
          const strength = Math.min(node.influence, neighbor.influence)
          if (strength <= 0.04) continue

          context.beginPath()
          context.moveTo(node.x, node.y)
          context.lineTo(neighbor.x, neighbor.y)
          context.strokeStyle = `rgba(34, 197, 94, ${strength * 0.68})`
          context.lineWidth = 0.5 + strength
          context.stroke()
        }

        context.beginPath()
        context.moveTo(node.x, node.y)
        context.lineTo(pointer.x, pointer.y)
        context.strokeStyle = `rgba(34, 197, 94, ${node.influence * 0.28})`
        context.lineWidth = 0.5
        context.stroke()
      }
      context.restore()

      for (const node of activeNodes) {
        const radius = 1.15 + node.influence * 3

        context.beginPath()
        context.arc(node.x, node.y, radius, 0, Math.PI * 2)
        context.fillStyle =
          node.influence > 0
            ? `rgba(34, 197, 94, ${0.35 + node.influence * 0.65})`
            : 'rgba(148, 163, 184, 0.22)'
        context.fill()
      }

      animationFrame = requestAnimationFrame(draw)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('pointerleave', deactivatePointer)
    window.addEventListener('blur', deactivatePointer)
    resize()
    animationFrame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('pointerleave', deactivatePointer)
      window.removeEventListener('blur', deactivatePointer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}

export default InteractiveBackground
