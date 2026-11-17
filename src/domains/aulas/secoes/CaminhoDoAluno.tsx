import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import TituloRevelado from '../componentes/TituloRevelado'
import { etapasDoCaminho } from '../conteudo.constants'
import { entrarAoAparecer, surgirDeBaixo } from '../animacoes.constants'

// Folga para a etapa acender quando a linha chega no círculo, não só quando passa do centro dele.
const folgaParaAcender = 0.04

export default function CaminhoDoAluno() {
  const listaDeEtapas = useRef<HTMLOListElement>(null)
  const [etapasAcesas, setEtapasAcesas] = useState(0)
  const { scrollYProgress: progressoDoCaminho } = useScroll({
    target: listaDeEtapas,
    offset: ['start 75%', 'end 55%'],
  })
  const linhaPercorrida = useSpring(progressoDoCaminho, { stiffness: 90, damping: 22 })

  useMotionValueEvent(linhaPercorrida, 'change', (fracaoPercorrida) => {
    const ultimaPosicao = etapasDoCaminho.length - 1
    const etapasAlcancadas = etapasDoCaminho.filter(
      (_, posicaoDaEtapa) => fracaoPercorrida + folgaParaAcender >= posicaoDaEtapa / ultimaPosicao,
    ).length
    setEtapasAcesas(etapasAlcancadas)
  })

  return (
    <section id="caminho" className="bg-tampo py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <TituloRevelado texto="Do primeiro acorde às primeiras músicas" className="max-w-2xl" />

        <div className="relative mt-16">
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-7 w-1 rounded-full bg-jacaranda/10 sm:left-9" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: linhaPercorrida }}
            className="absolute top-2 bottom-2 left-7 w-1 origin-top rounded-full bg-roseta sm:left-9"
          />
          <ol ref={listaDeEtapas} className="relative space-y-14 pl-20 sm:pl-24">
            {etapasDoCaminho.map((etapa, posicaoDaEtapa) => {
              const etapaAlcancada = posicaoDaEtapa < etapasAcesas
              return (
                <motion.li
                  key={etapa.titulo}
                  {...entrarAoAparecer}
                  variants={surgirDeBaixo}
                  className="relative"
                >
                  <motion.span
                    aria-hidden="true"
                    animate={{ scale: etapaAlcancada ? [1, 1.25, 1] : 1 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute top-0 -left-20 grid size-15 place-items-center rounded-full border-4 border-tampo font-titulo text-2xl text-tampo-claro transition-colors duration-500 sm:-left-24 sm:size-19 ${
                      etapaAlcancada ? 'bg-roseta' : 'bg-jacaranda'
                    }`}
                  >
                    {posicaoDaEtapa + 1}
                  </motion.span>
                  <h3 className="pt-3 font-titulo text-2xl sm:text-3xl">{etapa.titulo}</h3>
                  <p className="mt-2 max-w-xl text-lg leading-relaxed text-jacaranda-claro">{etapa.descricao}</p>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
