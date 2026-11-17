import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { MessageCircle } from 'lucide-react'
import { linkDoWhatsapp } from '../constants/contato.constants'

const fracaoDaTelaParaAparecer = 0.8

export default function BotaoWhatsappFlutuante() {
  const [passouDaAbertura, setPassouDaAbertura] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (posicaoVertical) => {
    setPassouDaAbertura(posicaoVertical > window.innerHeight * fracaoDaTelaParaAparecer)
  })

  return (
    <AnimatePresence>
      {passouDaAbertura && (
        <motion.a
          href={linkDoWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chamar a Deh no WhatsApp"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 90 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="fixed right-4 bottom-4 z-40 grid size-16 place-items-center rounded-full bg-roseta text-tampo-claro shadow-xl shadow-jacaranda/30 sm:right-6 sm:bottom-6"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-roseta/60 [animation-duration:2.4s]"
          />
          <MessageCircle aria-hidden="true" className="relative size-7" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
