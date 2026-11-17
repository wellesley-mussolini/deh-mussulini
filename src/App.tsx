import { MotionConfig } from 'motion/react'
import Cabecalho from './layout/Cabecalho'
import Rodape from './layout/Rodape'
import BotaoWhatsappFlutuante from './layout/BotaoWhatsappFlutuante'
import PaginaAulas from './domains/aulas/PaginaAulas'
import { useCarregamentoDoSite } from './hooks/useCarregamentoDoSite'
import { imagensDaAbertura } from './domains/aulas/fotos.constants'

export default function App() {
  const siteRevelado = useCarregamentoDoSite(imagensDaAbertura)

  return (
    <MotionConfig reducedMotion="user">
      <Cabecalho />
      <PaginaAulas siteRevelado={siteRevelado} />
      <Rodape />
      <BotaoWhatsappFlutuante />
    </MotionConfig>
  )
}
