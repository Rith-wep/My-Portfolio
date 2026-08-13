import { useEffect, useRef } from 'react'

const TOKENS = [
  'const', 'async', 'await', 'return', 'class', 'public', 'void', '=>',
  '()', '{}', '[]', '</>', 'npm run', 'git push', 'Spring Boot',
  'Node.js', 'FastAPI', 'AWS',
]

function CodeBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return undefined

    let frame
    let width = 0
    let height = 0
    let items = []
    const pointer = { x: -500, y: -500, targetX: -500, targetY: -500 }

    const populate = () => {
      const gapX = width < 640 ? 150 : 190
      const gapY = width < 640 ? 120 : 140
      const columns = Math.ceil(width / gapX) + 1
      const rows = Math.ceil(height / gapY) + 1
      items = Array.from({ length: columns * rows }, (_, index) => {
        const column = index % columns
        const row = Math.floor(index / columns)
        return {
          text: TOKENS[(index * 7 + row * 3) % TOKENS.length],
          x: column * gapX + ((row % 2) * gapX) / 2 - 40,
          y: row * gapY + 35,
          phase: Math.random() * Math.PI * 2,
          size: 10 + ((index + row) % 3),
        }
      })
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      populate()
    }

    const move = (event) => {
      if (event.pointerType === 'touch') return
      const rect = canvas.getBoundingClientRect()
      pointer.targetX = event.clientX - rect.left
      pointer.targetY = event.clientY - rect.top
    }

    const leave = () => {
      pointer.targetX = -500
      pointer.targetY = -500
    }

    const draw = (time) => {
      pointer.x += (pointer.targetX - pointer.x) * 0.12
      pointer.y += (pointer.targetY - pointer.y) * 0.12
      context.clearRect(0, 0, width, height)
      context.textBaseline = 'middle'

      for (const item of items) {
        const x = item.x + Math.sin(time * 0.00035 + item.phase) * 5
        const y = item.y + Math.cos(time * 0.00028 + item.phase) * 4
        const influence = Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / 190)
        context.font = `${influence > 0.15 ? 600 : 400} ${item.size + influence * 2}px ui-monospace, SFMono-Regular, Menlo, monospace`
        context.fillStyle = influence
          ? `rgba(34, 197, 94, ${0.2 + influence * 0.72})`
          : 'rgba(148, 163, 184, 0.13)'
        context.shadowColor = `rgba(34, 197, 94, ${influence * 0.65})`
        context.shadowBlur = influence * 14
        context.fillText(item.text, x, y - influence * 5)
      }

      context.shadowBlur = 0
      frame = requestAnimationFrame(draw)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerleave', leave)
    resize()
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerleave', leave)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}

export default CodeBackground
