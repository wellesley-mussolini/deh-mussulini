import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import IconeWhatsapp from '../components/icones/IconeWhatsapp'
import { linkDoWhatsapp } from '../constants/contato.constants'
import { useChamadaWhatsappNaTela } from '../hooks/useChamadaWhatsappNaTela'

const fracaoDaTelaParaAparecer = 0.8

// Só no celular: no desktop o cabeçalho já mostra o WhatsApp o tempo todo. E sai de cena enquanto outra
// chamada de WhatsApp está na tela, para nunca haver dois botões iguais lado a lado.
export default function BotaoWhatsappFlutuante() {
  const [passouDaAbertura, setPassouDaAbertura] = useState(false)
  const outraChamadaNaTela = useChamadaWhatsappNaTela()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (posicaoVertical) => {
    setPassouDaAbertura(posicaoVertical > window.innerHeight * fracaoDaTelaParaAparecer)
  })

  return (
    <AnimatePresence>
      {passouDaAbertura && !outraChamadaNaTela && (
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
          className="fixed right-4 bottom-4 z-40 grid size-16 place-items-center rounded-full bg-roseta text-tampo-claro shadow-xl shadow-jacaranda/30 md:hidden"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-roseta/60 [animation-duration:2.4s]"
          />
          <IconeWhatsapp className="relative size-8" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
