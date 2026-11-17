import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import fotoNoSesc from '../../../assets/fotos/deh-no-palco-sesc.jpg'
import TituloRevelado from '../componentes/TituloRevelado'
import { diferenciais } from '../conteudo.constants'
import { entrarAoAparecer, girarParaDentro, revelarEmSequencia, surgirDaDireita, surgirDeBaixo } from '../animacoes.constants'

export default function ComoSaoAsAulas() {
  const molduraDaFoto = useRef<HTMLDivElement>(null)
  const { scrollYProgress: progressoDaFoto } = useScroll({
    target: molduraDaFoto,
    offset: ['start end', 'end start'],
  })
  const escalaDaFoto = useTransform(progressoDaFoto, [0, 1], [1.2, 1])

  return (
    <section id="aulas" className="overflow-x-clip bg-tampo py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 md:grid-cols-[5fr_6fr] md:gap-20">
        <motion.div {...entrarAoAparecer} variants={surgirDeBaixo}>
          <TituloRevelado texto="Como são as aulas" />
          <p className="mt-5 max-w-md text-lg leading-relaxed text-jacaranda-claro">
            Aulas online, pensadas para quem está dando os primeiros passos no violão.
          </p>
          <div ref={molduraDaFoto} className="mt-10 aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-jacaranda/25">
            <motion.img
              src={fotoNoSesc}
              alt="Deh Mussulini cantando e tocando violão no palco"
              width={900}
              height={1600}
              loading="lazy"
              style={{ scale: escalaDaFoto }}
              className="size-full object-cover object-[50%_55%]"
            />
          </div>
        </motion.div>

        <motion.ul {...entrarAoAparecer} variants={revelarEmSequencia} className="self-center">
          {diferenciais.map(({ titulo, descricao, icone: Icone }) => (
            <motion.li
              key={titulo}
              variants={surgirDaDireita}
              className="group flex gap-6 border-t border-jacaranda/15 py-9 last:border-b"
            >
              <motion.span
                variants={girarParaDentro}
                className="grid size-14 shrink-0 place-items-center rounded-full bg-roseta text-tampo-claro transition-transform duration-500 group-hover:rotate-[-14deg] group-hover:scale-110"
              >
                <Icone aria-hidden="true" className="size-6" />
              </motion.span>
              <div>
                <h3 className="font-titulo text-2xl sm:text-3xl">{titulo}</h3>
                <p className="mt-2 max-w-md text-lg leading-relaxed text-jacaranda-claro">{descricao}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
