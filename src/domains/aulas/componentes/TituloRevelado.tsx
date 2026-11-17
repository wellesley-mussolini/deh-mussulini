import { Fragment } from 'react'
import { motion } from 'motion/react'
import { curvaSuave } from '../animacoes.constants'
import type { PropriedadesDoTituloRevelado } from '../aulas.types'

const intervaloEntrePalavras = 0.08

export default function TituloRevelado({ texto, className = '' }: PropriedadesDoTituloRevelado) {
  const palavras = texto.split(' ')

  return (
    <motion.h2
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, amount: 0.6 }}
      variants={{
        oculto: {},
        visivel: { transition: { staggerChildren: intervaloEntrePalavras } },
      }}
      className={`font-titulo text-4xl leading-tight sm:text-5xl ${className}`}
    >
      {palavras.map((palavra, posicaoDaPalavra) => (
        <Fragment key={posicaoDaPalavra}>
          {/* O espaço fica fora do inline-block: dentro dele, o navegador descarta o espaço do fim. */}
          {posicaoDaPalavra > 0 && ' '}
          <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                oculto: { y: '110%', rotate: 6 },
                visivel: { y: 0, rotate: 0, transition: { duration: 0.75, ease: curvaSuave } },
              }}
            >
              {palavra}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </motion.h2>
  )
}
