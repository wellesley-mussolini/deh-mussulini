import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import TituloRevelado from '../componentes/TituloRevelado'
import { duvidasFrequentes } from '../conteudo.constants'
import { curvaSuave, entrarAoAparecer, revelarEmSequencia, surgirDeBaixo } from '../animacoes.constants'

export default function Duvidas() {
  const [duvidaAberta, setDuvidaAberta] = useState<number | null>(null)

  const alternarDuvida = (posicaoDaDuvida: number) =>
    setDuvidaAberta((posicaoAtual) => (posicaoAtual === posicaoDaDuvida ? null : posicaoDaDuvida))

  return (
    <section id="duvidas" className="bg-tampo-claro py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <TituloRevelado texto="Dúvidas comuns" />

        <motion.ul {...entrarAoAparecer} variants={revelarEmSequencia} className="mt-12">
          {duvidasFrequentes.map((duvida, posicaoDaDuvida) => {
            const estaAberta = duvidaAberta === posicaoDaDuvida
            const idDaResposta = `resposta-da-duvida-${posicaoDaDuvida}`
            return (
              <motion.li
                key={duvida.pergunta}
                variants={surgirDeBaixo}
                className="border-t border-jacaranda/15 last:border-b"
              >
                <button
                  type="button"
                  onClick={() => alternarDuvida(posicaoDaDuvida)}
                  aria-expanded={estaAberta}
                  aria-controls={idDaResposta}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left font-titulo text-xl sm:text-2xl"
                >
                  {duvida.pergunta}
                  <motion.span
                    aria-hidden="true"
                    animate={{ transform: estaAberta ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    transition={{ duration: 0.3, ease: curvaSuave }}
                    className={`grid size-10 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                      estaAberta ? 'bg-roseta text-tampo-claro' : 'bg-tampo text-jacaranda'
                    }`}
                  >
                    <Plus className="size-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {estaAberta && (
                    <motion.div
                      id={idDaResposta}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: curvaSuave }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-lg leading-relaxed text-jacaranda-claro">{duvida.resposta}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
