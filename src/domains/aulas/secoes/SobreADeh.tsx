import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import BotaoWhatsapp from '../../../components/BotaoWhatsapp'
import TituloRevelado from '../componentes/TituloRevelado'
import fotoRetrato from '../../../assets/fotos/deh-retrato.webp'
import { entrarAoAparecer, revelarEmSequencia, surgirDeBaixo } from '../animacoes.constants'

// No círculo, o fim do texto encosta no começo. O SVG descarta o espaço comum no fim (por isso
// o espaço inquebrável), e o textLength reparte a folga só entre caracteres vizinhos: o espaço
// de largura zero, invisível, cria o último vão para a emenda receber a mesma folga que os outros.
const espacoInquebravel = String.fromCharCode(0xa0)
const espacoDeLarguraZero = String.fromCharCode(0x200b)
const textoDoSelo = `Formada em Música pela UFMG${espacoInquebravel}✦${espacoInquebravel}${espacoDeLarguraZero}`
// Comprimento do círculo do selo (2π × 72): o texto é esticado para fechar a volta sem sobrar nem sobrepor.
const circunferenciaDoSelo = 452

export default function SobreADeh() {
  const secao = useRef<HTMLElement>(null)
  const { scrollYProgress: progressoDaSecao } = useScroll({
    target: secao,
    offset: ['start end', 'end start'],
  })
  const deslocamentoDaFoto = useTransform(progressoDaSecao, [0, 1], ['-6%', '6%'])

  return (
    <section ref={secao} id="sobre" data-fundo="escuro" className="overflow-hidden bg-jacaranda py-24 text-tampo-claro sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 md:grid-cols-2">
        <div className="relative mx-auto aspect-square w-full max-w-md">
          {/* Giros infinitos em CSS: o navegador compõe na GPU, sem ocupar a thread principal a cada quadro. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 animate-spin rounded-full border-[10px] border-dotted border-tampo/40 [animation-duration:80s]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-[6%] animate-spin rounded-full border-[6px] border-dashed border-roseta [animation-direction:reverse] [animation-duration:60s]"
          />
          <div className="absolute inset-[12%] overflow-hidden rounded-full border-4 border-tampo/70 shadow-2xl shadow-black/40">
            <motion.img
              src={fotoRetrato}
              alt="Retrato de Deh Muss sorrindo"
              width={640}
              height={640}
              loading="lazy"
              style={{ y: deslocamentoDaFoto }}
              className="size-full scale-110 object-cover object-top"
            />
          </div>

          <motion.div
            aria-hidden="true"
            initial={{ transform: 'scale(0) rotate(-120deg)' }}
            whileInView={{ transform: 'scale(1) rotate(0deg)' }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: 'spring', stiffness: 140, damping: 12, delay: 0.3 }}
            className="absolute -right-2 -bottom-2 size-32 sm:right-0 sm:bottom-0 sm:size-36"
          >
            <svg viewBox="0 0 200 200" className="size-full animate-spin drop-shadow-xl [animation-duration:22s]">
              <defs>
                <path id="circulo-do-selo" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
              </defs>
              <circle cx="100" cy="100" r="98" className="fill-roseta" />
              <text className="fill-tampo-claro font-texto text-[17px] font-semibold">
                <textPath href="#circulo-do-selo" textLength={circunferenciaDoSelo} lengthAdjust="spacing">
                  {textoDoSelo}
                </textPath>
              </text>
            </svg>
            <span className="absolute inset-0 grid place-items-center font-titulo text-2xl text-tampo-claro sm:text-3xl">
              UFMG
            </span>
          </motion.div>
        </div>

        <div>
          <TituloRevelado texto="Prazer, Deh Muss" />
          <motion.div {...entrarAoAparecer} variants={revelarEmSequencia}>
            <motion.p variants={surgirDeBaixo} className="mt-6 max-w-lg text-lg leading-relaxed text-corda">
              A Deh é professora de violão, formada em Música pela UFMG.
            </motion.p>
            <motion.p variants={surgirDeBaixo} className="mt-4 max-w-lg text-lg leading-relaxed text-corda">
              Nas aulas online, ela ensina quem tem zero ou pouco conhecimento de violão a tocar ritmos brasileiros e
              internacionais, com o apoio de uma apostila de música brasileira cifrada.
            </motion.p>
            <motion.div variants={surgirDeBaixo} className="mt-10">
              <BotaoWhatsapp aparencia="tampo" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
