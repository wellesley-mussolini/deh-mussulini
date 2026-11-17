import type { Transition, Variants } from 'motion/react'

export const curvaSuave: Transition['ease'] = [0.22, 1, 0.36, 1]

export const surgirDeBaixo: Variants = {
  oculto: { opacity: 0, transform: 'translateY(32px)' },
  visivel: { opacity: 1, transform: 'translateY(0px)', transition: { duration: 0.7, ease: curvaSuave } },
}

export const surgirDaDireita: Variants = {
  oculto: { opacity: 0, transform: 'translateX(48px)' },
  visivel: { opacity: 1, transform: 'translateX(0px)', transition: { duration: 0.7, ease: curvaSuave } },
}

export const girarParaDentro: Variants = {
  oculto: { transform: 'scale(0) rotate(-90deg)' },
  visivel: { transform: 'scale(1) rotate(0deg)', transition: { type: 'spring', stiffness: 220, damping: 14, delay: 0.15 } },
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
