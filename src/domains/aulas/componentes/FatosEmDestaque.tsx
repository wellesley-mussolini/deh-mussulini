import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { fatosDaAbertura, intervaloEntreFatosMs, resumoDasAulas } from '../conteudo.constants'
import { curvaSuave } from '../animacoes.constants'
import { useFatoDaVez } from '../hooks/useFatoDaVez'

export default function FatosEmDestaque() {
  const movimentoReduzido = useReducedMotion()
  const posicaoDoFato = useFatoDaVez(fatosDaAbertura.length, intervaloEntreFatosMs, Boolean(movimentoReduzido))

  if (movimentoReduzido) {
    return <p className="mt-6 max-w-2xl text-xl leading-relaxed text-corda sm:text-2xl">{resumoDasAulas}</p>
  }

  return (
    <div className="mt-6">
      <p className="sr-only">{resumoDasAulas}</p>
      <p aria-hidden="true" className="text-xl text-corda sm:text-2xl">
        Aulas de violão
      </p>
      <p aria-hidden="true" className="relative mt-1 h-[1.3em] overflow-hidden font-titulo text-2xl text-tampo sm:text-5xl">
        <AnimatePresence initial={false}>
          <motion.span
            key={posicaoDoFato}
            initial={{ transform: 'translateY(100%)', opacity: 0, filter: 'blur(8px)' }}
            animate={{ transform: 'translateY(0%)', opacity: 1, filter: 'blur(0px)' }}
            exit={{ transform: 'translateY(-100%)', opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.6, ease: curvaSuave }}
            className="absolute inset-x-0 top-0 whitespace-nowrap"
          >
            {fatosDaAbertura[posicaoDoFato]}
          </motion.span>
        </AnimatePresence>
      </p>
    </div>
  )
}
