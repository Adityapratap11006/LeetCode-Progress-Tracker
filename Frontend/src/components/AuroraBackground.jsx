import { useEffect, useRef } from 'react'

export default function AuroraBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      el.style.setProperty('--x', x)
      el.style.setProperty('--y', y)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Aurora blobs */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-purple-bright/10 animate-aurora"
        style={{ filter: 'blur(120px)' }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-indigo-bright/8 animate-aurora-delayed"
        style={{ filter: 'blur(100px)' }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[30vw] h-[30vw] rounded-full bg-purple-deep/8 animate-aurora"
        style={{ filter: 'blur(80px)', animationDelay: '-4s' }}
      />
      {/* Follow cursor gradient */}
      <div
        className="absolute w-[40vw] h-[40vw] rounded-full bg-purple-bright/5 transition-all duration-1000 ease-out"
        style={{
          transform: 'translate(calc(var(--x, 0.5) * 100vw - 20vw), calc(var(--y, 0.5) * 100vh - 20vw))',
          filter: 'blur(100px)',
        }}
      />
    </div>
  )
}
