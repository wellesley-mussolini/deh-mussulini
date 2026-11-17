import type { Transition, Variants } from 'motion/react'

export const curvaSuave: Transition['ease'] = [0.22, 1, 0.36, 1]

export const surgirDeBaixo: Variants = {
  oculto: { opacity: 0, y: 32 },
  visivel: { opacity: 1, y: 0, transition: { duration: 0.7, ease: curvaSuave } },
}

export const surgirDaDireita: Variants = {
  oculto: { opacity: 0, x: 48 },
  visivel: { opacity: 1, x: 0, transition: { duration: 0.7, ease: curvaSuave } },
}

export const girarParaDentro: Variants = {
  oculto: { scale: 0, rotate: -90 },
  visivel: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 220, damping: 14, delay: 0.15 } },
}

export const revelarEmSequencia: Variants = {
  oculto: {},
  visivel: { transition: { staggerChildren: 0.12 } },
}

export const entrarAoAparecer = {
  initial: 'oculto',
  whileInView: 'visivel',
  viewport: { once: true, amount: 0.3 },
} as const
