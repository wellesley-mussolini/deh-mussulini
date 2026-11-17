import { motion } from 'motion/react'
import BotaoWhatsapp from '../../../components/BotaoWhatsapp'
import { entrarAoAparecer, revelarEmSequencia, surgirDeBaixo } from '../animacoes.constants'

export default function ChamadaFinal() {
  return (
    <section data-fundo="escuro" className="relative isolate overflow-hidden bg-roseta py-28 text-tampo-claro sm:py-36">
      <motion.div
        aria-hidden="true"
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-32 -bottom-32 -z-10 size-[32rem] rounded-full bg-roseta-escuro blur-2xl"
      />
      <motion.div
        {...entrarAoAparecer}
        variants={revelarEmSequencia}
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        <motion.h2
          variants={surgirDeBaixo}
          className="font-titulo text-[clamp(3.2rem,11vw,8rem)] leading-[0.95]"
        >
          Bora tocar?
        </motion.h2>
        <motion.p variants={surgirDeBaixo} className="mt-6 max-w-lg text-xl leading-relaxed text-tampo-claro/90">
          Mande uma mensagem e combine sua primeira aula com a Deh.
        </motion.p>
        <motion.div variants={surgirDeBaixo} className="mt-10">
          <BotaoWhatsapp aparencia="tampo" comBrilho>
            Chamar a Deh no WhatsApp
          </BotaoWhatsapp>
        </motion.div>
      </motion.div>
    </section>
  )
}
