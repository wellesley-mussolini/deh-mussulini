import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Hand } from 'lucide-react'
import BotaoWhatsapp from '../../../components/BotaoWhatsapp'
import EscalaDoViolao from '../componentes/EscalaDoViolao'
import FatosEmDestaque from '../componentes/FatosEmDestaque'
import { fotoDaAbertura } from '../fotos.constants'
import { curvaSuave } from '../animacoes.constants'

const nomeDaProfessora = 'Deh Muss'
const intervaloEntreLetras = 0.045

const palavrasDoNome = nomeDaProfessora.split(' ').map((palavra, posicaoDaPalavra, palavras) => ({
  palavra,
  posicaoDaPrimeiraLetra: palavras.slice(0, posicaoDaPalavra).join('').length,
}))

export default function Abertura() {
  const abertura = useRef<HTMLElement>(null)
  const { scrollYProgress: progressoDaSaida } = useScroll({
    target: abertura,
    offset: ['start start', 'end start'],
  })
  const deslocamentoDaFoto = useTransform(progressoDaSaida, [0, 1], ['0%', '18%'])

  return (
    <section
      ref={abertura}
      id="inicio"
      data-fundo="escuro"
      className="relative isolate flex min-h-svh flex-col justify-between gap-10 overflow-hidden bg-jacaranda pt-28 pb-8 text-tampo-claro sm:pt-32"
    >
      <motion.div
        style={{ y: deslocamentoDaFoto }}
        className="absolute inset-y-0 right-0 -z-10 w-full md:w-[62%] md:[mask-image:linear-gradient(to_right,transparent_0%,black_55%)]"
      >
        <motion.img
          src={fotoDaAbertura}
          alt="Deh Muss cantando e tocando violão no palco, sob luzes amarelas"
          width={1200}
          height={1600}
          fetchPriority="high"
          initial={{ scale: 1.18, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: curvaSuave }}
          className="size-full object-cover object-[50%_28%]"
        />
        <motion.div
          aria-hidden="true"
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_10%,var(--color-tampo)_0%,transparent_55%)] mix-blend-soft-light"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-jacaranda/75 md:bg-jacaranda/15"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-jacaranda to-transparent" />
      </motion.div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h1
          aria-label={nomeDaProfessora}
          className="font-titulo text-[clamp(3.4rem,11vw,8rem)] leading-[0.92] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
        >
          {palavrasDoNome.map(({ palavra, posicaoDaPrimeiraLetra }) => (
            <span key={palavra} aria-hidden="true" className="block whitespace-nowrap">
              {palavra.split('').map((letra, posicaoNaPalavra) => (
                <span key={posicaoNaPalavra} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '105%', rotate: 8 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: curvaSuave,
                      delay: 0.15 + (posicaoDaPrimeiraLetra + posicaoNaPalavra) * intervaloEntreLetras,
                    }}
                  >
                    {letra}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: curvaSuave }}
        >
          <FatosEmDestaque />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: curvaSuave }}
          className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5"
        >
          <BotaoWhatsapp comBrilho />
          <a
            href="#aulas"
            className="text-lg font-medium text-corda underline decoration-tampo/40 underline-offset-8 transition-colors hover:text-tampo-claro hover:decoration-tampo"
          >
            Ver como são as aulas
          </a>
        </motion.div>
      </div>

      <div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="mx-auto mb-4 flex w-full max-w-6xl items-center gap-2 px-4 text-sm text-corda sm:px-6"
        >
          <motion.span
            aria-hidden="true"
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 2.4 }}
          >
            <Hand className="size-4" />
          </motion.span>
          Passe o dedo nas cordas. Toque para ouvir.
        </motion.p>
        <EscalaDoViolao />
      </div>
    </section>
  )
}
