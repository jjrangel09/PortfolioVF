import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   TUNABLE PARAMETERS — ajusta aquí sin tocar el resto del componente.
   ───────────────────────────────────────────────────────────────────────────── */

/** Partículas por px² de viewport (base, desktop). */
const DENSITY = 0.00075

/** Límites absolutos de cantidad de partículas. */
const MAX_PARTICLES = 100
const MIN_PARTICLES = 22

/** Velocidad máxima por frame (px CSS). */
const SPEED_MAX = 0.42

/** Rango de tamaño de los nodos (radio, px CSS). */
const SIZE_MIN = 1.0
const SIZE_MAX = 2.4

/** Distancia máxima para dibujar línea entre dos partículas (px CSS). */
const CONNECT_RADIUS = 148

/** Radio de influencia del cursor (px CSS). */
const MOUSE_RADIUS = 160

/** Intensidad de la repulsión del cursor (mayor = más fuerte). */
const MOUSE_FORCE = 3.2

/** Amortiguación de velocidad bajo influencia del mouse (0–1). */
const MOUSE_DAMPING = 0.97

/** Factor de densidad en pantallas < MOBILE_BP. */
const MOBILE_FACTOR = 0.45

/** Breakpoint de móvil (px). */
const MOBILE_BP = 768

/* ── Opacidades ───────────────────────────────────────────────────────────── */
const DOT_ALPHA      = 0.55   // partícula como punto
const LINE_ALPHA_MAX = 0.22   // línea partícula–partícula
const MOUSE_ALPHA    = 0.82   // línea partícula–cursor (color acento)

/* ─────────────────────────────────────────────────────────────────────────────
   IMPLEMENTACIÓN
   ───────────────────────────────────────────────────────────────────────────── */

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number
}

/** Lee una CSS custom property del :root y la convierte a [r, g, b] (0–255). */
function cssVarToRgb(prop: string, fallback: [number, number, number]): [number, number, number] {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(prop).trim()

  if (raw.startsWith('#') && raw.length === 7) {
    return [
      parseInt(raw.slice(1, 3), 16),
      parseInt(raw.slice(3, 5), 16),
      parseInt(raw.slice(5, 7), 16),
    ]
  }
  // rgb(...) / rgba(...) / "r g b" space-separated
  const nums = raw.match(/[\d.]+/g)
  if (nums && nums.length >= 3) {
    return [Math.round(parseFloat(nums[0])), Math.round(parseFloat(nums[1])), Math.round(parseFloat(nums[2]))]
  }
  return fallback
}

function countParticles(w: number, h: number): number {
  const factor = w < MOBILE_BP ? MOBILE_FACTOR : 1
  return Math.max(MIN_PARTICLES, Math.min(MAX_PARTICLES, Math.round(w * h * DENSITY * factor)))
}

function spawnParticles(n: number, w: number, h: number): Particle[] {
  return Array.from({ length: n }, () => ({
    x:    Math.random() * w,
    y:    Math.random() * h,
    vx:   (Math.random() - 0.5) * SPEED_MAX * 2,
    vy:   (Math.random() - 0.5) * SPEED_MAX * 2,
    size: SIZE_MIN + Math.random() * (SIZE_MAX - SIZE_MIN),
  }))
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const ctxRaw = canvasEl.getContext('2d')
    if (!ctxRaw) return

    // Captura con tipos explícitos no-null para que TypeScript 6 strict
    // los acepte dentro de las funciones anidadas (closures).
    const canvas: HTMLCanvasElement          = canvasEl
    const ctx: CanvasRenderingContext2D      = ctxRaw

    // ── Leer colores desde tokens del tema ────────────────────────────────
    const [ar, ag, ab] = cssVarToRgb('--color-accent', [45, 212, 191])
    const [mr, mg, mb] = cssVarToRgb('--color-muted',  [139, 144, 160])

    // ── prefers-reduced-motion ────────────────────────────────────────────
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Estado mutable ────────────────────────────────────────────────────
    let W = 0, H = 0
    let particles: Particle[] = []
    let rafId = 0
    let paused = false
    const mouse = { x: -9999, y: -9999 }

    // ── Setup canvas (DPR-aware) ──────────────────────────────────────────
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) // cap a 2× para no sobre-renderizar en pantallas 3×+
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      canvas.style.width  = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = spawnParticles(countParticles(W, H), W, H)
    }

    // ── Frame de render ───────────────────────────────────────────────────
    function draw() {
      ctx.clearRect(0, 0, W, H)

      // Actualizar posiciones y aplicar mouse (solo si motion activo)
      if (!reduced) {
        for (const p of particles) {
          p.x += p.vx
          p.y += p.vy

          // Rebote en bordes
          if (p.x <= 0 || p.x >= W) { p.vx *= -1; p.x = Math.max(0, Math.min(W, p.x)) }
          if (p.y <= 0 || p.y >= H) { p.vy *= -1; p.y = Math.max(0, Math.min(H, p.y)) }

          // Repulsión del cursor
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < MOUSE_RADIUS * MOUSE_RADIUS && d2 > 0.01) {
            const d = Math.sqrt(d2)
            const f = ((MOUSE_RADIUS - d) / MOUSE_RADIUS) * MOUSE_FORCE * 0.04
            p.vx += (dx / d) * f
            p.vy += (dy / d) * f
            p.vx *= MOUSE_DAMPING
            p.vy *= MOUSE_DAMPING
            // Velocidad máxima bajo influencia del mouse
            const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
            const cap = SPEED_MAX * 4
            if (spd > cap) { p.vx = (p.vx / spd) * cap; p.vy = (p.vy / spd) * cap }
          }
        }
      }

      // Líneas partícula–partícula (muted) y partícula–cursor (accent)
      const CONN_R2  = CONNECT_RADIUS * CONNECT_RADIUS
      const MOUSE_R2 = MOUSE_RADIUS   * MOUSE_RADIUS

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]

        // Partícula–partícula
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < CONN_R2) {
            const alpha = (1 - Math.sqrt(d2) / CONNECT_RADIUS) * LINE_ALPHA_MAX
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${mr},${mg},${mb},${alpha.toFixed(3)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }

        // Partícula–cursor (solo con motion)
        if (!reduced) {
          const dx = a.x - mouse.x, dy = a.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < MOUSE_R2) {
            const alpha = (1 - Math.sqrt(d2) / MOUSE_RADIUS) * MOUSE_ALPHA
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(${ar},${ag},${ab},${alpha.toFixed(3)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Puntos encima de las líneas
      ctx.fillStyle = `rgba(${mr},${mg},${mb},${DOT_ALPHA})`
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // ── Loop de animación ─────────────────────────────────────────────────
    function loop() {
      if (!paused && !document.hidden) draw()
      rafId = requestAnimationFrame(loop)
    }

    // ── Listeners ─────────────────────────────────────────────────────────
    // Pausar cuando el canvas (hero) sale del viewport
    const io = new IntersectionObserver(([entry]) => {
      paused = !entry.isIntersecting
    }, { threshold: 0 })
    io.observe(canvas)

    // Mouse position
    const onMove  = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('mousemove', onMove, { passive: true })

    // Reset cuando el cursor sale de la ventana
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) { mouse.x = -9999; mouse.y = -9999 }
    }
    document.addEventListener('mouseout', onOut, { passive: true })

    // Resize con debounce
    let resizeTimer: ReturnType<typeof setTimeout> | undefined
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 150)
    }
    window.addEventListener('resize', onResize)

    // ── Init ──────────────────────────────────────────────────────────────
    resize()

    if (reduced) {
      draw() // fondo estático — single draw, sin loop
    } else {
      loop()
    }

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(resizeTimer)
      io.disconnect()
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      tabIndex={-1}
      className="absolute inset-0 pointer-events-none select-none"
      style={{ zIndex: 0 }}
    />
  )
}
