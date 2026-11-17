import { MotionConfig } from 'motion/react'
import Cabecalho from './layout/Cabecalho'
import Rodape from './layout/Rodape'
import BotaoWhatsappFlutuante from './layout/BotaoWhatsappFlutuante'
import PaginaAulas from './domains/aulas/PaginaAulas'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Cabecalho />
      <PaginaAulas />
      <Rodape />
      <BotaoWhatsappFlutuante />
    </MotionConfig>
  )
}
